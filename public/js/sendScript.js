var breakpoints = Array();

$(document).ready(function () {
    var runButton = document.getElementById("run");
    var stopButton = document.getElementById("stop");
    runButton.addEventListener("click", sendScript);

    function sendScript() {
        if (!GetStatus()) {
            const postUrl = window.location.origin + "/scripts";
            console.log(postUrl);
            var script = {
                script: GetScript(),
                input: GetInput(),
                breakpoint: JSON.stringify(GetBreakpoint()),
            }

            if (script.script != "") {
                $('#output-message').removeClass("success");
                $('#output-message').removeClass("error");
                $('#output-message').addClass("info");
                $('#output-message').text('Compilando...');

                $.ajax({
                    url: postUrl,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        $('#output-message').removeClass("info");
                        $('#output-message').removeClass("error");
                        $('#output-message').addClass("success");
                        $('#output-message').text("Arquivo processado com sucesso!");

                        animation = JSON.parse(data.script[3].animation);
                        SetInstructions(animation);
                    },
                    error: function (xhr, status, error) {
                        $('#output-message').removeClass("info");
                        $('#output-message').removeClass("success");
                        $('#output-message').addClass("error");
                        $('#output-message').text(xhr.responseText);
                    },
                    data: JSON.stringify(script)
                });
            }
        } else {
            $('#output-message').removeClass("success");
            $('#output-message').removeClass("error");
            $('#output-message').addClass("info");
            $('#output-message').text('Animação já em execução!');
        }
    }

});

function SetBreakpoint(line) {
    breakpoints.push(line);
    console.log(breakpoints);
}

function GetBreakpoint() {
    if (breakpoints.length < 1) {
        return null;
    }
    breakpoints = breakpoints.sort(function (a, b) { return a - b });
    return breakpoints;
}

function RemoveBreakpoint(line) {
    var index = breakpoints.indexOf(line);
    breakpoints.splice(index, 1);
    console.log(breakpoints);
}