$(document).ready(function () {
    $(".button").click(function () {
        $(".line").toggleClass("AddLine");
        $(".text").toggleClass("addColor"); 
    });
    $(".button").mousedown(function () {
        $(".button").addClass("AddButton");
    });
    $(".button").mouseup(function () {
        $(".button").removeClass("AddButton");  
    });   
});