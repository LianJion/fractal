#### 4.4 代码技巧：打包效果

###### 实现效果：淡入淡出动画。
    $div.velocity({opacity: 1, scale: 1}, {duration: 500, easing: "ease-in-out "}).velocity({borderWidth: "1rem"}, { delay: 200, easing: "spring", duration: 400})

* 同一个元素上执行多个链接在一起的动画。
* 一个页面上，淡入淡出动画，要发生好几次，即多个元素都要运用到这些动画效果，可以写成函数形式。

###### error: test1.velocity is not a function
    var test1 = document.getElementById('test');
    test1.velocity({opacity: 1, scale: 2}, {duration: 500, easing: "ease-in-out "})
    .velocity({borderWidth: "1rem"}, { delay: 200, easing: "spring", duration: 400});

###### 我用getElementById获取的test1不能用于test1.velocity。

###### 改成jquery获取就成功了？
    var test1 = $("#test");

    //x.veloctiy
    test1.velocity({opacity: 1, scale: 2}, {duration: 500, easing: "ease-in-out "})
    .velocity({borderWidth: "1rem"}, { delay: 200, easing: "spring", duration: 400});

###### 回顾昨天的知识点， $.Velocity的调用方式，可以采用js获取id啊

    var test1 = document.getElementById('test');
    var test2 = document.getElementById('test2');
    var test3 = document.getElementById('test3');

    //$.Velocity
    $.Velocity.RunSequence([
      {e: test1, p: {translateX: 100, top: "50px", opacity: 1}, o: {duration: 1000} },
      {e: test2, p: {translateX: 200, top: "50px", opacity: 1}, o: {duration: 1000, sequenceQueue: false } },
      {e: test3, p: {translateX: 300, top: "50px", opacity: 1}, o: {duration: 1000} }
    ]);

###### 先注意两者的区分吧
* $--> test.velocity
* getElementById() ---> $.Velocity

#### 4.4 的干货杂货铺开张： UI pack 注册效果

######一旦注册效果，就可以通过将注册名称用作第一个参数传入Velocity进行调用。
    $div.velocity("growIn");
    //growIn: 一个元素逐渐变大显示出来，果然一个好名字的重要性很大！

###### example
    $div.velocity("scroll").velocity("growIn", { duration: 1000, delay: 200});

    //注册函数方法
    $.Velocity.RegisterEffect(name, {
        defaultDuration: duration,
        calls: [
            [ propertyiesObject, durationPercentage, optionsObject ],
            [ propertyiesObject, durationPercentage, optionsObject ]
        ],
        reset: resetPropertiesObject
    });

* 参数1 name: 效果名称，命名时要根据实际动画意义，在名称后+in/out

> 举个栗子: opacity 0---> 1 , name = opacityIn


* 参数2 对象{ defaultDuration, calls, reset} 定义了效果的行为7用户
    * defaultDuration属性：在触发效果的Velocity调用没有传入duration时，指的是持续时间
    * calls数组：按照发生的先后顺序排列。calls的每一项又是一个数组。
        - 属性对象：propertyiesObject
        - 占用效果总时长的比例（可选项）： 一个十进制值，默认为1.00
        - 选项对象：可选 （calls数组中指定的Velocity调用仅仅接受easign和delay两个选项）
        
* reset对象：效果完成之后立即更改属性值。重置

>  举个栗子: 设置了opacity--> 0 scale-->0的动画，但是想在元素隐藏后将scale-->1,此时就用用到重置对象了。

###### 注册效果的另外一个功能：自动切换display属性
*  当一个元素开始以动画的方式进入视图，display 不为none  (name里面有In)
*  当一个元素开始以动画的方式离开视图，display:none      (name里面有Out)


######干货代码: shadowIn  shadowOut
    $.Velocity.RegisterEffect("shadowIn", {
        defaultDuration: 1000,
        calls: [
            [ {opacity: 1, scale: 1},  0.4 ],
            [ {boxshadowBlur: 50}, 0.6 ]
        ]
    }).RegisterEffect("shadowOut", {
        defaultDuration: 800,
        calls: [
            //反转顺序，以In为镜像
            [ {boxshadowBlur: 50}, 0.2 ],
            [ {opacity: 0, scale: 0},  0.8 ],
        ]
    });

> 自己测试代码怎么老是这么心累啊! 要出这么多bug!!!

###### 1 error: velocity: First argument (growIn) was not a property map, a known action, or a registered redirect. Aborting.
    

    var test1 = $("#test");
    //test1.velocity("scroll").velocity("growIn"); 报错！！！
    $.Velocity.RegisterEffect("growIn", {
        defaultDuration: 1000,
        calls: [
            [ {opacity: 1, scale: 2},  0.8 ],
            [ {borderWidth: "1rem"}, 0.2 ]
        ]
    });

    test1.velocity("scroll").velocity("growIn");
    //这句话要写在注册函数之后，不然就报错。

###### 2 careful $.Velocity.RegisterEffect("growIn", {}); growIn要加引号啊，大兄弟！ 还以为这个又是jquery和js的问题……



###### 这里弱弱地提一句：必须自己先给css设置对应的属性初始样式，才会有动画效果。

        #test {
      opacity: 0;
      position: absolute;
      top: 500px;
      left: 200px;
      height: 50px;
      width: 100px;
      border: 5px solid red;
      /*设置了shadow blur值*/

      -webkit-box-shadow: 2px 2px 0 1px rgba(0, 0, 0, 0.2);
      -moz-box-shadow: 2px 2px 0 1px rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 0 1px rgba(0, 0, 0, 0.2);
    }


    //再设置阴影动画就会有效果
    var test1 = $("#test");

    $.Velocity.RegisterEffect("shadowIn", {
            defaultDuration: 1000,
            calls: [
                [ {opacity: 1, scale: 2},  0.4 ],
                [ {boxshadowBlur: 50}, 0.6 ]
            ]
        }).RegisterEffect("shadowOut", {
            defaultDuration: 800,
            calls: [
                //反转顺序，以In为镜像
                [ {boxshadowBlur: 50}, 0.2 ],
                [ {opacity: 0, scale: 0},  0.8 ],
            ]
        });

    test1.velocity("shadowIn").velocity("shadowOut");


#### 4.5 设计技巧

*4.51* 定时乘数 ：在动画中的所用delay和duration值都添加一个恒定的乘数
    
    var M = 1;
    test1.velocity({opacity: 1, scale: 2}, {duration: 500 * M, easing: "ease-in-out "});

> 这个同样适用于less,sass 制作css动画

###### PRO
* 降低动画速度，完成单个动画的调用时间（特别是复杂动画中）
* 加速动画播放速度，用于执行UI测试的时候

###### Velocity中的mock : $.Velocity.mock = 常数

        $.Velocity.mock = 5;
        test1.velocity({ opacity: 1 }, { duration:1000 });
        //这里的duration就是5000ms了


   

###### Velocity中的mock : $.Velocity.mock = 布尔值

         $.Velocity.mock = true;
        // duration = 0 , delay = 0 

* 强制所有动画在浏览器计时中断一次的时间内完成。这样的中断每几毫秒就发生一次。
* 动画一旦妨碍UI测试开发时，就可以迅速关闭所有动画。
* VMD： 动效设计器  [vmd](http://velocityjs.org/#vmd)








#### 拾鱼

*1* border-style: 边框样式

    p.none {border-style: none;}
    p.dotted {border-style: dotted;}
    p.dashed {border-style: dashed;}
    p.solid {border-style: solid;}
    p.double {border-style: double;}
    p.groove {border-style: groove;}
    p.ridge {border-style: ridge;}
    p.inset {border-style: inset;}
    p.outset {border-style: outset;}
    p.hidden {border-style: hidden;}

*2* border-width: 边框宽度
    
    border-width: medium;
    border-width: thin;
    border-width: thick;
    border-width: 15px;

*3*box-shadow: 阴影

    /* offset-x | offset-y | blur-radius | spread-radius | color */
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);