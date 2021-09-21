
$(document).ready(function () {
    $("#navbar-button").click(function () {

        if ($("#navbar-button").text() == "☰") {
            $("#navbar-button").text("🞬");
        } else {
            $("#navbar-button").text("☰");
        }

        $("li").toggle("slow");
    });
});