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

function resetPage() {
    setTimeout(function() {
        location.reload();
    }, 3000);
}

function checkInput(inputName, answer, hintText, successFunc) {
        //show if not shown
        $(inputName).removeClass("hidden");
        $(inputName).removeClass("nonExists");

        //number is changed
        $(inputName).keyup(function() {
            var entered = $(inputName).val();
            var maxlen = $(inputName).attr("maxlength")
            if(entered.length == maxlen)
            {
                //success
                if(entered == answer) {
                    if(hintText !== undefined) $(hintText).removeClass("wrongNum");
                    $(inputName).removeClass("wrongInput");
                    $(inputName).attr("readonly", 1);
                    if(successFunc !== undefined) successFunc();
                    $(inputName).off("keyup");
                }
                //try again
                else {
                    if(hintText !== undefined) $(hintText).addClass("wrongNum");
                    $(inputName).addClass("wrongInput");
                }
            }
        });
        $(inputName).focus();
}

function showPart(arrowImg, hintText, inputBox, answer, successFunc) {
    $(arrowImg).toggleClass("hidden");
    $(arrowImg).attr('src', getArrowPath(answer));
    $(arrowImg).width(0);

    var animLength = 1000; //2000 for production
    $(arrowImg).animate({width: arrowsWidth[answer]}, animLength, "swing", function() {
        checkInput(inputBox, answer, hintText, successFunc);
    });
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
            $(sumNum).toggleClass("nonExists");
            checkInput(sumNumInput, task.sum, undefined, resetPage);
        })
    });
});