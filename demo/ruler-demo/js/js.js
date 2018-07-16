
$(function () {
    var data = [
        {
            "programName":"节目1",
            "playTime":300.5
        },
        {
            "programName":"节目2",
            "playTime":310
        },
        {
            "programName":"节目3",
            "playTime":210.5
        },
        {
            "programName":"节目4",
            "playTime":110.5
        },
    ];

    // 根据标尺每厘米宽度计算每个节目的宽度
    function calProgramWidth() {
        let everyCmSeconds = $(".two-cm").attr("data-content");
        // 标尺每秒的宽度
        let rulermmWidth = $(".cm").width();

        // 每秒代表的宽度
        let everySecondWidth = rulermmWidth / everyCmSeconds;

        // let calProgramsAllTime = 0;

        // 遍历数据生成节目单 
        $.each(data,function(index,value){
            var itemWidth = value.playTime * everySecondWidth;
            var num = index + 1;
            var items = $(` <div class="item item`+ num +`" style="width:` + itemWidth + `px;">
                                <div class="programName">`+ value.programName  + `</div>
                                <div class="playTime">` + value.playTime + `s</div>  
                            </div>`);

            $(".program-content").append(items[0]);
            // calProgramsAllTime+= value.playTime;
        });
        
    }
    // 注册拖动属性 拖动插件
    function dragPlugin() {
        let d = $('.program-content').dad();

        d.addDropzone('.delete-contain', function(e){
            e.remove();
            // 删除后隐藏删除区域
            $(".delete-contain").css("visibility", "hidden");
            // 计算删除后的总时间
            let deleteTime = parseFloat(e.find(".playTime").text());
            let deleteAfterTime = parseFloat($(".allProgramesTime span").text()) - deleteTime;
            $(".allProgramesTime span").text(deleteAfterTime);
        });
    }

    // 计算节目列表总时间
    // 计算函数 依据获取节目列表各个项数的显示播放时间 相加
    function calProgramsAllTime() {
        let AllTime = $(".program-content .playTime");
        var ProgramsAllTime = 0; //存储总时间
        $.each(AllTime,function(index,value){
            let everyItemTime = parseFloat($(this).text());
            ProgramsAllTime+= everyItemTime;
        })
        $(".allProgramesTime span").text(ProgramsAllTime);
    }

    calProgramWidth();  // 计算生成节目列表
    dragPlugin();       // 节目列表注册拖动
    calProgramsAllTime();
    
    var $topCm = $(".ruler-contain .cm:lt(11)"); 
    var $botCm = $(".ruler-contain .cm:gt(10)");
    var $enlargeBtn = $(".enlarge-btn");
    var $decreaseBtn = $(".decrease-btn");
    
    var baseScaleNum = 100; // 基础缩放倍数
    var count = 1; //放大缩小点击计数

    // 放大函数
    $enlargeBtn.click(function(){
        count+=1;
        $topCm.each(function (index,value) {
            let Num = index * baseScaleNum * count;
            $(value).attr("data-content", Num); 
        })
        $botCm.each(function (index, value) {
            let Num = index * baseScaleNum * count;
            $(value).attr("data-content", Num);
        })
        
        $(".program-content").empty(); // 将节目单清空 计算宽度渲染新节目单 注册拖动
        calProgramWidth();
        dragPlugin();
    });

    // 缩小函数
    $decreaseBtn.click(function(){
        if(count > 1) {
            count-=1;
            $topCm.each(function (index, value) {
                let Num = index * baseScaleNum * count;
                $(value).attr("data-content", Num);
            })
            $botCm.each(function (index, value) {
                let Num = index * baseScaleNum * count;
                $(value).attr("data-content", Num);
            })
            $(".program-content").empty(); // 将节目单清空 计算宽度渲染新节目单 注册拖动
            calProgramWidth();
            dragPlugin();
        }else{
            alert("已经缩放到最小！");
        }
        
    });

    // 当浏览器大小变化时
    $(window).resize(function () {                 
        $(".program-content").empty(); // 将节目单清空 计算宽度渲染新节目单 注册拖动 
        calProgramWidth();
        dragPlugin();
    });
    
})

