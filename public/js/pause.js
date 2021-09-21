$(document).ready(function () {
    var core = document.getElementById("core");

    $(document).on("mouseover", "#core", Pause);
    $(document).on("mouseout", "#core", Resume);

    function Pause() {
        $("#lucy").addClass("pause");
        $("#m3m0").addClass("pause");
        $("#ursula").addClass("pause");
        $("#bus").addClass("pause");

        $("#lucy-package").addClass("pause");
        $("#m3m0-package").addClass("pause");
        $("#ursula-package").addClass("pause");
        $("#bus-package").addClass("pause");

        $("#package").addClass("pause");
        $("#door-inout").addClass("pause");
        $("#package-inout").addClass("pause");
        $("#package-declare").addClass("pause");
        $("#trail-get-package").addClass("pause");
        $("#trail-set-package").addClass("pause");

        $("#screen").addClass("pause");
        $("#portrait").addClass("pause");
        $("#panel-instructions").addClass("pause");
    }

    function Resume() {
        $("#lucy").removeClass("pause");
        $("#m3m0").removeClass("pause");
        $("#ursula").removeClass("pause");
        $("#bus").removeClass("pause");

        $("#lucy-package").removeClass("pause");
        $("#m3m0-package").removeClass("pause");
        $("#ursula-package").removeClass("pause");
        $("#bus-package").removeClass("pause");

        $("#package").removeClass("pause");
        $("#door-inout").removeClass("pause");
        $("#package-inout").removeClass("pause");
        $("#package-declare").removeClass("pause");
        $("#trail-get-package").removeClass("pause");
        $("#trail-set-package").removeClass("pause");

        $("#screen").removeClass("pause");
        $("#portrait").removeClass("pause");
        $("#panel-instructions").removeClass("pause");

    }
});