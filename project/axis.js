var aNum = "#aNum";
var bNum = "#bNum";
var sumNum = "#sumNum";
var arrowImg1 = "#arrowsImg1";
var arrowImg2 = "#arrowsImg2";
var arrowsPathPrefix = "images/arrow_";
var arrowsWidth = [0,0, 86, 126, 162, 200, 240, 279, 316, 356];

var aInput = "#aNumInput";
var bInput = "#bNumInput";

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

function showArrow(id, num) {
    $(id).toggleClass("hidden");
    $(id).attr('src', getArrowPath(num));
    $(id).width(0);
}

var task;
$(document).ready(function() {
    //generating task
    task = generateTask();
    $(aNum).text(task.a);
    $(bNum).text(task.b);
    $(sumNum).text("?");

    showArrow(arrowImg1, task.a);

    var animLength = 0 //2000 for production
    $(arrowImg1).animate({width: arrowsWidth[task.a]}, animLength, "swing", function() {
        //a number input
        $(aInput).toggleClass("hidden");
        $(aInput).css("marginLeft", arrowsWidth[task.a]/2 - 10);
        $(aInput).keyup(function() {
            //a number is changed
            var entered = $(aInput).val();
            if(entered.length == 1)
            {
                if(entered == task.a) {
                    $(aNum).removeClass("wrongNum");
                    $(aInput).removeClass("wrongInput");
                    $(aInput).attr("readonly", 1);
                    secondPart();
                    $(aInput).off("change");
                }
                else {
                    $(aNum).addClass("wrongNum");
                    $(aInput).addClass("wrongInput");
                }
            }
        })
    });
});

function secondPart()
{
    showArrow(arrowImg2, task.b);
}