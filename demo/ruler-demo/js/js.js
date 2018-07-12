
$(function () {
    var data = [
        {
            "programName":"节目1",
            "playTime":30.5
        },
        {
            "programName":"节目2",
            "playTime":31
        },
        {
            "programName":"节目3",
            "playTime":21.5
        },
        {
            "programName":"节目4",
            "playTime":11.5
        },
    ];
    function calProgramWidth( ) {
        // 每秒的宽度
        var rulermmWidth = $(".mm").width();
        // 遍历数据生成节目单 
        $.each(data,function(index,value){
            var itemWidth = value.playTime * rulermmWidth;
            var num = index + 1;
            var items = $(` <div class="item item`+ num +`" style="width:` + itemWidth + `px;">
                                <div class="programName">`+ value.programName  + `</div>
                                <div class="playTime">` + value.playTime + `s</div>  
                            </div>`);

            $(".program-content").append(items[0]);
        });
    }
    calProgramWidth();

    $(window).resize(function () {          //当浏览器大小变化时
        //var rulermmWidth = $(".mm").width();
        //console.log(rulermmWidth);
        $(".program-content").empty();
        calProgramWidth();
        // alert($(window).height());          //浏览器时下窗口可视区域高度
        // alert($(document).height());        //浏览器时下窗口文档的高度
        // alert($(document.body).height());   //浏览器时下窗口文档body的高度
        // alert($(document.body).outerHeight(true)); //浏览器时下窗口文档body的总高度 包括border padding margin
    });
    
})

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

// 标尺放大缩小
$(function () {
    $enlargeBtn = $(".enlarge-btn");
    $decreaseBtn = $(".decrease-btn");
    $rulerContain = $(".ruler-contain");
    // 基础缩放倍数
    let baseScaleNum = 1;
    // 放大函数
    $enlargeBtn.click(function(){
        baseScaleNum+= 0.1;
        let scale = `scale(` + baseScaleNum + `)`;
        $rulerContain.css("transform", scale);   
      });
    // 缩小函数
      $decreaseBtn.click(function(){
        baseScaleNum-= 0.1;
        let scale = `scale(` + baseScaleNum + `)`;
        $rulerContain.css("transform", scale);   
      });
})