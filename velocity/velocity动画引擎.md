##velocity动画库：旨在提升UI动画

##在线引用jquery和velocity:
<script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="http://cdn.jsdelivr.net/velocity/1.1.0/velocity.min.js"></script>

*1* js中提供的属性值包含字母，那么就要用半角引号括起来。
    
        $div.velocity({ width:"500px",opacity:0});
        //该例子中的width:"500px" px

*2.1* 可以指定动画选项的对象作为第二个参数传入
    
     $div.velocity({ width:"500px",opacity:0 }, { duration:400, easing:"swing"});
     //这里的duration和easing参数都是动画选项的参数

*2.2*  参数简写：逗号分隔参数，针对只有基本选项（持续时间duration,缓动easing, 完成）
    
    $div.velocity({ top:50 }, 1000, "ease-in-out", function() { alert("complete") });
    //针对指定基本选项（持续时间duration,缓动easing, 完成）

*2.3* 如果要设置delay:500,那么只能采用2.1的对象语法
    
    $div.velocity({ top:50 }, { duration:400, easing:"swing", delay:500 });


*3* js属性动画和css属性动画的区别
    
* velocity针对每个css属性，只接受唯一一个数值。

######例子 
        
        $div.velocity({ paddingTop:50, paddingRight；10，paddingBottom: 10, paddingLeft:10 });  //velocity
        
        padding：100 10 10 100 ;//css


* js属性名和css属性名不同

######例子 
    
         $div.velocity({ paddingTop:50 });  //velocity
         padding-top: 50;                   //css

*4*  单位：大多数默认值是px，旋转的角度用的默认值是deg

*5* velocity有四个运算符：+，-，*，/、，可以结合=一起类似于js正常使用

        $div.velocity({
            top: "50px",
            left: "-50px",
            width: "+=5rem",
            height: "-=5rem",
            paddingLeft: "*=2",
            paddingRight: "/=2"
        });

*6* 链式操作：当一个元素链式调用多个velocity函数的时候，它们会自动排队。前赴后继

        $div.velocity({ width: "100px" }).velocity({ top:"50px"})



## velocity选项： duration，easing,complete,loop,delay,display

####duration：持续时间 

*1* "slow" //大致是600ms; "normal" //400ms; "fast" //200ms

    $div.velocity({ width: "100px" }, { duration: "slow" });
    //可以更好的控制整个网站的动画统一节奏

*2* （ms）当毫秒为单位时，不用写单位

     $div.velocity({ width: "100px" }, { duration: 1000 });


####easing:缓动 更好的用户体验：有机运动

*1* jquery UI的三角函数缓动,sin ,cos,tan
*2* css缓动： ease-in 、ease-out 、ease-in-out 、 ease(ease-in-out 更缓动的版本)
*3* css b贝塞尔曲线
*4* 弹簧物理 [张力（500），摩擦力（20）]

     $div.velocity({ width: "100px" }, [250,15] );
     //张力越大，整体的速度和弹动幅度越大，摩擦力越小，弹簧结尾处的震动速度就越快。

*5* "spring" 缓动就是一种随手可用的弹簧物理缓动的预设
    
      $div.velocity({ width: "100px" }, { "spring" );

      //对象语法传入
        $div.velocity({ width: "100px" }, { easing:"spring" });
      //动态感十足啊

*6* begin & complete:指定动画中的特定时间触发函数(通常称为回调函数)
    
* begin:函数在动画开始前执行
* complete:函数在动画完成前执行

######eg:
    $div.velocity(
      { top:50 }, 
      { duration:400, easing:"spring", delay:500 , 
        begin: function () {
          alert("hello!");
        },
        complete: function () {
          alert("over!");
        }
    });


*7* loop（循环）

    #div{
        top:500
    }

     $div.velocity( { top:50 }, { loop:2 } );
     // 整数值：动画在调用的属性映射中的值与调用之前的元素的值之间的交替次数
     //该例子中，top交替了两次。begin和complete还是触发一次。开头和结尾

###### 无限循环： 
     $div.velocity( { top:50 }, { loop:true } );

###### 停止循环：     
    $div.velocity("stop");

###### 例子：opacity跳动效果
    $div.velocity( { opacity: 0 }, { loop:true } );
    $div.velocity({ top: "50px", opacity:0 }, { duration:400, easing:"swing", loop:2 });
    $div.velocity("stop").velocity({ opacity:0 });

*8* delay延迟

    $div.velocity( { opacity: 0 }, { delay:100 } );
    //delay和loop相结合：循环间的一个停顿
    $div.velocity( { opacity: 0 }, { loop:true , delay: 1000} );

*9* display 显示 vs visibility 可见性 

* velocity中display：none,inline,inline-block,block,flex等之外还有 auto（属性值与元素的默认值一样）
* css中display：none,inline,inline-block,block,flex等

* visibility: hidden , visible , collapse

###### visibility: collapse;当在表格元
素中使用时，此值可删除一行或一列，但是它不会影响表格的布局。被行或列占据的空间会留给其他内容使用。如果此值被用在其他的元素上，会呈现为 "hidden"
    $div.velocity( { opacity: 0 }, { display: "none" });
    //淡出，将该元素移除文档流
    $div.velocity( { opacity: 1 }, { display: "block" });
    //淡入

    //简写切换透明度
    //淡入
    $div.velocity( "fadeIn", { duration:400});
    //淡出，将该元素移除文档流
    $div.velocity( "fadeOut", { duration:400 });


####12月4日  笔记

###### 1 reverse：反转，让元素变回上次调用velocity的值
    //针对之前调用的选项进行反转
      $div.velocity("reverse");

    //如果要具体哪一项的话, 指定，并用2000替换了之前的值 duration:ms
    $div.velocity("reverse", {duration: 2000});

###### 注意：一旦用了reverse，那么之前调用的begin和complete就会被忽略。reverse 不会重新调用回调函数。

###### 2 scrolling：滚动，让浏览器滚动到一个元素的上缘位置。
    //注意了，参数是scroll
    $div.velocity("scroll", {duration：2000, esaing: "spring"}).velocity({opacity:1});

    //针对的是自带滚动条的父元素

      #container {
        position: absolute;
        background-color: #eee;
        height: 200px;
        width: 1200px;
        overflow: auto; //带有滚动条
      }


      $div.velocity("scroll", { container: $("#container"),duration: 1800, 
    delay: 500, });  

    $div.velocity( "scroll", {axis:"x"});
    //横向上滚动，但是我自己没有实现这个功能

    //偏移，滚动的时候偏移，单位px。正数往上，负数往下
    $div.velocity( "scroll", {duration：2000, offset:"50px"});


    $div.velocity( "scroll", { axis:"x" , container: $("#container"), duration:2000, offset:"100px"});
    //实现了x的偏移功能


        #test {
          background-color: red;
          position: absolute;
          top:800px;
          opacity: 1;
          width: 600px;
        }

        #container {
          position: absolute;
          background-color: #eee;
          height: 200px;
          width: 500px;
          overflow: auto;
         /* overflow:scroll;
          overflow-y: hidden;*/
        }


#### 12月5日

*1* color：颜色 velocity  只接受 十六进制的字符串

      #000000

      $div.velocity({
        //背景的颜色和透明度
        backgroundColor: "#000000",
        backgroundColorAlpha : 0.5,
        // backgroundColorAlpha ： 0~1之间
        //文字的颜色
        colorRed: 125
        // r,g,b三色分量的值的范围控制在0~255之间。 125说明文字的红色分量变动占据了总值的一半左右
      });
  
*2* transform: translateX,translateY, translateZ, rotateX, rotateY, rotateZ, scaleX, scaleY

    //我觉得还是有translateZ的，css属性值里面也是有的

      $div.velocity({
        translateZ："200px",
        rotateZ: "45deg"
        })


*3* 中级了之后不进行对jquery的使用，直接用js的document来选择。
    
    document.getElementById()
    document.getElementsByTagName()
    document.getElementsByClassName()
    document.queryselectorAll(); //返回的是NodeList dom选择器

    document.getElementById("test");

    //等同于下句
    document.querySelector("#test");
    //等同于下句
    document.querySelectorAll("#test")[0];

    document.querySelector("div.test>p:first-child");

    //querySelector 用来获取一个元素

    document.querySelectorAll("div.test>p:first-child")[0]; 
    //多用于遍历


      var emphasisText = document.querySelectorAll(".emphasis");
      
      for( var i = 0 , j = emphasisText.length ; i < j ; i++ ){
          emphasisText[i].style.fontWeight = "bold";
      }


  //不用jquery
    var divs = document.querySelectorAll('div');
    Velocity(divs, {opacity:0.5} , 1000);
    Velocity(divs, {opacity:1} , 1000); 
    //而且同一元素上的动画绘制会自动链接在一起执行