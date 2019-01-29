//https://css-tricks.com/drag-and-drop-file-uploading/

function dragOver(ev) {
    ev.preventDefault();
    $("#drop").addClass("is-dragover");
}

function dragLeave(ev) {
    ev.preventDefault();
    $("#drop").removeClass("is-dragover");
}

function drop(ev) {
    ev.preventDefault();
    select(ev.dataTransfer.files);
}

function select(files) {
    let path = files[0].path;
    $("#drop").removeClass("center");
    $("#drop").addClass("hide");
    $("#flash").removeClass("hide");
    $("#flash").addClass("center");
    $("#flash").attr("src", path);
}

function selectFile(ev) {
    ev.preventDefault();
}

$(document).ready(function(){
    $("#upload").change(function() {
        select(this.files);
    });
});