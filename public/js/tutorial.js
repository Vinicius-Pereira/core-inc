$(function () {
    document.getElementById("help").addEventListener("click", function () {displayOption();});
    if(isNewUser())
    {
        displayOption();
    }
});

function isNewUser()
{
    cookie = document.cookie.split(";");
    if(cookie != '')
    {
        cookie = cookie.find(cookie =>cookie.startsWith("oldUser")).split("=")[1];
        if(cookie)
        {
            return false;
        }
    }

    return true;
}

function displayOption()
{
    document.cookie = "oldUser=true";
    document.getElementById("tutorial-option").style.display = "block";
    document.getElementById("tutorial-bg").style.display = "block";
    document.getElementById("yes").addEventListener("click", function () {nextTutorial(0);});
    document.getElementById("no").addEventListener("click", function () {exitTutorial();});
}

function nextTutorial(step) 
{  
    if(step > 0)
    {
        document.getElementById("step-"+(step-1)).style.display = "none";
        if(step > 9)
        {
            document.getElementById("tutorial-bg").style.display = "none";
            return;
        }
    }
    else
    {
        document.getElementById("tutorial-option").style.display = "none";
    }
    document.getElementById("step-"+step).style.display = "block";
    button = document.getElementsByClassName("yes-forward")[step];
    button.addEventListener("click", function () {nextTutorial(step+1);});    
}

function exitTutorial()
{
    document.getElementById("tutorial-option").style.display = "none";
    document.getElementById("tutorial-bg").style.display = "none";
}