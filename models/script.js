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
            console.log(this.data[top]);
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
        console.log(this.data[index]);
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

            var parsedCode;
            var breakpoints;
            var input = Array();

            scriptToRun = "";
            programValues = Array();
            programVariables = Array();
            programIfs = Array();

            try {
                fs.writeFileSync(filepath + filename + ".pas", params.body.script, function (err) {
                    console.log('success to create ' + filename + ".pas");
                });
                result = exec(execCompile + filepath + filename + ".pas").toString();
            }
            catch (error) {
                console.log(error.message);
                
                fs.unlinkSync(filepath + filename + ".pas");

                return callback([], new Error("Falha ao compilar o código!"));
            }

            try {
                input = ParseInput(params.body.input);
                parsedCode = ParsePascal2Animation(params.body.script, input);
                breakpoints = JSON.parse(params.body.breakpoint);
                DeleteFiles(filepath + filename);

                fs.writeFileSync(filepath + filename + "_debug.pas", scriptToRun, function (err) {
                    console.log('success to create ' + filename + "_debug.pas");
                });
                fs.writeFileSync(filepath + filename + "_debug.txt", "", function (err) {
                    console.log('success to create ' + filename + "_debug.txt");
                });

                result = exec(execCompile + filepath + filename + "_debug.pas").toString();
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
            } catch (error) {
                console.log(error.message);
                DeleteFiles(filepath + filename + "_debug", true);

                return callback([], new Error("Falha ao executar o código!"));
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

    function ParsePascal2Animation(code, input) {

        const regexCleanSpaces = /\s\s+/g;

        const regexProgram = /program\s*(\S+);/gi;
        const regexVariable = /(.*):(?:\s)?(char|integer|boolean|real|string)/gi;
        const regexWrite = /((?:write|writeln)(?:\s)?\()(.*)(\))/i;
        const regexRead = /((?:read|readln)(?:\s)?\()(.*)(\))/i;
        const regexIf = /if(?:\s)?(.*)\sthen/gi;
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

        lines = code.split("\n");
        lines.forEach(line => {
            linecont++;
            line = line.replace(/\t/g, '');
            found = null;
            console.log(linecont + "-" + line);

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
                variables = variables.replace(regexCleanVar, "");
                variables = variables.split(" ");
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

                var withoutQuote = found[2].replace(regexQuote, "");
                if (withoutQuote == "") {
                    scriptToRun += "write('');\n";
                    instructionsAnimation[linecont - 1][0] = "write";
                    instructionsAnimation[linecont - 1][1] = [line, FindNextInstruction(lines, linecont), [found[2], 5, found[2]]];
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

                console.log(variables);

                if (variables.length > 1) {

                    var arrayVariablesAnimation = Array();
                    var contPosition = 0;
                    variables.forEach(variable => {
                        arrayVariablesAnimation[contPosition++] = variable;
                        arrayVariablesAnimation[contPosition++] = GetVarTypeByString(GetVariableType(variable));
                        arrayVariablesAnimation[contPosition++] = "algo";
                        scriptToRun += "writeln(" + variable + ");\n";
                    });

                    instructionsAnimation[linecont - 1][0] = "write(y + z)";
                    instructionsAnimation[linecont - 1][1] = [line, FindNextInstruction(lines, linecont), line, arrayVariablesAnimation];


                } else {
                    scriptToRun += "writeln(" + variables[0] + ");\n";
                    instructionsAnimation[linecont - 1][0] = "write";
                    instructionsAnimation[linecont - 1][1] = [line, FindNextInstruction(lines, linecont), [variables[0], GetVarTypeByString(GetVariableType(variables[0])), null]];
                }
                return;
            }

            found = regexRead.exec(line);
            if (found) {
                var type = GetVarTypeByString(GetVariableType(found[2]));
                instructionsAnimation[linecont - 1] = Array(2);
                instructionsAnimation[linecont - 1][0] = "read";
                instructionsAnimation[linecont - 1][1] = [found[0], FindNextInstruction(lines, linecont), [found[2], type, input[inputCont]]];
                if (type == 2 || type == 5) {
                    input[inputCont] = "'" + input[inputCont] + "'";
                }
                scriptToRun += found[2] + ":=" + input[inputCont] + ";\n";
                inputCont++;
                // console.log(instructionsAnimation[linecont - 1]);
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
                    arrayVariablesAnimation[contPosition++] = variable;
                    arrayVariablesAnimation[contPosition++] = GetVarTypeByString(GetVariableType(variable));
                    arrayVariablesAnimation[contPosition++] = null;
                    scriptToRun += "writeln(" + variable + ");\n";
                });
                scriptToRun += line + "\n";
                flagIf = true;

                instructionsAnimation[linecont - 1][1] = [found[0], FindNextInstruction(lines, linecont), found[1], null, arrayVariablesAnimation];
                // console.log(instructionsAnimation[linecont - 1]);
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
                    arrayVariablesAnimation[contPosition++] = variable;
                    arrayVariablesAnimation[contPosition++] = GetVarTypeByString(GetVariableType(variable));
                    arrayVariablesAnimation[contPosition++] = null;
                    scriptToRun += "writeln(" + variable + ");\n";
                });
                scriptToRun += "writeln(" + found[2] + ");\n";

                instructionsAnimation[linecont - 1][1] = [found[0], FindNextInstruction(lines, linecont), found[3], null, arrayVariablesAnimation];
                // console.log(instructionsAnimation[linecont - 1]);
                regexAttr.lastIndex = 0;

                return
            }


            if (flagIf) {
                var ifInfo = Array(3);
                if (line.trim().toLowerCase() == "begin") {
                    scriptToRun += line + "\n";
                    scriptToRun += "writeln('true');\n";
                    ifInfo[0] = linecont - 1;
                    ifInfo[1] = linecont;
                    ifStack.push(ifInfo);
                    ifStack.print();
                } else {
                    scriptToRun += "begin\n";
                    scriptToRun += "writeln('true');\n";
                    if (lines[linecont + 1].trim().toLowerCase() == "else") {
                        scriptToRun += "end\n";
                    } else {
                        scriptToRun += "end;\n";
                    }
                    ifInfo[0] = linecont - 1;
                    ifInfo[1] = linecont;
                    ifInfo[2] = linecont;
                    programIfs[programIfs.length] = ifInfo;
                    console.log(programIfs);
                }
                flagIf = false;
                return;
            } else if (line.trim().toLowerCase() == "end") {
                var aux = new Array(5);
                ifStack.print();
                aux = ifStack.pop();
                aux[2] = linecont;
                aux[3] = linecont + 2;
                if (lines[linecont + 1].trim().toLowerCase() != "begin") {
                    aux[4] = linecont + 2;
                    programIfs[programIfs.length] = aux;
                    console.log(programIfs);
                } else {
                    ifStack.push(aux);
                    ifStack.print();
                }
            } else if (line.trim().toLowerCase() == "end;") {
                ifStack.print();
                var aux = ifStack.pop();
                aux[aux.length] = linecont;
                programIfs[programIfs.length] = aux;
                console.log(programIfs);
            }
            scriptToRun += line + "\n";
        });

        // console.log(scriptToRun);
        return instructionsAnimation;
    }

    function FindNextInstruction(code, numLine) {
        for (var cont = numLine; cont < code.length; cont++) {
            if (code[cont] != "") {
                var string = code[cont].replace(/\t/g, '');
                return string;
            }
        }
        return "";
    }

    function StoreVariables(variables, type) {
        variables.forEach(element => {
            var index = programVariables.length;
            programVariables[index] = Array(2);
            programVariables[index][0] = element;
            programVariables[index][1] = type;
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
                    for (var pos = 2; pos < variables.length; pos = pos + 3) {
                        variables[pos] = programValues.shift();
                    }
                    parsedCode[cont][1][4] = variables;
                    index = programIfs.findIndex(element => element[0] == line);
                    var resultExpression = programValues.shift();
                    if (resultExpression != "true") {
                        parsedCode[cont][1][3] = "Falso";
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
                    console.log(variables);
                    console.log(programValues);
                    for (var pos = 2; pos < variables.length; pos = pos + 3) {
                        variables[pos] = programValues.shift();
                    }
                    parsedCode[cont][1][3] = variables;
                } else if (parsedCode[cont][0] == "write") {
                    var variable = parsedCode[cont][1][2];
                    if (variable[2] == null) {
                        variable[2] = programValues.shift();
                        parsedCode[cont][1][2] = variable;
                    }
                } else if (parsedCode[cont][0] == "x = y + z") {
                    var variables = parsedCode[cont][1][4];
                    for (var pos = 2; pos < variables.length; pos = pos + 3) {
                        variables[pos] = programValues.shift();
                    }
                    parsedCode[cont][1][3] = programValues.shift();
                }
            }
            cont++;
            line++;
        }
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

        if (breakpoints != null) {
            for (var cont = 0; cont < parsedCode.length; cont++) {
                if (breakpoints.length > 0 && cont == breakpoints[0]) {
                    breakpoints.shift();
                } else {
                    indexFilter.push(cont);
                }
            }
        }

        indexFilter = indexFilter.filter(function (element, index, self) {
            return index === self.indexOf(element);
        })
        indexFilter = indexFilter.sort(function (a, b) { return a - b });

        for (var index = indexFilter.length - 1; index >= 0; index--) {
            parsedCode.splice(indexFilter[index], 1);
        }

        parsedCode = parsedCode.filter(function (element) {
            if (typeof element != "undefined") {
                return element;
            }
        })

        return parsedCode;
    }

    function GetVariableType(variable) {
        index = programVariables.findIndex(element => element[0] == variable);
        return programVariables[index][1];
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
        fs.unlinkSync(path + ".pas");
        fs.unlinkSync(path + ".exe");
        fs.unlinkSync(path + ".o");
        if (txt) {
            fs.unlinkSync(path + ".txt");
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



};