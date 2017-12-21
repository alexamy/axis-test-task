//generate table of random task
//a: [6;9]
//a+b: [11,14]
function generateTask()
{
    var task = {};
    task.a = Math.floor(Math.random()*4 + 6);
    task.sum = Math.floor(Math.random()*4 + 11);
    task.b = task.sum - task.a;
    return task;
};

//returns path to arrow img for 2..9
function getArrowPath(num) {
    var arrowsPathPrefix = "images/arrow_";
    if(num >= 2 && num <= 9)
        return arrowsPathPrefix + num + ".png";
    else
        console.log("error at getArrowPath");
    return "";
}

//reset page after 3 seconds
function resetPage() {
    setTimeout(function() {
        location.reload();
    }, 3000);
}

//animating arrows, then checkInput
function showPart(arrowImg, hintText, inputBox, answer, successFunc) {
    $(arrowImg).toggleClass("hidden");
    $(arrowImg).attr('src', getArrowPath(answer));
    $(arrowImg).width(0);

    var animLength = 1000; //2000 for production
    $(arrowImg).animate({width: arrowsWidth[answer]}, animLength, "swing", function() {
        checkInput(inputBox, answer, hintText, successFunc);
    });
}

//input handling (after arrows animate)
//inputBox - number text input
//answer - number value that want to match (i.e task values)
//hintText - will be coloured yellow on wrong answer
//successFunc - started if input is correct
function checkInput(inputBox, answer, hintText, successFunc) {
    //show if not shown
    $(inputBox).removeClass("hidden");

    //number is changed
    $(inputBox).keyup(function() {
        var entered = $(inputBox).val();
        var maxlen = $(inputBox).attr("maxlength")
        if(entered.length == maxlen)
        {
            //success
            if(entered == answer) {
                if(hintText !== undefined) $(hintText).removeClass("wrongNum");
                $(inputBox).removeClass("wrongInput");
                $(inputBox).attr("readonly", 1);
                if(successFunc !== undefined) successFunc();
                $(inputBox).off("keyup");
            }
            //try again
            else {
                if(hintText !== undefined) $(hintText).addClass("wrongNum");
                $(inputBox).addClass("wrongInput");
            }
        }
    });
    $(inputBox).focus();
}

//links to page elements
var aNumText = "#aNumText";
var bNumText = "#bNumText";
var sumNumText = "#sumNumText";
var arrowImg1 = "#arrowsImg1";
var arrowImg2 = "#arrowsImg2";
var aInput = "#aInputBox";
var bInput = "#bInputBox";
var sumInput = "#sumInputBox";
//array of arrows images widths, starting from 2 to 9
var arrowsWidth = [0,0, 86, 126, 162, 200, 240, 279, 316, 356];

//main function
var task;
$(document).ready(function() {
    //generating task
    task = generateTask();
    $(aNumText).text(task.a);
    $(bNumText).text(task.b);
    $(sumNumText).text("?");

    //set css based on task
    $(aInput).css("marginLeft", arrowsWidth[task.a]/2 - 10);
    $(bInput).css("marginLeft", arrowsWidth[task.a]/2 + arrowsWidth[task.b]/2 - 35);

    //actual task work
    showPart(arrowImg1, aNumText, aInput, task.a, function() {
        showPart(arrowImg2, bNumText, bInput, task.b, function() {
            $(sumNumText).remove();
            checkInput(sumInputBox, task.sum, undefined, resetPage);
        })
    });
});