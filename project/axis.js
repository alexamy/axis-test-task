function generateTask()
{
    var task = {};
    task.a = Math.floor(Math.random()*4 + 6);
    task.sum = Math.floor(Math.random()*4 + 11);
    task.b = task.sum - task.a;
    return task;
};

$(document).ready(function() {
    var task = generateTask();
    console.log(task);
    $("#aNum").text(task.a);
    $("#bNum").text(task.b);
    $("#sumNum").text("?");
});