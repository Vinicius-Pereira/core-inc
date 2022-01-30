// $(document).ready(function () {

//     // Just for test, but the same model 
//     //  (Matrix N x 2)
//     //  Column 1 = string key "name of the instruction"
//     //  Column 2 = array "all args needed"
//     var inputInstructions = new Array();

//     var string = "program";
//     var array = ["program program_name", "var a : integer;", "program_name"];


//     inputInstructions[0] = new Array(2);
//     inputInstructions[0][0] = string;
//     inputInstructions[0][1] = array;


//     string = "write(y + z)";
//     array = ["write(y + z)", "begin", "write(y + z)", ["y", 4, 2.0, "z", 4, 5.2]];

//     inputInstructions[1] = new Array(2);
//     inputInstructions[1][0] = string;
//     inputInstructions[1][1] = array;

//     string = "var";
//     array = ["var a : integer;", "begin", ["a", 3]];

//     inputInstructions[2] = new Array(2);
//     inputInstructions[2][0] = string;
//     inputInstructions[2][1] = array;

//     string = "read";
//     array = ["read(a);", "write(a);", ["a", 3, "42"]];

//     inputInstructions[3] = new Array(2);
//     inputInstructions[3][0] = string;
//     inputInstructions[3][1] = array;

//     string = "write";
//     array = ["write(a);", "if(a > b) then", ["a", 3, "42"]];

//     inputInstructions[4] = new Array(2);
//     inputInstructions[4][0] = string;
//     inputInstructions[4][1] = array;

//     string = "if";
//     array = ["if(a > b) then", "begin", "a > b", "true", ["a", 1, 5, "b", 2, 3]];

//     inputInstructions[5] = new Array(2);
//     inputInstructions[5][0] = string;
//     inputInstructions[5][1] = array;

//     // SetInstructions(inputInstructions);
// });

var animationStatus = false;

async function SetInstructions(instructions) {
    var end = await Main(instructions);
    return true;
}


function GetStatus()
{
    return animationStatus;
}

async function Main(instructions) {
    ResetRegisters();
    RemoveAnimationClasses();
    animationStatus = true;
    for (var index = 0; index < instructions.length; index++) {
        var string = instructions[index][0];
        var args = instructions[index][1];
        var end;

        switch (string.toLowerCase()) {
            case "program":
                end = await Begin(args[0], args[1], args[2]);
                console.log("terminou program");
                break;
            case "if":
                FadeLoading();
                end = await IfThenElse(args[0], args[1], args[2], args[3], args[4], args[5]);
                console.log("terminou if");
                break;
            case "var" || "CONST":
                FadeLoading();
                end = await Declare(args[0], args[1], args[2]);
                console.log("terminou declare");
                break;
            case "read":
                FadeLoading();
                end = await Read(args[0], args[1], args[2]);
                console.log("terminou read");
                break;
            case "write":
                FadeLoading();
                end = await Write(args[0], args[1], args[2]);
                console.log("terminou write");
                break;
            case "x = y + z":
                FadeLoading();
                end = await CalcAndSave(args[0], args[1], args[2], args[3], args[4], args[5]);
                console.log("terminou calculate and save");
                break;
            case "write(y + z)":
                FadeLoading();
                end = await CalcAndWrite(args[0], args[1], args[2], args[3]);
                console.log("terminou calculate and write");
                break;
            default:
                console.log("Instrução Inválida: " + string.toLowerCase());
        }
    }
    ResetLoading();
    animationStatus = false;

}

async function Begin(instructionName, nextInstructionName, programName) {
    SetInstructionNames(instructionName, nextInstructionName);
    return promise = new Promise(function (resolve, reject) {
        Loading(programName);
        setTimeout(function () {
            resolve('done!');
        }, 40 * 200);
    });
}

async function IfThenElse(instructionName, nextInstructionName, expression, result, variables) {
    SetInstructionNames(instructionName, nextInstructionName);
    end = await GetInstruction(instructionName, nextInstructionName);
    for (var a = 0; a < variables.length; a = a + 3) {
        if (a == 0) {
            end = await AskPackage(variables[a], variables[a + 1]);
        }
        else {
            end = await AskPackageShort(variables[a], variables[a + 1]);
        }
        end = await GetPackage(variables[a], variables[a + 1], variables[a + 2]);
        end = await PutPackageRegister(variables[a], variables[a + 1], variables[a + 2]);
    }
    console.log("end get variables");
    for (var a = 0; a < 4; a++) {
        if (register[a] != 0) {
            end = await GetPackageRegister(a + 1);
        }
    }
    end = await CheckIf(expression, result);

    return "done!";
}

async function Declare(instructionName, nextInstructionName, variable) {
    SetInstructionNames(instructionName, nextInstructionName);
    end = await GetInstruction(instructionName, nextInstructionName);
    end = await GetDeclare(variable[0], variable[1]);
    end = await SetPackage(variable[0], variable[1], "");

    return "done!";
}

async function Read(instructionName, nextInstructionName, variable) {
    SetInstructionNames(instructionName, nextInstructionName);
    end = await GetInstruction(instructionName, nextInstructionName);
    end = await AskPackage(variable[0], variable[1]);
    end = await GetPackage(variable[0], variable[1]);
    end = await MemoryToOutput(variable[0], variable[1]);
    end = await Input(variable[0], variable[1]);
    end = await InputToMemory(variable[0], variable[1], variable[2]);
    end = await SetPackage(variable[0], variable[1], variable[2]);

    return "done!";
}

async function Write(instructionName, nextInstructionName, variable) {
    SetInstructionNames(instructionName, nextInstructionName);
    end = await GetInstruction(instructionName, nextInstructionName);
    end = await AskPackage(variable[0], variable[1]);
    end = await GetPackage(variable[0], variable[1], variable[2]);
    end = await MemoryToOutput(variable[0], variable[1], variable[2]);
    end = await Output(variable[0], variable[1], variable[2]);

    return "done!";
}

async function CalcAndSave(instructionName, nextInstructionName, expression, result, variables) {
    SetInstructionNames(instructionName, nextInstructionName);
    end = await GetInstruction(instructionName, nextInstructionName);
    for (var a = 0; a < variables.length; a = a + 3) {
        if (a == 0) {
            end = await AskPackage(variables[a], variables[a + 1]);
        }
        else {
            end = await AskPackageShort(variables[a], variables[a + 1]);
        }
        end = await GetPackage(variables[a], variables[a + 1], variables[a + 2]);
        end = await PutPackageRegister(variables[a], variables[a + 1], variables[a + 2]);
    }
    for (var a = 0; a < 4; a++) {
        if (register[a] != 0) {
            end = await GetPackageRegister(a + 1);
        }
    }
    end = await Calculate(expression, result);
    end = await RegisterToMemory(variables[0], variables[1], result);
    end = await SetPackage(variables[0], variables[1], result);

    return "done!";
}

async function CalcAndWrite(instructionName, nextInstructionName, expression, variables) {
    var finalValue = "";
    SetInstructionNames(instructionName, nextInstructionName);
    end = await GetInstruction(instructionName, nextInstructionName);
    for (var a = 0; a < variables.length; a = a + 3) {

        if (a == 0) {
            end = await AskPackage(variables[a], variables[a + 1]);
        }
        else {
            end = await AskPackageShort(variables[a], variables[a + 1]);
        }
        end = await GetPackage(variables[a], variables[a + 1], variables[a + 2]);
        end = await PutPackageRegister(variables[a], variables[a + 1], variables[a + 2]);
        finalValue += variables[a + 2];
    }
    for (var a = 0; a < 4; a++) {
        if (register[a] != 0) {
            end = await GetPackageRegister(a + 1);
        }
    }
    end = await Calculate(instructionName, expression);
    end = await RegisterToOutput(variables[0], variables[1], expression);
    end = await Output(variables[0], variables[1], expression);

    return "done!";
}

