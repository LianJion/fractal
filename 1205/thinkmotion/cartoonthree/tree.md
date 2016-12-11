#### 尼玛，这个锅我自己背！ 

    var water = $("#icon");
     var waterpath = $("#icon g");
      waterpath.velocity({translateY: "+=142px" }, {duraiton: "3000", easing: "spring", delay: "6000"});
      water.velocity({opacity: 0},{duraiton: "3000", easing:"spring", delay: "9000", 
        complete:function(){ paused = false ; }
      });
      //complete:是和duration，delay穿一条开裆裤的啊！

#### 凡是velocity设置的属性变化后，js获取不了啊
    class style="opacity:0"
