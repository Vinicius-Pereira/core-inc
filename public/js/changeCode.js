var codePosition = 0;
const codeExamples = [
`program Bhaskara;
var b, c, raizdiscriminante: real;
begin
  read (b);
  read (c);
  raizdiscriminante := sqrt(b*b - 4*c);
  write ((b - raizdiscriminante )/2);
  write ((b + raizdiscriminante )/2);
end.`,
`program entrada_saida;
var a: integer;
begin
  read(a);
  write(a);
end.`,
`program incrementa1;
var i: integer;
begin
  i:= 0;
  write(i) ;
  i:= i + 1;
  write(i) ;
end.`,
`program soma2numeros;
var a, b: integer;
begin
  read(a);
  read(b);
  write(a+b);
end.`,
`program imprime_se_positivo;
var a: integer;
begin
  read(a);
  if a > 0 then
    writeln(a);
end.`,
`program Hello;
begin
	writeln('Bem vindo a Core Inc.!!!');
end.`];

const inputExamples = [[8, 9], [42], [], [10, 32], [-1], []]

$(function()
{
    var changeButton = document.getElementById("change-code");

    changeButton.addEventListener("click", function()
    {
        changeCode();
    });

});

function changeCode()
{
    var divScript = document.getElementById("script-area");
    var divInput = document.getElementById("input-area");
    var formatInput = "";
    divScript.querySelector(".CodeMirror")
        .CodeMirror.setValue(codeExamples[codePosition]);
    inputExamples[codePosition++].forEach(function(input){
        formatInput+= input + "\n";
    });
    divInput.querySelector(".CodeMirror")
        .CodeMirror.setValue(formatInput);

    if(codePosition >= codeExamples.length)
    {
        codePosition = 0;
    }

}