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


######不用jquery ，重点啊，后面碰壁了啊！！！
    var divs = document.querySelectorAll('div');
    Velocity(divs, {opacity:0.5} , 1000);
    Velocity(divs, {opacity:1} , 1000); 
    //而且同一元素上的动画绘制会自动链接在一起执行


#### 先进入学习状态，然后再做任务！ 1206

###### 动效设计：实用和优雅  强化了UI的意图

*1* 行内状态指示

* eg 加载动态消息里面的文字内容时，先让一段虚拟文字时而模糊时而清晰地反复运动，直至真正的文字显示。
* 尽可能多地显示界面内容，把等待加载的特定区域屏蔽起来。
* 用户参与的内容越多，就越不容易感到厌倦。

*2* 提示用户的做法：重复地上下移动，跳动显示。

* 靠近自己的运动可以理解为马上行动的紧急体式，远离自己的运动与自己无关，不必采用行动。

*3* 点击按钮越吸引人，点击欲望越大。

*4* 根据互动行为的重要程度来区分动效设计。 比如说，删除按钮提示比悬浮按钮提示要复杂的多。

*5* 减少同时发生的动画。不要一次强调太多不同的东西。

*6* 减少动画的种类，强化行为的一致性。便于用户理解。

*7* 镜像动画。动画属性和选项组合的一致性。

* 一个窗口的显示效果和它的隐藏效果的一致性。
* 比如说账户设置窗口，那么窗口的显示和隐藏位置是一致的。
* 如果是发送邮件，那么窗口的隐藏可以与显示不一致，表示发送邮件到了别的地方（收件人）。


*8* 限制持续时间 duration 过长会造成用户的不必要的等待。

*9* 限制动画：对理解页面没有帮助的动画可以用样式的瞬间变化来替代。

*10* 页面加载动画是一个发挥动效设计技巧的极佳平台

*11* 过渡动画可以采用缩小元素显示或者向上滑动，划出视图，改变背景颜色等等方式。不要单一地选择透明度的改变来显示。

*12* 拆分动画成多步

* 处于运动中的物体的各个属性并不是同步加速的。避免线性动画。
* 采用多样性和反差。
* 拆分动画然后进行组合，创作出愉悦的色彩和触感组合。

*13* 错开动画 

* 多个兄弟元素的显示，可以为之依次添加延时。画面感：大雁依次飞扬。

*14* 从触发元素处产生动画。

* 点击按钮，显示模态框。 比较好的方式：窗口从按钮为之以动画的形式显示。
* 参考物理原理，，拉杠杆的时候，机械零件导致与之相连的物体开始运动。

*15* 使用图形(svg)

* svg动画变形，结合预览效果和从触发元素处产生动画使用。利用图形变换来表示UI行为以及为用户提供的反馈。
* 鼠标悬停在加载器的圆点上，圆点会重新排列形成一个X的形状，提示用户点击这个图形就会取消加载。

*16* 预览效果

* 某个元素目的性不明确，可以提供交互结果的预览效果。
* 显示图形设计寓意 eg: 文件传输按钮，鼠标悬浮时发出无线电波脉冲的视觉效果。
* 显示用户采取行动之后发送的部分动画效果。eg：鼠标悬停时显示部分运行传输进行的动画，离开后反转刚刚的部分动画。


###### UI，UE, UX [介绍链接](http://www.fastcodesign.com/3032719/ui-ux-who-does-what-a-designers-guide-to-the-tech-industry)

*1* UE,UX: User Experience 用户体验  how the product feels

*2* UED： User Experience Design 用户体验设计

*3* UI: how the product is laid out. 


#### 12月7日笔记 第4章 动画工作流

*1* 结构化动画代码

* 利用动画引擎的工作流特性使代码更简单明了；
* 使用代码组织最佳实践（我觉得这位翻译大师水平不咋地啊）
* 避免深层嵌套js回调函数
* 拒绝css动画污染开发样式表

*2* 什么时候的UI动画用css比较明智？

###### 用户鼠标悬停在元素上时触发的简单样式变化:css   transition属性

    transition-property
    transition-duration
    transition-timing-function
    transition-delay

    transition: property duration timing-function delay;
    transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|
    cubicbezier(n,n,n,n);

    div
    {
      width:100px;
      height:100px;
      background:blue;
      transition:width 2s;
      -moz-transition:width 2s; /* Firefox 4 */
      -webkit-transition:width 2s; /* Safari and Chrome */
      -o-transition:width 2s; /* Opera */
    }

    div:hover
    {
      width:300px;
    }

*3* 好代码的特性：表意性，简洁的，易于维护的。

*4* 常用js实现比较好的交互效果：多元素和多步骤的动画序列，交互拖拽动画等

*5* 代码技巧： 样式与逻辑分离

    //style.js   
    var fadeIn = {
      //p: properties
      p: {
        opacity: 1,
        top: "50px"
      },
      //o: options
      o: {
        duration: 1000,
        easing: "ease-out"
      }
    };

    var $test = $(".test");
    $test.velocity(fadeIn.p, fadeIn.o);

###### style.js文件的好处

* 定义动画选项
* 定义动画属性
*  $test.velocity(fadeIn.p, fadeIn.o);  //第一个参数是属性，第二个参数是选项。
*  动画对象要有对应其含义的名字

#### 针对不同的按钮，模态框这些可以设置不同的选项

###### 不同选项不同的设置

    var fadeIn = {
      p: {
        opacity: 1,
        top: "50px"
      },
      oFast: {
        duration: 1000,
        easing: "ease-out"
      },
      oSlow: {
        duration: 3000,
        easing: "ease-out"
      }
    };

    var $test = $(".test");
    $test.velocity(fadeIn.p, fadeIn.oFast);

    var $test2 = $(".test2");
    $test2.velocity(fadeIn.p, fadeIn.oSlow);

###### 将fast和slow作为子对象嵌套在一个单独的o选项对象里面

    var fadeIn = {
      p: {
        opacity: 1,
        top: "50px"
      },
      o: {
        fast: {
          duration: 1000,
          easing: "ease-out"
        },
        slow: {
          duration: 3000,
          easing: "ease-out"
        }
      }
    };

    var $test = $(".test");
    $test.velocity(fadeIn.p, fadeIn.o.fast);

    var $test2 = $(".test2");
    $test2.velocity(fadeIn.p, fadeIn.o.slow);


*6*  组织排序动画： UI pack小插件 功能：顺序运行

* velocity接受多参数语法
* velocity的效用函数(utility function):使用基本的velocity对象设置元素的动画。

*6.1* 我们现在一般是这样用velocity
      
      $div.velocity({ top: "50px" }, { duration:400, easing:"swing"});
      //前面还是要，链接一个jquery元素对象($div)

*6.2* 脱离基本velocity对象的动画的代码写法

      $.Velocity({e: $div, p: {opacity: 1, scale: 1}, o: {duration: 1000, easing: "linear"} });
      //把目标元素作为第一个参数传入

*6.3* Velocity调用构成的一个数组，每个调用都是单个对象。然后将数组传入到一个特殊的Velocity函数中，即RunSequence(),连续触发调用序列。

      var loadingSequence = [
           {e: $div1, p: {translateX: 100, opacity: 1}, o: {duration: 1000}},
           {e: $div2, p: {translateX: 200, opacity: 1}, o: {duration: 1000}},
           {e: $div3, p: {translateX: 300, opacity: 1}, o: {duration: 1000}}
      ];

      $.Velocity.RunSequence(loadingSequence);


###### error:velocity.min.js:4 Uncaught (in promise) Error: Velocity: First argument (undefined) was not a property map, a known action, or a registered redirect. Aborting.(…)

[解决方式](https://github.com/julianshapiro/velocity/issues/569)

###### 自己的解决方式： 替换文件，引入文件不是min版本
    <script src="velocity.js"></script>
    <script src= "velocity.ui.js"></script>


    var test1 = document.getElementById('test');
  
    var test2 = document.getElementById('test2');
    
    var test3 = document.getElementById('test3');

    $.Velocity.RunSequence([
      {e: test1, p: {translateX: 100, top: "50px", opacity: 1}, o: fadeIn.o.slow },
      {e: test2, p: {translateX: 200, top: "50px", opacity: 1}, o: fadeIn.o.fast },
      {e: test3, p: {translateX: 300, top: "50px", opacity: 1}, o: fadeIn.o.slow }
    ]);

*6.4* 优点

* 结构直观明了，属性选项的不同之处也可以一眼看出。
* 易读性，易维护性
* 并非顺序性：设置为 sequenceQueue:false 时，该选项会与前一项并发执行。用于多个元素同时以动画的形式进入视图。

###### 并发

    $.Velocity.RunSequence([
      {e: test1, p: {translateX: 100, top: "50px", opacity: 1}, o: {duration: 1000} },
      {e: test2, p: {translateX: 200, top: "50px", opacity: 1}, o: {duration: 1000, sequenceQueue: false } },
      {e: test3, p: {translateX: 300, top: "50px", opacity: 1}, o: {duration: 1000} }
    ]);

    //test1和test2同时执行，test3在test2执行后执行。

