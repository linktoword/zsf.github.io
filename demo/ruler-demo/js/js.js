// 拖动插件
$(function(){ 
    var d = $('.program-content').dad();

    d.addDropzone('.delete-contain', function(e){
		e.remove();
    });
    var target = $('.add-contain');

    d.addDropzone(target, function (e) {
        e.find('span').appendTo(target);
        e.remove();
    });
});