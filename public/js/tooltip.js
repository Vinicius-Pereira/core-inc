// CHARACTERS
var tooltipLucy = Array(4);
var tooltipM3M0 = Array(4);
var tooltipUrsula = Array(4);
var tooltipBus = Array(4);
// PACKAGE CHARACTERS
var tooltipPackageLucy = Array(4);
var tooltipPackageM3M0 = Array(4);
var tooltipPackageBus = Array(4);
// PACKAGES
var tooltipPackage = Array(4);
var tooltipPackageTrailGet = Array(4);
var tooltipPackageTrailSet = Array(4);
var tooltipPackageInOut = Array(4);
var tooltipPackageDeclare = Array(4);
// REGISTERS
var tooltipRegister1 = Array(4);
var tooltipRegister2 = Array(4);
var tooltipRegister3 = Array(4);
var tooltipRegister4 = Array(4);

function SetLucy(doing = "Relaxando") {
    tooltipLucy[0] = "Lucy";
    tooltipLucy[1] = "Unidade de Controle";
    tooltipLucy[2] = "Lucy foi a primeira na sua turma de cadetes no departamente de Unidades de Controle. Um prodígio na empresa, Lucy é capaz de gerenciar unidades de processamento de grandes capacidades com agilidade sem igual. Suas qualidades junto de sua ambição a tornou a candidata ideal para coordenar a CPU do programa de Auditoria do Usuário.";
    tooltipLucy[3] = doing;
}

function SetM3M0(doing = "Relaxando") {
    tooltipM3M0[0] = "M3M0";
    tooltipM3M0[1] = "Barramento de Memória";
    tooltipM3M0[2] = "M3M0 foi criado em uma família tradicional dentro da Core Inc. Seus ancestrias já faziam o controle de memórias desde os primeiros anos de empresa. Seguindo os passos de sesu predecessores, M3M0 assume com orgulho e espantosa eficiência o mesmo cargo. Seu perfil trabalhador e exemplar fez dele a opção ideal para o programa de Auditoria do Usuário, mesmo que ainda tão novo.";
    tooltipM3M0[3] = doing;
}

function SetUrsula(doing = "Relaxando") {
    tooltipUrsula[0] = "Úrsula";
    tooltipUrsula[1] = "Unidade Lógica e Aritmética";
    tooltipUrsula[2] = "Ursula desmontrava aptidão aos números desde que saiu do berço, aprendeu a resolver a equação de Bhaskara antes mesmo de falar. Pouco antes de passar no exame de admissão das Unidades Lógicas e Aritméticas desenvolveu seus braços, apelidados carinhosamente de Bits. Tímida, ela não sai muito de sua estação, mas calcula mais rápido do que qualquer outra ULA da Core Inc.";
    tooltipUrsula[3] = doing;
}

function SetBus(doing = "Relaxando") {
    tooltipBus[0] = "Bus";
    tooltipBus[1] = "Barramento de Entrada/Saída";
    tooltipBus[2] = "Bus é uma nova tecnologia quando se trata de transporte de dados. Oriundo dos estudos em animais de estimação robóticos descobriu-se que o pássaro é muito mais rápido e forte do que os funcionário que trabalhavam no departamento de barramentos. Contudo, sua imprevisibilidade causa temores, sua posição no programa de Auditoria do Cliente é o primeiro teste de Bus para ocupar uma vaga fixa na Core Inc..";
    tooltipBus[3] = doing;
}

function SetPackageLucy(name, type, value) {
    tooltipPackageLucy[0] = name;
    tooltipPackageLucy[1] = "Variável";
    tooltipPackageLucy[2] = type;
    tooltipPackageLucy[3] = value;
}

function SetPackageM3M0(name, type, value) {
    tooltipPackageM3M0[0] = name;
    tooltipPackageM3M0[1] = "Variável";
    tooltipPackageM3M0[2] = type;
    tooltipPackageM3M0[3] = value;
}

function SetPackageBus(name, type, value) {
    tooltipPackageBus[0] = name;
    tooltipPackageBus[1] = "Variável";
    tooltipPackageBus[2] = type;
    tooltipPackageBus[3] = value;
}

function SetPackageTooltip(name, type, value) {
    tooltipPackage[0] = name;
    tooltipPackage[1] = "Variável";
    tooltipPackage[2] = type;
    tooltipPackage[3] = value;
}

function SetPackageTrailGet(name, type, value) {
    tooltipPackageTrailGet[0] = name;
    tooltipPackageTrailGet[1] = "Variável";
    tooltipPackageTrailGet[2] = type;
    tooltipPackageTrailGet[3] = value;
}

function SetPackageTrailSet(name, type, value) {
    tooltipPackageTrailSet[0] = name;
    tooltipPackageTrailSet[1] = "Variável";
    tooltipPackageTrailSet[2] = type;
    tooltipPackageTrailSet[3] = value;
}

function SetPackageInOut(name, type, value) {
    tooltipPackageInOut[0] = name;
    tooltipPackageInOut[1] = "Variável";
    tooltipPackageInOut[2] = type;
    tooltipPackageInOut[3] = value;
}

function SetPackageDeclare(name, type, value) {
    tooltipPackageDeclare[0] = name;
    tooltipPackageDeclare[1] = "Variável";
    tooltipPackageDeclare[2] = type;
    tooltipPackageDeclare[3] = value;
}

function SetRegister1(name, type, value) {
    tooltipRegister1[0] = name;
    tooltipRegister1[1] = "Variável";
    tooltipRegister1[2] = type;
    tooltipRegister1[3] = value;
}

function SetRegister2(name, type, value) {
    tooltipRegister2[0] = name;
    tooltipRegister2[1] = "Variável";
    tooltipRegister2[2] = type;
    tooltipRegister2[3] = value;
}

function SetRegister3(name, type, value) {
    tooltipRegister3[0] = name;
    tooltipRegister3[1] = "Variável";
    tooltipRegister3[2] = type;
    tooltipRegister3[3] = value;
}

function SetRegister4(name, type, value) {
    tooltipRegister4[0] = name;
    tooltipRegister4[1] = "Variável";
    tooltipRegister4[2] = type;
    tooltipRegister4[3] = value;
}

$(function () {
    SetLucy();
    SetM3M0();
    SetUrsula();
    SetBus();

    $(document).on("mouseout", "#core", function () {
        $("#title").html("Como Usar");
        $("#job").html("Dicas");
        $("#content-portrait").css("background-image", "url(../images/tooltip/lucy.png)");
        $("#content-section-1 > h2").html("Instruções");
        $("#content-section-1 > p").html("1 - Inserir o código no campo de texto aqui do lado.<br\>2 - Inserir as entradas de dados necessárias, caso existam.<br\>3 - Pressionar o botão Executar.<br\>4 - Assistir a animação!");
        $("#content-section-2 > h2").html("Recomendado");
        $("#content-section-2 > p").html("Assista <a href='https://youtu.be/0ekg7FmJ2KY' target='_blank'>esse vídeo aqui.</a>");
    });

    $(document).on("mouseover", "#lucy", function () {
        $("#title").html(tooltipLucy[0]);
        $("#job").html(tooltipLucy[1]);
        $("#content-portrait").css("background-image", "url(../images/tooltip/lucy.png)");
        $("#content-section-1 > h2").html("História");
        $("#content-section-1 > p").html(tooltipLucy[2]);
        $("#content-section-2 > h2").html("Fazendo...");
        $("#content-section-2 > p").html(tooltipLucy[3]);
    });

    $(document).on("mouseover", "#m3m0", function () {
        $("#title").html(tooltipM3M0[0]);
        $("#job").html(tooltipM3M0[1]);
        $("#content-portrait").css("background-image", "url(../images/tooltip/m3m0.png)");
        $("#content-section-1 > h2").html("História");
        $("#content-section-1 > p").html(tooltipM3M0[2]);
        $("#content-section-2 > h2").html("Fazendo...");
        $("#content-section-2 > p").html(tooltipM3M0[3]);
    });

    $(document).on("mouseover", "#ursula", function () {
        $("#title").html(tooltipUrsula[0]);
        $("#job").html(tooltipUrsula[1]);
        $("#content-portrait").css("background-image", "url(../images/tooltip/ursula.png)");
        $("#content-section-1 > h2").html("História");
        $("#content-section-1 > p").html(tooltipUrsula[2]);
        $("#content-section-2 > h2").html("Fazendo...");
        $("#content-section-2 > p").html(tooltipUrsula[3]);
    });

    $(document).on("mouseover", "#bus", function () {
        $("#title").html(tooltipBus[0]);
        $("#job").html(tooltipBus[1]);
        $("#content-portrait").css("background-image", "url(../images/tooltip/bus.png)");
        $("#content-section-1 > h2").html("História");
        $("#content-section-1 > p").html(tooltipBus[2]);
        $("#content-section-2 > h2").html("Fazendo...");
        $("#content-section-2 > p").html(tooltipBus[3]);
    });

    $(document).on("mouseover", "#lucy-package", function () {
        if(tooltipPackageLucy[0] != null)
        {
            $("#title").html(tooltipPackageLucy[0]);
            $("#job").html(tooltipPackageLucy[1]);
            $("#content-section-2 > h2").html("Valor");
            $("#content-section-2 > p").html(tooltipPackageLucy[3]);
            $("#content-section-1 > h2").html("Tipo");
            switch (tooltipPackageLucy[2]) {
                case 1:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-bool.png)");
                    $("#content-section-1 > p").html("Booleano(Lógico)");
                    break;
                case 2:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-char.png)");
                    $("#content-section-1 > p").html("Caractere");
                    break;
                case 3:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-integer.png)");
                    $("#content-section-1 > p").html("Inteiro");
                    break;
                case 4:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-real.png)");
                    $("#content-section-1 > p").html("Real");
                    break;
                case 5:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-string.png)");
                    $("#content-section-1 > p").html("String");
                    break;
            }
        }

    });

    $(document).on("mouseover", "#m3m0-package", function () {
        if(tooltipPackageM3M0[0] != null)
        {
            $("#title").html(tooltipPackageM3M0[0]);
            $("#job").html(tooltipPackageM3M0[1]);
            $("#content-section-2 > h2").html("Valor");
            $("#content-section-2 > p").html(tooltipPackageM3M0[3]);
            $("#content-section-1 > h2").html("Tipo");
            switch (tooltipPackageM3M0[2]) {
                case 1:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-bool.png)");
                    $("#content-section-1 > p").html("Booleano(Lógico)");
                    break;
                case 2:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-char.png)");
                    $("#content-section-1 > p").html("Caractere");
                    break;
                case 3:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-integer.png)");
                    $("#content-section-1 > p").html("Inteiro");
                    break;
                case 4:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-real.png)");
                    $("#content-section-1 > p").html("Real");
                    break;
                case 5:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-string.png)");
                    $("#content-section-1 > p").html("String");
                    break;
            }
        }

    });

    $(document).on("mouseover", "#bus-package", function () {
        if(tooltipPackageBus[0] != null)
        {
            $("#title").html(tooltipPackageBus[0]);
            $("#job").html(tooltipPackageBus[1]);
            $("#content-section-2 > h2").html("Valor");
            $("#content-section-2 > p").html(tooltipPackageBus[3]);
            $("#content-section-1 > h2").html("Tipo");
            switch (tooltipPackageBus[2]) {
                case 1:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-bool.png)");
                    $("#content-section-1 > p").html("Booleano(Lógico)");
                    break;
                case 2:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-char.png)");
                    $("#content-section-1 > p").html("Caractere");
                    break;
                case 3:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-integer.png)");
                    $("#content-section-1 > p").html("Inteiro");
                    break;
                case 4:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-real.png)");
                    $("#content-section-1 > p").html("Real");
                    break;
                case 5:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-string.png)");
                    $("#content-section-1 > p").html("String");
                    break;
            }
        }

    });

    $(document).on("mouseover", "#package", function () {
        if(tooltipPackage[0] != null)
        {
            $("#title").html(tooltipPackage[0]);
            $("#job").html(tooltipPackage[1]);
            $("#content-section-2 > h2").html("Valor");
            $("#content-section-2 > p").html(tooltipPackage[3]);
            $("#content-section-1 > h2").html("Tipo");
            switch (tooltipPackage[2]) {
                case 1:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-bool.png)");
                    $("#content-section-1 > p").html("Booleano(Lógico)");
                    break;
                case 2:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-char.png)");
                    $("#content-section-1 > p").html("Caractere");
                    break;
                case 3:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-integer.png)");
                    $("#content-section-1 > p").html("Inteiro");
                    break;
                case 4:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-real.png)");
                    $("#content-section-1 > p").html("Real");
                    break;
                case 5:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-string.png)");
                    $("#content-section-1 > p").html("String");
                    break;
            }
        }

    });

    $(document).on("mouseover", "#trail-get-package", function () {
        if(tooltipPackageTrailGet[0] != null)
        {
            $("#title").html(tooltipPackageTrailGet[0]);
            $("#job").html(tooltipPackageTrailGet[1]);
            $("#content-section-2 > h2").html("Valor");
            $("#content-section-2 > p").html(tooltipPackageTrailGet[3]);
            $("#content-section-1 > h2").html("Tipo");
            switch (tooltipPackageTrailGet[2]) {
                case 1:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-bool.png)");
                    $("#content-section-1 > p").html("Booleano(Lógico)");
                    break;
                case 2:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-char.png)");
                    $("#content-section-1 > p").html("Caractere");
                    break;
                case 3:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-integer.png)");
                    $("#content-section-1 > p").html("Inteiro");
                    break;
                case 4:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-real.png)");
                    $("#content-section-1 > p").html("Real");
                    break;
                case 5:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-string.png)");
                    $("#content-section-1 > p").html("String");
                    break;
            }
        }
    });

    $(document).on("mouseover", "#trail-set-package", function () {
        if(tooltipPackageTrailSet[0] != null)
        {
            $("#title").html(tooltipPackageTrailSet[0]);
            $("#job").html(tooltipPackageTrailSet[1]);
            $("#content-section-2 > h2").html("Valor");
            $("#content-section-2 > p").html(tooltipPackageTrailSet[3]);
            $("#content-section-1 > h2").html("Tipo");
            switch (tooltipPackageTrailSet[2]) {
                case 1:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-bool.png)");
                    $("#content-section-1 > p").html("Booleano(Lógico)");
                    break;
                case 2:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-char.png)");
                    $("#content-section-1 > p").html("Caractere");
                    break;
                case 3:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-integer.png)");
                    $("#content-section-1 > p").html("Inteiro");
                    break;
                case 4:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-real.png)");
                    $("#content-section-1 > p").html("Real");
                    break;
                case 5:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-string.png)");
                    $("#content-section-1 > p").html("String");
                    break;
            }
        }
    });

    $(document).on("mouseover", "#package-inout", function () {
        if(tooltipPackageInOut[0] != null)
        {
            $("#title").html(tooltipPackageInOut[0]);
            $("#job").html(tooltipPackageInOut[1]);
            $("#content-section-2 > h2").html("Valor");
            $("#content-section-2 > p").html(tooltipPackageInOut[3]);
            $("#content-section-1 > h2").html("Tipo");
            switch (tooltipPackageInOut[2]) {
                case 1:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-bool.png)");
                    $("#content-section-1 > p").html("Booleano(Lógico)");
                    break;
                case 2:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-char.png)");
                    $("#content-section-1 > p").html("Caractere");
                    break;
                case 3:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-integer.png)");
                    $("#content-section-1 > p").html("Inteiro");
                    break;
                case 4:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-real.png)");
                    $("#content-section-1 > p").html("Real");
                    break;
                case 5:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-string.png)");
                    $("#content-section-1 > p").html("String");
                    break;
            }
        }
    });

    $(document).on("mouseover", "#package-declare", function () {
        if(tooltipPackageDeclare[0] != null)
        {
            $("#title").html(tooltipPackageDeclare[0]);
            $("#job").html(tooltipPackageDeclare[1]);
            $("#content-section-2 > h2").html("Valor");
            $("#content-section-2 > p").html(tooltipPackageDeclare[3]);
            $("#content-section-1 > h2").html("Tipo");
            switch (tooltipPackageDeclare[2]) {
                case 1:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-bool.png)");
                    $("#content-section-1 > p").html("Booleano(Lógico)");
                    break;
                case 2:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-char.png)");
                    $("#content-section-1 > p").html("Caractere");
                    break;
                case 3:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-integer.png)");
                    $("#content-section-1 > p").html("Inteiro");
                    break;
                case 4:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-real.png)");
                    $("#content-section-1 > p").html("Real");
                    break;
                case 5:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-string.png)");
                    $("#content-section-1 > p").html("String");
                    break;
            }
        }
    });

    $(document).on("mouseover", "#register1", function () {
        if(tooltipRegister1[0] != null)
        {
            $("#title").html(tooltipRegister1[0]);
            $("#job").html(tooltipRegister1[1]);
            $("#content-section-2 > h2").html("Valor");
            $("#content-section-2 > p").html(tooltipRegister1[3]);
            $("#content-section-1 > h2").html("Tipo");
            switch (tooltipRegister1[2]) {
                case 1:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-bool.png)");
                    $("#content-section-1 > p").html("Booleano(Lógico)");
                    break;
                case 2:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-char.png)");
                    $("#content-section-1 > p").html("Caractere");
                    break;
                case 3:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-integer.png)");
                    $("#content-section-1 > p").html("Inteiro");
                    break;
                case 4:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-real.png)");
                    $("#content-section-1 > p").html("Real");
                    break;
                case 5:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-string.png)");
                    $("#content-section-1 > p").html("String");
                    break;
            }
        }
    });

    $(document).on("mouseover", "#register2", function () {
        if(tooltipRegister2[0] != null)
        {
            $("#title").html(tooltipRegister2[0]);
            $("#job").html(tooltipRegister2[1]);
            $("#content-section-2 > h2").html("Valor");
            $("#content-section-2 > p").html(tooltipRegister2[3]);
            $("#content-section-1 > h2").html("Tipo");
            switch (tooltipRegister2[2]) {
                case 1:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-bool.png)");
                    $("#content-section-1 > p").html("Booleano(Lógico)");
                    break;
                case 2:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-char.png)");
                    $("#content-section-1 > p").html("Caractere");
                    break;
                case 3:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-integer.png)");
                    $("#content-section-1 > p").html("Inteiro");
                    break;
                case 4:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-real.png)");
                    $("#content-section-1 > p").html("Real");
                    break;
                case 5:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-string.png)");
                    $("#content-section-1 > p").html("String");
                    break;
            }
        }
    });

    $(document).on("mouseover", "#register3", function () {
        if(tooltipRegister3[0] != null)
        {
            $("#title").html(tooltipRegister3[0]);
            $("#job").html(tooltipRegister3[1]);
            $("#content-section-2 > h2").html("Valor");
            $("#content-section-2 > p").html(tooltipRegister3[3]);
            $("#content-section-1 > h2").html("Tipo");
            switch (tooltipRegister3[2]) {
                case 1:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-bool.png)");
                    $("#content-section-1 > p").html("Booleano(Lógico)");
                    break;
                case 2:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-char.png)");
                    $("#content-section-1 > p").html("Caractere");
                    break;
                case 3:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-integer.png)");
                    $("#content-section-1 > p").html("Inteiro");
                    break;
                case 4:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-real.png)");
                    $("#content-section-1 > p").html("Real");
                    break;
                case 5:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-string.png)");
                    $("#content-section-1 > p").html("String");
                    break;
            }
        }
    });
    
    $(document).on("mouseover", "#register4", function () {
        if(tooltipRegister4[0] != null)
        {
            $("#title").html(tooltipRegister4[0]);
            $("#job").html(tooltipRegister4[1]);
            $("#content-section-2 > h2").html("Valor");
            $("#content-section-2 > p").html(tooltipRegister4[3]);
            $("#content-section-1 > h2").html("Tipo");
            switch (tooltipRegister4[2]) {
                case 1:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-bool.png)");
                    $("#content-section-1 > p").html("Booleano(Lógico)");
                    break;
                case 2:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-char.png)");
                    $("#content-section-1 > p").html("Caractere");
                    break;
                case 3:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-integer.png)");
                    $("#content-section-1 > p").html("Inteiro");
                    break;
                case 4:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-real.png)");
                    $("#content-section-1 > p").html("Real");
                    break;
                case 5:
                    $("#content-portrait").css("background-image", "url(../images/tooltip/package-string.png)");
                    $("#content-section-1 > p").html("String");
                    break;
            }
        }
    });

});