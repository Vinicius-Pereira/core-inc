var packages = ["#m3m0-package", "#lucy-package", "#bus-package", "#package", "#package-inout",
    "#package-declare", "#trail-get-package", "#trail-set-package"];
function PauseAnimation() {
    $("#lucy").toggleClass("pause");
    $("#m3m0").toggleClass("pause");
    $("#ursula").toggleClass("pause");
    $("#package").toggleClass("pause");
    $("#m3m0-package").toggleClass("pause");
    $("#trail-get-package").toggleClass("pause");
    $("#trail-set-package").toggleClass("pause");
}

function RemoveAnimationClasses(size, exceptions) {
    var contException;
    var lucy = document.getElementById("lucy");
    var top = window.getComputedStyle(lucy).getPropertyValue("top");
    var left = window.getComputedStyle(lucy).getPropertyValue("left");

    $("#lucy").removeClass("get-instruction");
    $("#screen").removeClass("get-instruction");
    $("#portrait").removeClass("get-instruction");
    $("#panel-instructions").removeClass("get-instruction");

    $("#lucy").removeClass("ask-package-short");
    $("#lucy").removeClass("ask-package");
    $("#screen").removeClass("ask-package");
    $("#portrait").removeClass("ask-package");
    $("#panel-instructions").removeClass("ask-package");

    $("#m3m0").removeClass("move-get-package");
    $("#m3m0-package").removeClass("move-get-package");
    $("#lucy").removeClass("move-get-package");
    $("#lucy-package").removeClass("move-get-package");
    $("#package").removeClass("move-get-package");
    $("#trail-get-package").removeClass("move-get-package");

    $("#m3m0-package").removeClass("move-set-package");
    $("#m3m0").removeClass("move-set-package");
    $("#lucy").removeClass("move-set-package");
    $("#package").removeClass("move-set-package");
    $("#trail-set-package").removeClass("move-set-package");

    $("#lucy").removeClass("put-package-register");
    $("#lucy-package").removeClass("put-package-register");

    $("#ursula").removeClass("get-package-top-long");
    $("#ursula").removeClass("get-package-top-short");
    $("#ursula").removeClass("get-package-down-long");
    $("#ursula").removeClass("get-package-down-short");

    $("#screen").removeClass("check-if");
    $("#portrait").removeClass("check-if");
    $("#panel-instructions").removeClass("check-if");
    $("#lucy").removeClass("check-if");

    $("#lucy").removeClass("get-declare");
    $("#lucy-package").removeClass("get-declare");
    $("#package-declare").removeClass("get-declare");

    $("#lucy-package").removeClass("memory-to-output");
    $("#lucy").removeClass("memory-to-output");
    $("#package-inout").removeClass("memory-to-output");

    $("#lucy-package").removeClass("input-to-memory");
    $("#lucy").removeClass("input-to-memory");
    $("#package-inout").removeClass("input-to-memory");

    $("#bus").removeClass("input");
    $("#door-inout").removeClass("input");
    $("#bus-package").removeClass("input");
    $("#package-inout").removeClass("input");

    $("#bus").removeClass("output");
    $("#lucy").removeClass("output");
    $("#door-inout").removeClass("output");
    $("#bus-package").removeClass("output");
    $("#package-inout").removeClass("output");

    $("#screen").removeClass("calculate");
    $("#portrait").removeClass("calculate");
    $("#panel-instructions").removeClass("calculate");

    $("#lucy").removeClass("register-to-memory");
    $("#lucy-package").removeClass("register-to-memory");

    $("#lucy").removeClass("register-to-output");
    $("#lucy-package").removeClass("register-to-output");
    $("#package-inout").removeClass("register-to-output");

    if (size > 0) {
        if (exceptions) {
            contException = 0;
            packages.forEach(selector => {
                if ($(selector).attr("id") != exceptions[contException].attr("id")) {
                    $(selector).removeClass(sizePackage[size] + '-hand');
                    $(selector).removeClass(sizePackage[size]);
                    $(selector).removeClass("package-show");
                }
                else {
                    $(selector).addClass("package-show");
                    if (contException + 1 < exceptions.length) {
                        contException++;
                    }
                }
            });
        } else {
            packages.forEach(selector => {
                $(selector).removeClass(sizePackage[size] + '-hand');
                $(selector).removeClass(sizePackage[size]);
                $(selector).removeClass("package-show");
            });
        }

    }

    lucy.style.top = top;
    lucy.style.left = left;

}

function RemoveTooltips()
{
    SetLucy();
    SetM3M0();
    SetUrsula();
    SetBus();
    SetPackageLucy(null, null, null);
    SetPackageM3M0(null, null, null);
    SetPackageBus(null, null, null);
    SetPackageTooltip(null, null, null);
    SetPackageTrailGet(null, null, null);
    SetPackageTrailSet(null, null, null);
    SetPackageInOut(null, null, null);
    SetPackageDeclare(null, null, null);
    SetRegister1(null, null, null);
    SetRegister2(null, null, null);
    SetRegister3(null, null, null);
    SetRegister4(null, null, null);
}

function ClearRegister(numRegister) {
    $("#register" + numRegister).removeClass("get-package-top-long");
    $("#register" + numRegister).removeClass("get-package-top-short");
    $("#register" + numRegister).removeClass("get-package-down-long");
    $("#register" + numRegister).removeClass("get-package-down-short");
    $("#register" + numRegister).removeClass("package-trail");
    $("#register" + numRegister).css("opacity", 0);

    $("#register" + numRegister).addClass("empty");

    for (var a = 1; a < 6; a++) {
        $("#register" + numRegister).removeClass(sizePackage[a]);
    }
}

function SetRailPackage(size) {
    $("#package").removeClass("empty");
    $("#package").addClass(sizePackage[size]);
}

function DecreaseString(selector, limit, cont) {
    setTimeout(function () {
        var text = $(selector).text();
        $(selector).text(text.substring(0, limit));
        decreaseCont++;
    }, 200 * cont);
}

function IncreaseString(selector, string, limit) {
    setTimeout(function () {
        $(selector).text(string.substring(0, limit));
        decreaseCont++;
    }, 200 * limit);
}



