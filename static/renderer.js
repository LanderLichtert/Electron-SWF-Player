const { Menu } = require('electron').remote;
const { Titlebar } = require('custom-electron-titlebar');

const titlebar = new Titlebar('#1e1e1e');

const menu = new Menu();
titlebar.setMenu(menu);

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    debugger;
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}