var editor, inputEditor;
$(function () {
    var inputHeight, editorHeight;
    var divCore = $("#content-core");
    if (window.innerWidth > 1680) {
        CoreInc(divCore, "large");
        inputHeight = "100px";
        editorHeight = "490px";
    } else if (window.innerWidth > 1100) {
        CoreInc(divCore, "medium");
        
        inputHeight = "100px";
        editorHeight = "300px";
    } else {
        CoreInc(divCore, "small");

        inputHeight = "40px";
        editorHeight = "150px";
    }

    var divScript = document.getElementById("script-area");
    var divInput = document.getElementById("input-area");
    editor = CodeMirror(divScript, {
        value: "program Hello;\nbegin\n\twriteln('Bem vindo a Core Inc.!!!');\nend.",
        mode: "text/x-pascal",
        lineNumbers: true,
        gutters: ["CodeMirror-linenumbers", "breakpoints"]
    });

    inputEditor = CodeMirror(divInput, {
        mode: "text",
        lineNumbers: true,
    });
    inputEditor.setOption('placeholder', "Digite uma entrada por linha aqui.");

    editor.setSize("100%", editorHeight);
    inputEditor.setSize("100%", inputHeight);

    editor.on("gutterClick", function (cm, n) {
        var info = cm.lineInfo(n);
        cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
        if (!info.gutterMarkers) {
            SetBreakpoint(n);
        } else {
            RemoveBreakpoint(n);
        }
    });

    function makeMarker() {
        var marker = document.createElement("div");
        marker.style.color = "#ff0303";
        marker.innerHTML = "●";
        return marker;
    }

});

function GetScript() {
    return editor.getValue();
}

function GetInput() {
    return inputEditor.getValue();
}