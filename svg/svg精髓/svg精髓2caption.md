#### svg 作为图像格式，包含于html中。

*1* 将svg包含在html的img标签中（svg文件作为页面的基本组成部分）

*2* svg元素作为css样式背景图片插入（svg图像主要用于装饰）

*3* 局限性：svg 绘制时与主页面分离，无法进行通信，主页面的样式对svg无效


[svg源码链接](https://oreillymedia.github.io/svg-essentials-examples/)

*4* fill 绘制元素里的fill是填充色，而animate元素里的fill是告诉浏览器引擎如何填补剩下的时间。 (fill:freeze; fill:remove默认值 )

    <rect x="10" y="10" width="200" height="20" stroke="black" fill="#eee">
      <animate id="animation"
        attributeName="width"
        attributeType="XML"
        from="200" to="20"
        begin="0s" dur="5s"
        fill="freeze" />
    </rect>

*5* 并发，同步动画，绑定一个动画的开始时间为另外一个动画的开始或结束

      <svg width="200" height="200">
        <circle cx="60" cy="60" r="30" style="fill: #f9f; stroke: gray;">
          <animate id="c1" attributeName="r" attributeType="XML"
            begin="0s" dur="4s" from="30" to="10" fill="freeze"/>
        </circle>

        <circle cx="120" cy="60" r="10" style="fill: #9f9; stroke: gray;">
          <animate attributeName="r" attributeType="XML"
            begin="c1.begin+1.25s" dur="4s" from="10" to="30" fill="freeze"/>
        </circle>
      </svg>

      //begin = "c1.end"


*6* dur="10s" end="14s" 两个属性看谁先到就执行那个

*7* 带重复的同步动画 begin="circleAnim.repeat(1)+2.5s"  ,repeate(count)

    <svg width="350" height="120">
      <circle cx="60" cy="60" r="15"
        style="fill: none; stroke: red;">
        <animate id="circleAnim" attributeName="cx" attributeType="XML"
          begin="0s" dur="5s" repeatCount="3"
          from="60" to="260" fill="freeze"/>
      </circle>

      <rect x="230" y="80" width="60" height="30"
        style="fill: #ccf; stroke: black;">
        <animate attributeName="x" attributeType="XML"
          begin="circleAnim.repeat(1)+2.5s" dur="5s"
          from="230" to="30" fill="freeze"/>
      </rect>
    </svg>


*8* 路径动画 mpat获取对应的路径id

    <mpath xlink:href="#cubicCurve"/>

     <path fill-rule="evenodd" clip-rule="evenodd" fill="#70C7D3" d="M34.967,128.493c0,0,9.687-26.744-15.08-48.97
            C-4.88,57.296-15.64,3.946,43.084,0.14c58.723-3.807,60.029,71.127,0,124.471C39.998,127.353,34.967,128.493,34.967,128.493z"/>
        <animateMotion   begin="0s" dur="3s" repeatCount="1" rotate="auto-reverse"  fill="freeze">
          <mpath xlink:href="#cubicCurve"/>
        </animateMotion>
        </g>

    <path id="cubicCurve" fill="none" stroke="#000000" stroke-miterlimit="10" d="M197.26,5.659c0,0,116.255,171.155,175.066,181.316
            c58.812,10.162,110.963,45.679,155.919,99.062c42.161,50.063,42.995,77.691,150.447,88.902
            c119.938,12.514,70.857-24.443,219.938-5.294c149.08,19.147,160.285,75.048,167.124,98.298"/>

*9* dom获取svg

        var r = document.getElementById("rectangle");

* r.getAttribute("x")     读取x的属性值，并，以字符串形式返回属性的值
* r.setAttribute("x","100px")     改变属性值，如果属性值不存在就会创建。
* r.removeAttribute("x")  删除属性
* r.style.getPropertyValue("stroke")    获得指定样式，以字符串形式返回值
* r.style.setPropertyValue("fill","#eee",null); 修改属性，第三个属性通常为null,或者是important      
* r.style.removePropertyValue("fill") 删除属性
* txt.textContent属性：获取或者修改节点的文本内容。

*10* 鼠标事件

    var water = document.getElementById("water");

    //点击svg元素缩放0.5，感人啊
    water.addEventListener("click", grow);

    function grow(evt) {
      var obj = evt.target;
      obj.setAttribute("transform", "scale(0.5)" );
    }

*11* 透明度的设置

    fill:填充颜色;
    fill-opacity:填充颜色透明度;
    stroke:描边颜色;
    stroke-Width:描边宽度;
    stroke-opacity:描边透明度;

    // 方法一：鼠标点击水滴，水滴执行消失动画。
    <animate attributeName="fill-opacity" begin="water.click" from="1" to="0" dur="3s" fill="freeze" />

    //方法二：
    var water = document.getElementById("water");

    //鼠标点击水滴，触发点击事件，立马消失，这个没有过渡
    water.addEventListener("click", grow);

    function grow(evt) {
      var obj = evt.target;
      obj.setAttribute("fill-opacity", "0");
    }

*12* css处理svg动画

* 选中想要运动的元素，将其的动画属性作为一个整体进行设置
* 通过定义@keyframes来告诉浏览器在动画什么阶段改变元素的属性