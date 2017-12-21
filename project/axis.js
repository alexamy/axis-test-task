var aNum = "#aNum";
var bNum = "#bNum";
var sumNum = "#sumNum";
var arrowImg1 = "#arrowsImg1";
var arrowImg2 = "#arrowsImg2";
var arrowsPathPrefix = "images/arrow_";
var arrowsWidth = [0,0, 86, 126, 162, 200, 240, 279, 316, 356];

var aInput = "#aNumInput";
var bInput = "#bNumInput";
var sumInput = "#sumNumInput";

function generateTask()
{
    var task = {};
    task.a = Math.floor(Math.random()*4 + 6);
    task.sum = Math.floor(Math.random()*4 + 11);
    task.b = task.sum - task.a;
    return task;
};

function getArrowPath(num) {
    if(num >= 2 && num <= 9)
        return arrowsPathPrefix + num + ".png";
    else
        console.log("error at getArrowPath");
    return "";
}

function checkInput(inputName, answer, numberText) {
        //number input
        //$(inputName).toggleClass("hidden");
        $(inputName).keyup(function() {
            //number is changed
            var entered = $(inputName).val();
            var maxlen = $(inputName).attr("maxlength")
            if(entered.length == maxlen)
            {
                //success
                if(entered == answer) {
                    if(numberText !== undefined) $(numberText).removeClass("wrongNum");
                    $(inputName).removeClass("wrongInput");
                    $(inputName).attr("readonly", 1);
                    $(inputName).off("keyup");
                }
                //try again
                else {
                    if(numberText !== undefined) $(numberText).addClass("wrongNum");
                    $(inputName).addClass("wrongInput");
                }
            }
        })
}

function showPart(arrowImg, numberText, input, taskNum, successFunc) {
    $(arrowImg).toggleClass("hidden");
    $(arrowImg).attr('src', getArrowPath(taskNum));
    $(arrowImg).width(0);

    var animLength = 0; //2000 for production
    $(arrowImg).animate({width: arrowsWidth[taskNum]}, animLength, "swing", function() {
        //number input
        $(input).toggleClass("hidden");
        $(input).keyup(function() {
            //number is changed
            var entered = $(input).val();
            var maxlen = $(input).attr("maxlength")
            if(entered.length == maxlen)
            {
                //success
                if(entered == taskNum) {
                    $(numberText).removeClass("wrongNum");
                    $(input).removeClass("wrongInput");
                    $(input).attr("readonly", 1);
                    successFunc();
                    $(input).off("change");
                }
                //try again
                else {
                    $(numberText).addClass("wrongNum");
                    $(input).addClass("wrongInput");
                }
            }
        })
    });
}

function showAnswerInput() {
    $(sumNum).toggleClass("nonExists");
    $(sumNumInput).toggleClass("nonExists");
    checkInput(sumNumInput, task.sum);
}

var task;
$(document).ready(function() {
    //generating task
    task = generateTask();
    $(aNum).text(task.a);
    $(bNum).text(task.b);
    $(sumNum).text("?");

    //set css (offsets, etc) based on task
    $(aInput).css("marginLeft", arrowsWidth[task.a]/2 - 10);
    $(bInput).css("marginLeft", arrowsWidth[task.a]/2 + arrowsWidth[task.b]/2 - 35);

    //actual task work
    showPart(arrowImg1, aNum, aInput, task.a, function() {
        showPart(arrowImg2, bNum, bInput, task.b, function() {
            showAnswerInput();
        })
    });
});