##学习svg，绘制藤蔓动画  

*1* [SVG SMIL animation概览](http://www.zhangxinxu.com/wordpress/2014/08/so-powerful-svg-smil-animation/)

* set：可以在特定时间之后修改某个属性值（也可以是CSS属性值）。
* animate
* animateColor
* animateTransform
* animateMotion


###### 要想前端有所成，有两条路，一是往前，webGL,   canvas, SVG领域，这需要对图形敏感，有设计感，有动画素养，有相当的数学知识，以及最重要的JavaScript控制能力


[svg path贝塞尔曲线](http://www.zhangxinxu.com/wordpress/2014/06/deep-understand-svg-path-bezier-curves-command/)

######Warning: SVG's SMIL animations (<animate>, <set>, etc.) are deprecated and will be removed. Please use CSS animations or Web animations instead.

#####excuse me ? 弃用了？！
[不弃疗就好](http://tgideas.qq.com/webplat/info/news_version3/804/7104/7106/m5723/201610/514918.shtml)


[史诗级动画smil](https://css-tricks.com/guide-svg-animations-smil/)

*2* svg元素

    <svg width="1200" height="520" xmlns="http://www.w3.org/2000/svg">
    </svg>

    //ai自动生成的<svg>
    <svg 
        version="1.1" 
        id="Layer_1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        x="0px" 
        y="0px"
        width="600px" 
        height="850px" 
        viewBox="0 0 600 850" 
        xml:space="preserve">
    </svg>

*3* g元素：容器元素，组合相关的图形元素,支持多重嵌套

*4* 矩形元素 rect

    <rect y="3" fill-rule="evenodd" clip-rule="evenodd" fill="#B8CD30" width="1366" height="768"/>

*5* 圆 circle
        
        //不用加上单位px
        <circle cx="80" cy="80" r="10"/>

*6* 椭圆 ellipse
    
        <circle cx="80" cy="80" rx="10" ry="50"/>

*7* 折线 polyine

        <polyline fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#D64947" stroke-miterlimit="10" 
        points="
            0.346,4.517  4.177,8.183 1.429,12.517 12.013,13.017 7.263,16.767 4.92,18.683 13.596,19.35 17.846,14.1 17.346,7.517 4.177,4.85 8.596,0.35 "/>


*8* 多边形 polygon

        <polygon fill-rule="evenodd" clip-rule="evenodd" fill="#D64947"     
            points="2.845,9.853 0,4.927 2.845,0 8.533,0 11.377,4.927 
    8.533,9.853 "/>

*9* fill-rule="evenodd" [填充法则：](http://blog.csdn.net/cuixiping/article/details/7848369)