function CoreInc(container, size = " medium")
{
    container.append('<div id="core"></div>');
    container.append('<div id="tooltip-core"></div>');

    var divCoreInc = $("#core");
    var divTooltip = $("#tooltip-core");

    divCoreInc.addClass(size);
    divTooltip.addClass(size);

    divCoreInc.append('<div id="loading" class="' + size + '"><span id="program">' + GetLoadingPhrase() +'</span><div id="logo" class="'+ size + '"></div></div>');
    divCoreInc.append('<div id="screen" class="' + size + '"> <div id="portrait" class="' + size + '"></div><div id="panel-instructions"></div>');
    divCoreInc.append('<span id="pc-hud" class="hud">Comando Atual</span>');
    divCoreInc.append('<span id="ir-hud" class="hud">Próximo Comando</span>');
    $("#panel-instructions").append('<div id="title-instructions"></div>');
    $("#panel-instructions").append('<div id="pc-title"></div>');
    $("#panel-instructions").append('<div id="pc-data"></div>');
    $("#panel-instructions").append('<div id="ir-title"></div>');
    $("#panel-instructions").append('<div id="ir-data"></div>');

    $("#title-instructions").addClass(size);
    $("#pc-title").addClass(size);
    $("#ir-title").addClass(size);
    $("#pc-data").addClass(size);
    $("#ir-data").addClass(size);

    $("#title-instructions").html("Painel de Instruções");
    $("#pc-title").html("(PC) Instrução Atual");
    $("#ir-title").html("(IR) Próxima Instrução");
    $("#pc-data").html("read(x);");
    $("#ir-data").html("a = x + y;");

    divCoreInc.append('<div id="lucy" class="' + size + '"><div id="lucy-package" class="package '+ size + '"></div></div>');
    divCoreInc.append('<div id="m3m0" class="' + size + '"><div id="m3m0-package" class="package '+ size + '"></div></div>');
    divCoreInc.append('<div id="ursula" class="' + size + '"></div>');
    divCoreInc.append('<div id="bus" class="' + size + '"><div id="bus-package" class="package '+ size + '"></div></div>');
    divCoreInc.append('<div id="content-package" class="' + size + '"> <div id="package" class="' + size + '"></div> <div id="trail-get-package" class="package package-trail ' + size +'"></div> <div id="trail-set-package" class="package package-trail ' + size +'"></div> </div>');
    $("#content-package").append('<div id="door-inout"></div>');
    $("#door-inout").addClass(size);
    $("#content-package").append('<div id="register1"></div>');
    $("#register1").addClass("register " + size + " package");
    $("#content-package").append('<div id="register2"></div>');
    $("#register2").addClass("register " + size + " package");
    $("#content-package").append('<div id="register3"></div>');
    $("#register3").addClass("register " + size + " package");
    $("#content-package").append('<div id="register4"></div>');
    $("#register4").addClass("register " + size + " package");

    $("#content-package").append('<div id="package-declare"></div>');
    $("#package-declare").addClass(size + " package package-trail");
    $("#content-package").append('<div id="package-inout"></div>');
    $("#package-inout").addClass(size + " package package-trail");

	$("#program").fitText(2.3, { minFontSize: '0px', maxFontSize: '17px' });

	$("#title-instructions").fitText();
	$("#pc-title").fitText();
	$("#pc-data").fitText();
	$("#pc-hud").fitText(0.7);
	$("#ir-title").fitText();
	$("#ir-data").fitText();
	$("#ir-hud").fitText(0.7);

    // TOOLTIP DIVS
    divTooltip.append('<div id="content-title"> <h1 id="title" class="' + size +'"></h1> <h3 id="job" class="' + size +'"></h3> </div>');
    divTooltip.append('<div id="content-portrait"></div>');
    divTooltip.append('<div id="content-section-1"> <h2 class="subtitle ' + size +'">História</h2> <p class="description ' + size +'"></p> </div>');
    divTooltip.append('<div id="content-section-2"> <h2 class="subtitle ' + size +'">Fazendo...</h2> <p class="description ' + size +'"></p> </div>');
    
    $("#title").html("Como Usar");
    $("#job").html("Dicas");
    $("#content-portrait").css("background-image", "url(../images/tooltip/lucy.png)");
    $("#content-section-1 > h2").html("Instruções");
    $("#content-section-1 > p").html("1 - Inserir o código no campo de texto aqui do lado.<br\>2 - Inserir as entradas de dados necessárias, caso existam.<br\>3 - Pressionar o botão Executar.<br\>4 - Assistir a animação!");
    $("#content-section-2 > h2").html("Recomendado");
    $("#content-section-2 > p").html("Assista <a href='https://youtu.be/0ekg7FmJ2KY' target='_blank'>esse vídeo aqui.</a>");
}