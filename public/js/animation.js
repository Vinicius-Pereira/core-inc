// Define types of packages for animation
const sizePackage = { 1: "bool", 2: "char", 3: "integer", 4: "real", 5: "string" };
Object.freeze(sizePackage);

var register = [0, 0, 0, 0];

var phraseLoading;
var contLoading;
var intervalLoading;
var phrasesLoadingWaiting = ["Lendo em grupo: A bipolaridade dos operadores lógicos", "Saímos para o Almoço.", "Fazendo Manutenção.", "Lendo em grupo: A filosofia por trás dos comentários dos Usuários.", "Protestando contra o fim do ponto e vírgula.", "Saímos para a reunião do sindicato.", "Exigindo sleep() 8 horas por dia.", "Soltando transistores.", "Assistindo: O Assassino da Tela Azul", "Recebendo Treinamento: Por que o Usuário utiliza Go Horse?", "Lendo em grupo: Quem é o Deus Café que os Usuários adoram?", "Aguardando o funcionário Java chegar com as chaves.", "Formatando a impressora.", "Assistindo: O Sexto Warning", "Assistindo: Invocação dos Erros", "Assistindo Sessão Documentário: Matrix", "Recebendo Treinamento: Codificação Quântica", "Recebendo Treinamento: Gambiarra Pattern"]

var loaded = false;

function ResetRegisters() {
    register = [0, 0, 0, 0];
}

function SetInstructionNames(current, next) {
    $("#pc-hud").text(current.substr(0, 15));
    $("#ir-hud").text(next.substr(0, 15));
}

function GetLoadingPhrase() {
    return phrasesLoadingWaiting[Math.floor(Math.random() * phrasesLoadingWaiting.length)];
}

//  FadeOut Loading if code didn't begin with "program"
function FadeLoading() {
    if (!loaded) {
        $("#loading").fadeOut(0);
        $("#loading").css("z-index", -1);
    }
}

function ResetLoading() {
    $("#loading").fadeIn(0);
    $("#loading").css("z-index", 3);
    $("#program").html(GetLoadingPhrase());
}

// Controls JS loading text animation
async function Loading(name) {
    loaded = true;
    $("#loading").fadeIn(0);
    $("#loading").css("z-index", 3);
    contLoading = 0;
    phraseLoading = 'Carregando program <b>"' + name + '"</b>.';
    $("#program").html(phraseLoading);
    intervalLoading = setInterval(function () {
        contLoading++;
        Program();
    }, 200);
}

// Makes JS loading text animation happen
async function Program() {
    if (contLoading % 3 != 0) {
        var current = $("#program").html();
        $("#program").html(current + ".");
    }
    else {
        $("#program").html(phraseLoading);
    }

    if (contLoading == 29) {
        clearInterval(intervalLoading);
        $("#loading").fadeOut(1600, "swing");
        $("#loading").css("z-index", -1);
    }
}

// Call CSS Animation to Get next instruction
function GetInstruction(currentInstruction, nextInstruction) {
    var cont = 0;
    var contAnimationEnd = 0;
    // SET TOOLTIP
    SetLucy("Pegando nova instrução.");
    // Set Text for screen
    $("#title-instructions").html("Painel de Instruções");
    $("#pc-title").html("(PC) Instrução Atual");
    $("#ir-title").html("(IR) Próxima Instrução");

    $("#lucy").toggleClass("get-instruction");
    $("#screen").toggleClass("get-instruction");
    $("#portrait").toggleClass("get-instruction");
    $("#panel-instructions").toggleClass("get-instruction");

    var pc = $("#pc-data").text(currentInstruction.substr(0, 20));
    var ir = $("#ir-data").text(nextInstruction.substr(0, 20));

    var selector = document.getElementById("panel-instructions");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            setTimeout(function () {
                RemoveAnimationClasses();
                RemoveTooltips();
            }, 2000)
            setTimeout(function () {
                resolve("done!");
            }, 2500)
            this.removeEventListener("animationend", arguments.callee);
        });
    });
}

// Call CSS Animation to Ask Package to memory
function AskPackage(name, type) {
    var contAnimationEnd = 0;

    // SET TOOLTIP
    SetLucy("Solicitando pacote (variável) da memória.");
    // Set Text for screen
    $("#title-instructions").html("Solicitação de Pacote");
    $("#pc-title").html("Nome do Pacote");
    $("#ir-title").html("Tipo do Pacote");

    $("#lucy").toggleClass("ask-package");
    $("#screen").toggleClass("ask-package");
    $("#portrait").toggleClass("ask-package");
    $("#panel-instructions").toggleClass("ask-package");


    $("#pc-data").text(name.substr(0, 20));
    $("#ir-data").text(sizePackage[type].substr(0, 20));

    var selector = document.getElementById("panel-instructions");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            if (++contAnimationEnd == 2) {
                setTimeout(function () {
                    RemoveAnimationClasses();
                    RemoveTooltips();
                }, 2000);
                setTimeout(function () {
                    resolve("done!");
                }, 2500);
                contAnimationEnd = 0;
                selector.removeEventListener("animationend", arguments.callee);
            }
        });
    });
}

// Call CSS Animation to Ask Package Short to memory
function AskPackageShort(name, type) {
    var contAnimationEnd = 0;
    // SET TOOLTIP
    SetLucy("Solicitando pacote (variável) da memória.");
    // Set Text for screen
    $("#title-instructions").html("Solicitação de Pacote");
    $("#pc-title").html("Nome do Pacote");
    $("#ir-title").html("Tipo do Pacote");

    $("#lucy").toggleClass("ask-package-short");
    $("#screen").toggleClass("ask-package");
    $("#portrait").toggleClass("ask-package");
    $("#panel-instructions").toggleClass("ask-package");


    $("#pc-data").text(name);
    $("#ir-data").text(sizePackage[type]);

    var selector = document.getElementById("panel-instructions");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            if (++contAnimationEnd == 1) {
                setTimeout(function () {
                    RemoveAnimationClasses();
                    RemoveTooltips();
                }, 2000);
                setTimeout(function () {
                    resolve("done!");
                }, 2500);
                contAnimationEnd = 0;
                selector.removeEventListener("animationend", arguments.callee);
            }
        });
    });
}

// Call CSS Animation to Check If expressions
function CheckIf(expression, result) {
    var contAnimationEnd = 0;
    // SET TOOLTIP
    SetLucy("Aguardando Úrsula.");
    SetUrsula("Trabalhando para resolver expressão lógica solicitada.");
    // Set Text for screen
    $("#title-instructions").html("Verificar Expressão");
    $("#pc-title").html("Expressão");
    $("#ir-title").html("Resultado");

    $("#screen").toggleClass("check-if");
    $("#portrait").toggleClass("check-if");
    $("#panel-instructions").toggleClass("check-if");
    $("#lucy").toggleClass("check-if");

    var pc = $("#pc-data").text(expression.substr(0, 20));
    var ir = $("#ir-data").text(result.substr(0, 20));

    var selector = document.getElementById("panel-instructions");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            setTimeout(function () {
                RemoveAnimationClasses();
                RemoveTooltips();
            }, 2000)
            setTimeout(function () {
                resolve("done!");
            }, 2500)
            this.removeEventListener("animationend", arguments.callee);
        });
    });
}

// Call CSS Animation to Calculate expressions
function Calculate(expression, result) {
    // SET TOOLTIP
    SetLucy("Aguardando Úrsula.");
    SetUrsula("Trabalhando para resolver expressão aritmética solicitada.")
    // Set Text for screen
    $("#title-instructions").html("Calcular Expressão");
    $("#pc-title").html("Expressão");
    $("#ir-title").html("Resultado");

    $("#screen").toggleClass("calculate");
    $("#portrait").toggleClass("calculate");
    $("#panel-instructions").toggleClass("calculate");

    var pc = $("#pc-data").text(expression.substr(0, 20));
    var ir = $("#ir-data").text(result.substr(0, 20));

    var selector = document.getElementById("panel-instructions");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            setTimeout(function () {
                RemoveAnimationClasses();
                RemoveTooltips();
            }, 2000);
            setTimeout(function () {
                resolve("done!");
            }, 2500);
            contAnimationEnd = 0;
            selector.removeEventListener("animationend", arguments.callee);
        });
    });
}

// Call CSS Animation to Get Package from memory
function GetPackage(name, size, value = "") {
    var contAnimationEnd = 0;
    // SET TOOLTIP
    SetLucy("Coletando pacote (variável) entregue por M3M0.");
    SetM3M0("Entregando pacote solicitado para Lucy.")
    SetPackageTooltip(name, size, value);
    SetPackageLucy(name, size, value);
    SetPackageM3M0(name, size, value);
    SetPackageTrailGet(name, size, value);
    // Set animation classes size
    $("#m3m0-package").addClass(sizePackage[size] + '-hand');
    $("#lucy-package").addClass(sizePackage[size] + '-hand');
    $("#trail-get-package").addClass(sizePackage[size]);
    $("#package").addClass(sizePackage[size]);

    // Set animation class for each object needed
    $("#m3m0").toggleClass("move-get-package");
    $("#m3m0-package").toggleClass("move-get-package");
    $("#lucy").toggleClass("move-get-package");
    $("#lucy-package").toggleClass("move-get-package");
    $("#package").toggleClass("move-get-package");
    $("#trail-get-package").toggleClass("move-get-package");

    var selector = document.getElementById("trail-get-package");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            if (++contAnimationEnd == 3) {
                setTimeout(function () {
                    RemoveAnimationClasses(size, [$("#lucy-package")]);
                    RemoveTooltips();
                }, 1000);
                setTimeout(function () {
                    resolve("done!");
                }, 2000);
                selector.removeEventListener("animationend", arguments.callee);
                contAnimationEnd = 0;
            }
        });
    });
}

// Call CSS Animation to Set Package to memory
function SetPackage(name, size, value) {
    var m3m0 = document.getElementById("m3m0-package");
    // SET TOOLTIP
    SetLucy("Entregando pacote (variável) para M3M0 armazenar.");
    SetM3M0("Armazenando na memória pacote entregue por Lucy.");
    SetPackageTooltip(name, size, value);
    SetPackageLucy(name, size, value);
    SetPackageM3M0(name, size, value);
    SetPackageTrailSet(name, size, value);

    contAnimationEnd = 0;
    contAnimationEnd2 = 0;

    $("#package").addClass("empty");

    $("#m3m0-package").addClass(sizePackage[size] + '-hand');
    $("#trail-set-package").addClass(sizePackage[size]);

    $("#m3m0-package").addClass("move-set-package");
    $("#m3m0").addClass("move-set-package");
    $("#lucy").addClass("move-set-package");
    $("#package").addClass("move-set-package");
    $("#trail-set-package").addClass("move-set-package");

    m3m0.addEventListener("animationend",
        function () {
            if (++contAnimationEnd == 2) {
                SetRailPackage(size);
                m3m0.removeEventListener("animationend", arguments.callee);
                contAnimationEnd = 0;
            }
        });

    var selector = document.getElementById("m3m0");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            if (++contAnimationEnd2 == 10) {
                setTimeout(function () {
                    RemoveAnimationClasses(size);
                    RemoveTooltips();
                }, 1000);
                setTimeout(function () {
                    resolve("done!");
                }, 2000);
                contAnimationEnd2 = 0;
                selector.removeEventListener("animationend", arguments.callee);
            }
        });
    });
}

// Call CSS Animation to Put Package to register 
function PutPackageRegister(name, size, value) {
    var contAnimationEnd = 0;
    // SET TOOLTIP
    SetLucy("Colocando pacote (variável) dentro dos registradores.");
    SetPackageLucy(name, size, value);
    // Set animation classes size
    $("#lucy-package").addClass(sizePackage[size] + '-hand');

    $("#lucy").toggleClass("put-package-register");
    $("#lucy-package").toggleClass("put-package-register");

    var selector = document.getElementById("lucy-package");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            if (++contAnimationEnd == 2) {
                selector.removeEventListener("animationend", arguments.callee);
                for (var a = 0; a < 4; a++) {
                    if (register[a] == 0) {
                        register[a] = 1;
                        $("#register" + (a + 1)).removeClass("empty");
                        $("#register" + (a + 1)).addClass("package-trail");
                        $("#register" + (a + 1)).addClass(sizePackage[size]);
                        $("#register" + (a + 1)).css("opacity", "1");
                        // SET TOOLTIP
                        switch (a + 1) {
                            case 1:
                                SetRegister1(name, size, value);
                                break;
                            case 2:
                                SetRegister2(name, size, value);
                                break;
                            case 3:
                                SetRegister3(name, size, value);
                                break;
                            case 4:
                                SetRegister4(name, size, value);
                                break;
                            case 5:
                                SetRegister5(name, size, value);
                                break;
                        }
                        break;
                    }
                }
                setTimeout(function () {
                    RemoveAnimationClasses(size);
                    RemoveTooltips();
                }, 1500);
                setTimeout(function () {
                    resolve("done!");
                }, 2000);
                contAnimationEnd = 0;
            }
        });
    });
}

// Call CSS Animation to Ursula Get Package from Registers
function GetPackageRegister(numRegister) {
    // SET TOOLTIP
    SetUrsula("Coletando dados dos registradores para realizar operação.");
    switch (numRegister) {
        case 1:
            $("#ursula").toggleClass("get-package-top-long");
            $("#register1").toggleClass("get-package-top-long");
            register[0] = 0;
            SetRegister1(null, null, null);
            break;
        case 2:
            $("#ursula").toggleClass("get-package-top-short");
            $("#register2").toggleClass("get-package-top-short");
            register[1] = 0;
            SetRegister2(null, null, null);
            break;
        case 3:
            $("#ursula").toggleClass("get-package-down-long");
            $("#register3").toggleClass("get-package-down-long");
            register[2] = 0;
            SetRegister3(null, null, null);
            break;
        case 4:
            $("#ursula").toggleClass("get-package-down-short");
            $("#register4").toggleClass("get-package-down-short");
            register[3] = 0;
            SetRegister4(null, null, null);
            break;
    }

    var selector = document.getElementById("ursula");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend",
            function () {
                setTimeout(function () {
                    RemoveAnimationClasses();
                    RemoveTooltips();
                    ClearRegister(numRegister);
                }, 1000);
                setTimeout(function () {
                    resolve("done!");
                }, 2000);
                selector.removeEventListener("animationend", arguments.callee);
            })
    });
}

// Call CSS Animation to Get variable declaration
function GetDeclare(name, size) {
    var contAnimationEnd = 0;
    // SET TOOLTIP
    SetLucy("Pegando pacote (variável) declarado.");
    SetPackageLucy(name, size, "");
    SetPackageDeclare(name, size, "");

    $("#package-declare").addClass(sizePackage[size]);
    $("#lucy-package").addClass(sizePackage[size] + "-hand");
    $("#lucy").toggleClass("get-declare");
    $("#lucy-package").toggleClass("get-declare");
    $("#package-declare").toggleClass("get-declare");

    var selector = document.getElementById("lucy-package");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            if (++contAnimationEnd == 2) {
                setTimeout(function () {
                    RemoveAnimationClasses(size);
                    RemoveTooltips();
                }, 500);
                setTimeout(function () {
                    resolve("done!");
                }, 1000);
                contAnimationEnd = 0;
                selector.removeEventListener("animationend", arguments.callee);
            }
        });
    });
}

// Call CSS Animation to get result from Ursula and store with m3m0
function RegisterToMemory(name, size, value = "") {
    // SET TOOLTIP
    SetLucy("Enviando resultado para armazenar na memória.");
    SetPackageLucy(name, size, value);
    $("#lucy-package").addClass(sizePackage[size] + "-hand");
    $("#lucy").toggleClass("register-to-memory");
    $("#lucy-package").toggleClass("register-to-memory");

    var selector = document.getElementById("lucy");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            if (++contAnimationEnd == 7) {
                setTimeout(function () {
                    RemoveAnimationClasses(size);
                    RemoveTooltips();
                }, 2000);
                setTimeout(function () {
                    resolve("done!");
                }, 2500);
                contAnimationEnd = 0;
                selector.removeEventListener("animationend", arguments.callee);
            }
        });
    });
}

function RegisterToOutput(name, size, value = "") {
    // SET TOOLTIP
    SetLucy("Enviando resultado para a saída de dados.");
    SetPackageLucy(name, size, value);
    SetPackageInOut(name, size, value);

    $("#package-inout").toggleClass(sizePackage[size]);
    $("#lucy-package").addClass(sizePackage[size] + "-hand");
    $("#lucy").toggleClass("register-to-output");
    $("#lucy-package").toggleClass("register-to-output");
    $("#package-inout").toggleClass("register-to-output");

    var selector = document.getElementById("lucy-package");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            if (++contAnimationEnd == 2) {
                setTimeout(function () {
                    RemoveAnimationClasses(size, [$("#package-inout")]);
                    RemoveTooltips();
                }, 2000);
                setTimeout(function () {
                    resolve("done!");
                }, 2500);
                contAnimationEnd = 0;
                selector.removeEventListener("animationend", arguments.callee);
            }
        });
    });
}

// Call CSS Animation to Get package form Memory and send to Output
function MemoryToOutput(name, size, value = "") {
    // SET TOOLTIP
    SetLucy("Enviando resultado para a saída de dados.");
    SetPackageLucy(name, size, value);
    SetPackageInOut(name, size, value);

    $("#lucy-package").addClass(sizePackage[size] + "-hand");
    $("#package-inout").addClass(sizePackage[size]);
    $("#lucy-package").toggleClass("memory-to-output");
    $("#lucy").toggleClass("memory-to-output");
    $("#package-inout").toggleClass("memory-to-output");

    var selector = document.getElementById("package-inout");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            setTimeout(function () {
                RemoveAnimationClasses(size, [$("#package-inout")]);
                RemoveTooltips();
            }, 1000);
            setTimeout(function () {
                resolve("done!");
            }, 2000);
            selector.removeEventListener("animationend", arguments.callee);
        });
    });
}

// Call CSS Animation to Get package from Input and send to memory 
function InputToMemory(name, size, value) {
    var contAnimationEnd = 0;
    // SET TOOLTIP
    SetLucy("Levando dados de entrada para armazenar em memória.");
    SetPackageLucy(name, size, value);
    SetPackageInOut(name, size, value);

    $("#lucy-package").addClass(sizePackage[size] + "-hand");
    $("#package-inout").addClass(sizePackage[size]);
    $("#lucy-package").toggleClass("input-to-memory");
    $("#lucy").toggleClass("input-to-memory");
    $("#package-inout").toggleClass("input-to-memory");

    var selector = document.getElementById("lucy-package");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            if (++contAnimationEnd == 2) {
                setTimeout(function () {
                    RemoveAnimationClasses(size);
                    RemoveTooltips();
                }, 1000);
                setTimeout(function () {
                    resolve("done!");
                }, 2000);
                contAnimationEnd = 0;
                selector.removeEventListener("animationend", arguments.callee);
            }
        });
    });
}

// Call CSS Animation to Bus get input
function Input(name, size, value) {
    var contAnimationEnd = 0;
    // SET TOOLTIP
    SetBus("Levando pacote para receber dado de entrada.");
    SetPackageBus(name, size, value);
    SetPackageInOut(name, size, value);

    $("#bus-package").addClass(sizePackage[size] + "-hand");
    $("#package-inout").addClass(sizePackage[size]);
    $("#bus").toggleClass("input");
    $("#door-inout").toggleClass("input");
    $("#bus-package").toggleClass("input");
    $("#package-inout").toggleClass("input");

    var selector = document.getElementById("bus");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            if (++contAnimationEnd == 8) {
                setTimeout(function () {
                    RemoveAnimationClasses(size);
                    RemoveTooltips();
                }, 500);
                setTimeout(function () {
                    resolve("done!");
                }, 1000);
                contAnimationEnd = 0;
                selector.removeEventListener("animationend", arguments.callee);
            }
        });
    });
}

// Call CSS Animation to Bus send output
function Output(name, size, value = "") {
    var contAnimationEnd = 0;
    // SET TOOLTIP
    SetBus("Levando pacote para a saída de dados.");
    SetPackageBus(name, size, value);
    SetPackageInOut(name, size, value);

    $("#bus-package").addClass(sizePackage[size] + "-hand");
    $("#package-inout").addClass(sizePackage[size]);
    $("#bus").toggleClass("output");
    $("#lucy").toggleClass("output");
    $("#door-inout").toggleClass("output");
    $("#bus-package").toggleClass("output");
    $("#package-inout").toggleClass("output");

    var selector = document.getElementById("bus");
    return promise = new Promise(function (resolve, reject) {
        selector.addEventListener("animationend", function () {
            if (++contAnimationEnd == 6) {
                setTimeout(function () {
                    RemoveAnimationClasses(size);
                    RemoveTooltips();
                }, 500);
                setTimeout(function () {
                    resolve("done!");
                }, 1000);
                contAnimationEnd = 0;
                selector.removeEventListener("animationend", arguments.callee);
            }
        });
    });
}
