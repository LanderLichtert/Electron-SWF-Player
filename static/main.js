let { app, BrowserWindow } = require('electron');
let path = require('path');
let flashTrust = require('nw-flash-trust-a');
let resourcePath = isDev() ? __dirname : process.resourcesPath + '/static';

let pluginName;
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll';
    break;
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin';
    break;
  case 'linux':
    pluginName = 'libpepflashplayer.so';
    break;
}

app.commandLine.appendSwitch('ppapi-flash-path', path.join(resourcePath, "plugins", pluginName));

let trustManager = flashTrust.initSync('electron-swf-player', { 
  customFolder: path.resolve(app.getPath('userData'), 'Pepper Data/Shockwave Flash/WritableRoot') 
});

// let appPath = path.dirname(process.execPath);
// console.log(path.resolve(appPath, 'test.swf'));
// trustManager.add('file:///home/lander/Desktop/Electron-SWF-Player/dist/test.swf');



let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    titleBarStyle: 'hidden',
    frame: false,
    backgroundColor: '#1e1e1e',
    webPreferences: {
      plugins: true,
      nodeIntegration: true,
      webviewTag: true
    }
  });
  
  // mainWindow.webContents.openDevTools();

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.loadFile('static/index.html');

  mainWindow.on('closed', function () {
    trustManager.empty();
    mainWindow = null;
  });
}

function isDev() {
  return process.mainModule.filename.indexOf('app.asar') === -1;
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    trustManager.empty();
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
