const { parse } = require("path");

class Stack {
    constructor() {
        this.data = [];
        this.top = 0;
    }
    push(element) {
        this.data[this.top] = element;
        this.top = this.top + 1;
    }
    length() {
        return this.top;
    }
    peek() {
        return this.data[this.top - 1];
    }
    isEmpty() {
        return this.top === 0;
    }
    pop() {
        if (this.isEmpty() === false) {
            this.top = this.top - 1;
            return this.data.pop(); // removes the last element
        }
    }
    print() {
        var top = this.top - 1; // because top points to index where new    element to be inserted
        while (top >= 0) { // print upto 0th index
            top--;
        }
    }
    reverse() {
        this._reverse(this.top - 1);
    }
    _reverse(index) {
        if (index != 0) {
            this._reverse(index - 1);
        }
    }
}
module.exports = app => {
    var exec = require("child_process").execSync;
    var path = require("path");
    const { nanoid } = require('nanoid');
    const filepath = './files/';
    const execCompile = "fpc -g ";

    var scriptToRun = "";
    var programValues = Array();
    var programVariables = Array();
    var programIfs = Array();

    // Num Matches for variables types for animation Core Inc.
    // const sizePackage = { 1: "bool", 2: "char", 3: "integer", 4: "real", 5: "string" };

    return {
        write: (params, callback) => {

            if(CheckLegal(params.body.script))
            {
                return callback([], new Error("Comandos inválidos utilizados!"));
            }

            fs = require('fs');
            filename = nanoid(10);

            var parsedCode = [];
            var breakpoints;
            var input = [];
            var flagMissInput = Array();
            flagMissInput[0] = false;

            scriptToRun = "";
            programValues = Array();
            programVariables = Array();
            programIfs = Array();

            try {
                fs.writeFileSync(filepath + filename + ".pas", params.body.script, function (err) {
                    console.log('success to create ' + filename + ".pas");
                });
                result = exec(execCompile + filepath + filename + ".pas" + ' -o"' + filename + '.exe"').toString();
            }
            catch (error) {
                console.log(error.message);
                
                fs.unlinkSync(filepath + filename + ".pas");

                return callback([], new Error("Falha ao compilar!"));
            }

            try {
                input = ParseInput(params.body.input);
                parsedCode = ParsePascal2Animation(params.body.script, input, flagMissInput);
                breakpoints = JSON.parse(params.body.breakpoint);
                DeleteFiles(filepath + filename);

                if(flagMissInput[0] == false)
                {
                    fs.writeFileSync(filepath + filename + "_debug.pas", scriptToRun, function (err) {
                        console.log('success to create ' + filename + "_debug.pas");
                    });
                    fs.writeFileSync(filepath + filename + "_debug.txt", "", function (err) {
                        console.log('success to create ' + filename + "_debug.txt");
                    });
    
                    result = exec(execCompile + filepath + filename + "_debug.pas" + ' -o"' + filename + '_debug.exe"').toString();
                    var absolutePathExe = path.resolve(filepath + filename + "_debug.exe");
                    var absolutePathTxt = path.resolve(filepath + filename + "_debug.txt");
                    result = exec(absolutePathExe + " > " + absolutePathTxt);
                    result = fs.readFileSync(absolutePathTxt, "utf8");
                    DeleteFiles(filepath + filename + "_debug", true);
    
                    programValues = result.split("\n");
                    programValues = programValues.map(value => value.trim());
                    parsedCode = SetValues(parsedCode);
    
                    var finalArrayAnimation = CleanArrayAnimation(parsedCode, breakpoints);
                    finalArrayAnimation = JSON.stringify(finalArrayAnimation);
                }
                else
                {
                    console.log("Falta de Input!");
                    return callback([], new Error("Entrada de dados necessária!"));
                }

            } catch (error) {
                console.log(error);
                DeleteFiles(filepath + filename + "_debug", true);

                if(flagMissInput[0])
                {
                    return callback([], new Error("Entrada de dados necessária!"));
                }
                else
                {
                    return callback([], new Error("Falha ao executar!"));
                }
            }

            return callback([
                { script: params.body.script },
                { input: params.body.input },
                { output: "Arquivo Processado com Sucesso" },
                { animation: finalArrayAnimation },
            ]);
        }
    };

    function ParseInput(string) {
        const regexCleanGarbage = /[^A-Za-z0-9\*<>=+-\s\/]/gi;

        string = string.replace(regexCleanGarbage, " ");

        string = string.split(/[\s,]+/);

        string = string.filter(function (element) {
            if (element != "" && element != " ") {
                return element;
            }
        });

        return string;

    }

    function ParsePascal2Animation(code, input, flagMissInput) {

        const regexCleanSpaces = /\s\s+/g;
        const regexEndOfLine = /([\s\S])(;)/gi;

        const regexProgram = /program\s*(\S+);/gi;
        const regexVariable = /(.*):(?:\s)?(char|integer|boolean|real|string)/gi;
        const regexWrite = /((?:write|writeln)(?:\s)?\()(.*)(\))/i;
        const regexReplaceWrite = /((?:write)(\s)*\()/i;
        const regexRead = /((?:read|readln)(?:\s)?\()(.*)(\))/i;
        const regexIf = /if(?:\s)?(.*)\sthen/gi;
        const regexElse = /(else)(?:\s)if(?:\s)?(.*)\sthen/gi;
        const regexAttr = /((\S+)(?:\s?):=).(.+);/gi;

        const regexQuote = /(["'])(?:(?=(\\?))\2.)*?\1/gi;
        const regexCleanFunctions = /\b([a-zA-Z])*\(/gi;
        const regexCleanVar = /[^A-Za-z0-9\*<>=+-\s\/]/gi;
        const regexCleanSignals = /[<>=+-/*]/gi;
        const regexCleanBool = /(and|or|not|xor)/gi;
        const regexCleanVarConst = /(var|const)\s/gi;


        var linecont = 0;
        var inputCont = 0;
        var lines = Array();
        var instructionsAnimation = Array();
        var found;
        var ifStack = new Stack();
        var flagIf = false;
        var appendToRun = null;

        lines = code.split("\n");
        lines.forEach(line => {
            linecont++;
            line = line.replace(/\t/g, '');
            found = null;
            if(line)
            console.log(linecont + "-" + line);

            if (flagIf) {
                flagIf = false;
                var ifInfo = Array();
                ifInfo[0] = linecont - 1;
                ifInfo[1] = linecont;
                if (line.trim().toLowerCase() == "begin") {
                    ifStack.push(ifInfo);
                    ifStack.print();
                    scriptToRun += line + "\n";
                    scriptToRun += "writeln('true " + ifInfo[0] +"');\n";
                    return
                } else {
                    ifInfo[2] = linecont;
                    scriptToRun += "begin\n";
                    scriptToRun += "writeln('true " + ifInfo[0] +"');\n";
                    
                    if (lines[linecont] != undefined)
                    {
                        var foundElse = regexElse.exec(lines[linecont]);
                        if(lines[linecont].trim().toLowerCase() == "else" || (foundElse != null && foundElse[1].trim().toLowerCase() == "else")) {
                            appendToRun = "end\n";
                        } else {
                            appendToRun = "end;\n";
                        }
                    } else{
                        scriptToRun += "end;\n";
                        return
                    } 
                    programIfs[programIfs.length] = ifInfo;
                    regexElse.lastIndex = 0;
                }
            } else if (line.trim().toLowerCase() == "end") {
                scriptToRun += line + "\n";
                var aux = new Array(5);
                ifStack.print();
                aux = ifStack.pop();
                aux[2] = linecont;
                aux[3] = linecont + 2;
                if (lines[linecont + 1].trim().toLowerCase() != "begin") {
                    aux[4] = linecont + 2;
                    programIfs[programIfs.length] = aux;
                } else {
                    ifStack.push(aux);
                    ifStack.print();
                }
                return
            } else if (line.trim().toLowerCase() == "end;") {
                scriptToRun += line + "\n";
                ifStack.print();
                var aux = ifStack.pop();
                aux[aux.length] = linecont;
                programIfs[programIfs.length] = aux;
                return
            }

            line = line.replace(regexCleanSpaces, " ");
            found = regexProgram.exec(line);
            if (found) {
                instructionsAnimation[linecont - 1] = Array(2);
                instructionsAnimation[linecont - 1][0] = "program";
                instructionsAnimation[linecont - 1][1] = [found[0], FindNextInstruction(lines, linecont), found[1]];
                regexProgram.lastIndex = 0;

                scriptToRun += line + "\n";
                return;
            }

            found = regexVariable.exec(line);
            if (found) {
                var variables = found[1].replace(regexCleanVarConst, "");
                variables = variables.replace(/\s+/g, "");
                variables = variables.split(",");
                variables = variables.filter(function (element) {
                    if (element != "" && element != " ") {
                        return element;
                    }
                })
                StoreVariables(variables, found[2]);

                instructionsAnimation[linecont - 1] = Array(2);
                instructionsAnimation[linecont - 1][0] = "var";
                instructionsAnimation[linecont - 1][1] = [found[0], FindNextInstruction(lines, linecont), [found[1], GetVarTypeByString(found[2]), ""]];
                regexVariable.lastIndex = 0;

                scriptToRun += line + "\n";
                return;
            }

            found = regexWrite.exec(line);
            if (found) {
                regexProgram.lastIndex = 0;

                instructionsAnimation[linecont - 1] = Array(2);

                // Fix problem when values concat forward due missing \n
                line = line.replace(regexReplaceWrite, "writeln(");

                var quotes = found[2].match(regexQuote, "");
                var withoutQuote = found[2].replace(regexQuote, "");
                if (withoutQuote == "") {
                    if(!regexEndOfLine.exec(line))
                    {
                        line += ";";
                    }
                    regexEndOfLine.lastIndex = 0;
                    scriptToRun += line + "\n";
                    instructionsAnimation[linecont - 1][0] = "write";
                    instructionsAnimation[linecont - 1][1] = [line, FindNextInstruction(lines, linecont), [null, 5, null]];
                    return;
                }

                var cleaningString = withoutQuote.replace(regexCleanFunctions, " ");
                cleaningString = cleaningString.replace(regexCleanVar, " ");
                cleaningString = cleaningString.replace(regexCleanSignals, " ");
                cleaningString = cleaningString.replace(regexCleanBool, " ");

                var variables = cleaningString.split(" ");
                variables = variables.filter(function (element) {
                    if (element != "" && element != " " && isNaN(element)) {
                        return element;
                    }
                });
                variables = variables.filter(function (element, index, self) {
                    return index === self.indexOf(element);
                })

                if (variables.length > 0) {

                    var arrayVariablesAnimation = Array();
                    var contPosition = 0;
                    if(quotes != null)
                    {
                        quotes.forEach(quote =>{
                            arrayVariablesAnimation[contPosition+2] = quote;
                            arrayVariablesAnimation[contPosition+2] = GetVarTypeByString("string");
                            arrayVariablesAnimation[contPosition+2] = quote;
                            scriptToRun += "writeln(" + quote + ");\n";
                        })
                    }

                    variables.forEach(variable => {
                        arrayVariablesAnimation[contPosition++] = variable;
                        arrayVariablesAnimation[contPosition++] = GetVarTypeByString(GetVariableType(variable));
                        arrayVariablesAnimation[contPosition++] = null;
                        scriptToRun += "writeln(" + variable + ");\n";
                    });

                    if(variables.length == 1 && quotes == null)
                    {
                        instructionsAnimation[linecont - 1][0] = "write";
                        instructionsAnimation[linecont - 1][1] = [line, FindNextInstruction(lines, linecont), [variables[0], GetVarTypeByString(GetVariableType(variables[0])), null]];
                    }
                    else
                    {
                        instructionsAnimation[linecont - 1][0] = "write(y + z)";
                        instructionsAnimation[linecont - 1][1] = [line, FindNextInstruction(lines, linecont), line, arrayVariablesAnimation];
                    }
                }
                return;
            }

            found = regexRead.exec(line);
            if (found) {
                variables = found[2].replace(/\s+/g, "");
                variables = variables.split(",");
                variables = variables.filter(function (element) {
                    if (element != "" && element != " ") {
                        return element;
                    }
                });
                variables = variables.filter(function (element, index, self) {
                    return index === self.indexOf(element);
                })

                var arrayVariablesAnimation = [];
                var contPosition = 0;
                variables.forEach(variable => {
                    if(isNaN(variable))
                    {
                        if(input[inputCont] == undefined)
                        {
                            flagMissInput[0] = true;
                        }

                        var type = GetVarTypeByString(GetVariableType(variable));
                        UpdateVariable(variable, input[inputCont]);
                        arrayVariablesAnimation[contPosition++] = variable;
                        arrayVariablesAnimation[contPosition++] = type;
                        arrayVariablesAnimation[contPosition++] = input[inputCont];
                        
                        if (type == 2 || type == 5) {
                            input[inputCont] = "'" + input[inputCont] + "'";
                        }
                        scriptToRun += variable + ":=" + input[inputCont] + ";\n";
                        inputCont++;
                    }
                });
                
                instructionsAnimation[linecont - 1] = Array(2);
                instructionsAnimation[linecont - 1][0] = "read";
                instructionsAnimation[linecont - 1][1] = [found[0], FindNextInstruction(lines, linecont), arrayVariablesAnimation];
                regexProgram.lastIndex = 0;

                return;
            }

            found = regexIf.exec(line);
            if (found) {

                instructionsAnimation[linecont - 1] = Array(2);
                instructionsAnimation[linecont - 1][0] = "if";

                var cleaningString = found[1].replace(regexQuote, "");

                cleaningString = cleaningString.replace(regexCleanFunctions, " ");
                cleaningString = cleaningString.replace(regexCleanVar, "");
                cleaningString = cleaningString.replace(regexCleanSignals, " ");
                cleaningString = cleaningString.replace(regexCleanBool, " ");

                var variables = cleaningString.split(" ");
                variables = variables.filter(function (element) {
                    if (element != "" && element != " " && isNaN(element)) {
                        return element;
                    }
                });
                variables = variables.filter(function (element, index, self) {
                    return index === self.indexOf(element);
                })
                
                var arrayVariablesAnimation = Array();
                var contPosition = 0;
                variables.forEach(variable => {
                    if(isNaN(variable))
                    {
                        arrayVariablesAnimation[contPosition++] = variable;
                        arrayVariablesAnimation[contPosition++] = GetVarTypeByString(GetVariableType(variable));
                        arrayVariablesAnimation[contPosition++] = null;
                        // scriptToRun += "writeln(" + variable + ");\n";
                    }
                });
                
                if(appendToRun != null)
                {
                    scriptToRun += appendToRun;
                    appendToRun = null;
                }

                scriptToRun += line + "\n";
                flagIf = true;
                
                instructionsAnimation[linecont - 1][1] = [found[0], FindNextInstruction(lines, linecont), found[1], null, arrayVariablesAnimation];
                regexIf.lastIndex = 0;
                return
            }
            
            found = regexAttr.exec(line);
            if (found) {
                instructionsAnimation[linecont - 1] = Array(2);
                instructionsAnimation[linecont - 1][0] = "x = y + z";
                
                var cleaningString = found[3].replace(regexQuote, "");
                cleaningString = cleaningString.replace(regexCleanFunctions, " ");
                cleaningString = cleaningString.replace(regexCleanVar, "");
                cleaningString = cleaningString.replace(regexCleanSignals, " ");
                cleaningString = cleaningString.replace(regexCleanBool, " ");
                
                var variables = cleaningString.split(" ");
                variables = variables.filter(function (element) {
                    if (element != "" && element != " " && isNaN(element)) {
                        return element;
                    }
                });
                variables = variables.filter(function (element, index, self) {
                    return index === self.indexOf(element);
                })
                
                var arrayVariablesAnimation = Array();
                arrayVariablesAnimation[0] = found[2];
                arrayVariablesAnimation[1] = GetVarTypeByString(GetVariableType(found[2]));
                arrayVariablesAnimation[2] = null;
                var contPosition = 3;
                scriptToRun += "writeln(" + found[2] + ");\n";
                scriptToRun += line + "\n";
                variables.forEach(variable => {
                    if(isNaN(variable) && variable != found[2])
                    {
                        arrayVariablesAnimation[contPosition++] = variable;
                        arrayVariablesAnimation[contPosition++] = GetVarTypeByString(GetVariableType(variable));
                        arrayVariablesAnimation[contPosition++] = null;
                        scriptToRun += "writeln(" + variable + ");\n";
                    }
                });
                scriptToRun += "writeln(" + found[2] + ");\n";
                
                instructionsAnimation[linecont - 1][1] = [found[0], FindNextInstruction(lines, linecont), found[3], null, arrayVariablesAnimation];
                regexAttr.lastIndex = 0;
                
                return
            }
            

            if(appendToRun != null)
            {
                scriptToRun += appendToRun;
                appendToRun = null;
            }

            scriptToRun += line + "\n";
        });
        console.log(scriptToRun);
        return instructionsAnimation;
    }

    function FindNextInstruction(code, numLine) {
        for (var cont = numLine; cont < code.length; cont++) {
            var string = code[cont].replace(/\t/g, '');
            string = string.trim();
            if (string != "") {
                return string;
            }
        }
        return "";
    }

    function StoreVariables(variables, type, value = null) {
        variables.forEach(element => {
            var index = programVariables.length;
            programVariables[index] = Array(3);
            programVariables[index][0] = element;
            programVariables[index][1] = type;
            programVariables[index][2] = value;
        });
    }

    function SetValues(parsedCode) {
        var cont = 0;
        var line = 1;
        programValues = programValues.filter(function (element) {
            if (element != "" && element != " ") {
                return element;
            }
        });


        console.log("PROGRAM VALUES");
        console.log(programValues);

        while (cont < parsedCode.length) {
            if (parsedCode[cont] == null) {
                index = programIfs.findIndex(element => element[0] == line);
                if (index > -1) {
                    line = programIfs[index][2];
                    cont = programIfs[index][2] - 1;
                }
            } else {
                if (parsedCode[cont][0] == "if") {
                    var variables = parsedCode[cont][1][4];
                    for (var pos = 0; pos < variables.length; pos = pos + 3) {
                        var aux = GetVariable(variables[pos]);
                        variables[pos+2] = aux[2];
                    }
                    parsedCode[cont][1][4] = variables;
                    index = programIfs.findIndex(element => element[0] == line);
                    var aux = programValues.shift();
                    console.log(aux);
                    var resultExpression = aux != undefined ? aux.split(" ") : aux;
                    if (resultExpression == undefined || (resultExpression[0] != "true" || (resultExpression[0] == "true" && parseInt(resultExpression[1]) != line))) {
                        parsedCode[cont][1][3] = "Falso";
                        programValues.unshift(aux);
                        line = programIfs[index][2];
                        cont = programIfs[index][2] - 1;
                    } else {
                        parsedCode[cont][1][3] = "Verdadeiro";
                        if (programIfs[index][3] != null) {
                            var aux = programIfs[index];
                            programIfs[index] = null;
                            var aux2 = new Array(3);
                            aux2[0] = aux[2] + 1;
                            aux2[1] = aux[3];
                            aux2[2] = aux[4];
                            programIfs[index] = aux2;
                        } else {
                            programIfs[index][0] = 0;
                        }
                    }
                } else if (parsedCode[cont][0] == "write(y + z)") {
                    var variables = parsedCode[cont][1][3];
                    for (var pos = 2; pos < variables.length; pos = pos + 3) {
                        variables[pos] = programValues.shift();
                    }
                    parsedCode[cont][1][3] = variables;
                } else if (parsedCode[cont][0] == "write") {
                    var variable = parsedCode[cont][1][2];
                    if (variable[2] == null) {
                        variable[2] = programValues.shift();
                        variable[0] = variable[2];
                        parsedCode[cont][1][2] = variable;
                    }
                } else if (parsedCode[cont][0] == "x = y + z") {
                    var variables = parsedCode[cont][1][4];
                    for (var pos = 2; pos < variables.length; pos = pos + 3) {
                        variables[pos] = programValues.shift();
                        UpdateVariable(variables[pos-2], variables[pos]);
                    }
                    parsedCode[cont][1][3] = programValues.shift();
                    UpdateVariable(parsedCode[cont][1][1], parsedCode[cont][1][3]);
                }
            }
            cont++;
            line++;
        }
        // console.log("---------------- CODIGO CONVERTIDO ---------------")
        // parsedCode.forEach(element => {
        //     console.log(element);
        // });
        return parsedCode;
    }

    function CleanArrayAnimation(parsedCode, breakpoints) {
        var indexFilter = Array();

        programIfs.forEach(element => {
            if (element[0] != 0) {
                for (var cont = element[1]; cont <= element[2]; cont++) {
                    indexFilter.push(cont);
                }
            }
        });
        console.log(indexFilter);
        console.log("PROGRAM IF:\n");
        console.log(programIfs);

        if (breakpoints != null) {
            for (var cont = 0; cont < parsedCode.length; cont++) {
                if (breakpoints.length > 0 && cont == breakpoints[0]) {
                    breakpoints.shift();
                } else {
                    indexFilter.push(cont+1);
                }
            }
        }

        indexFilter = indexFilter.filter(function (element, index, self) {
            return index === self.indexOf(element);
        })
        indexFilter = indexFilter.sort(function (a, b) { return a - b });

        for (var index = indexFilter.length - 1; index >= 0; index--) {
            parsedCode.splice(indexFilter[index]-1, 1);
        }

        parsedCode = parsedCode.filter(function (element) {
            if (typeof element != "undefined") {
                return element;
            }
        })

        parsedCode = SplitRead(parsedCode);
        console.log("---------------- CODIGO FINAL ---------------");
        parsedCode.forEach(element => {
            console.log(element);
        });
        return parsedCode;
    }

    function SplitRead(parsedCode)
    {
        var aux = Array.from(parsedCode);
        var cont = 1;
        var size = 3;
        var auxVar = [];

        aux.forEach(function(line, i){
            if(line[0] == "read" && line[1][2].length > 3)
            {
                variables = Array.from(parsedCode[i][1][2]);
                while(variables.length > 0)
                {
                    auxVar.push(variables.splice(0, size));
                }
                parsedCode[i][1][2] = Array.from(auxVar[0]);
                while(cont < auxVar.length)
                {
                    var auxNode = copy(parsedCode[i]);
                    auxNode[1][2] = Array.from(auxVar[cont]);
                    parsedCode.splice((i+cont), 0, auxNode);
                    if((cont+1) < auxVar.length)
                    {
                        parsedCode[i+cont][1][1] = parsedCode[i+cont][1][0];
                    }
                    else
                    {
                        parsedCode[i+cont][1][1] = auxNode[1][1];
                    }
                    cont++;
                }
                parsedCode[i][1][1] = parsedCode[i][1][0];
            }
        });
        return parsedCode;
    }

    function GetVariable(variable) {
        index = programVariables.findIndex(element => element[0] == variable);
        return programVariables[index];
    }

    function GetVariableType(variable) {
        index = programVariables.findIndex(element => element[0] == variable);
        return programVariables[index][1];
    }

    function UpdateVariable(variable, value) {
        index = programVariables.findIndex(element => element[0] == variable);
        programVariables[index][2] = value;
        return programVariables[index][2];
    }

    function GetVarTypeByString(string) {
        switch (string.trim().toLowerCase()) {
            case "boolean":
                return 1;
                break;
            case "char":
                return 2;
                break;
            case "integer":
                return 3;
                break;
            case "real":
                return 4;
                break;
            case "string":
                return 5;
                break;

        }
    }

    function DeleteFiles(path, txt = false) {
        if(fs.existsSync(path + ".pas"))
        {
            fs.unlinkSync(path + ".pas");
        }
        if(fs.existsSync(path + ".exe"))
        {
            fs.unlinkSync(path + ".exe");
        }
        if(fs.existsSync(path + ".o"))
        {
            fs.unlinkSync(path + ".o");
        }
        if (txt) {
            if(fs.existsSync(path + ".txt"))
            {
                fs.unlinkSync(path + ".txt");
            }
        }
    }

    function CheckLegal(script){
        const regexIllegalFunctions = /\b(assign|append|ChDir|DumpStack|Erase|KillThread|Get([a-zA-Z])*|Sys([a-zA-Z])*)\b/gi;
        const regexIllegalUses = /\b(uses)\b/gi;
        var found;

        found = regexIllegalFunctions.exec(script);
        if (found) {
            return true;
        }
        found = regexIllegalUses.exec(script);
        if (found) {
            return true;
        }
        return false;
    }

    // Função de deep copy pra array, pq o javascript não faz :)
    function copy(aObject) {
        if (!aObject) {
          return aObject;
        }
      
        let v;
        let bObject = Array.isArray(aObject) ? [] : {};
        for (const k in aObject) {
          v = aObject[k];
          bObject[k] = (typeof v === "object") ? copy(v) : v;
        }
      
        return bObject;
    }



};