#### 1210 汲斋

###### 1 svg的容器和路径

*1.1* 容器：是可以进行平移，旋转， 缩放操作
        
        <g id="koch" opacity="0">
        </g>
        //jquery操作
        $("#koch").velocity({translateY: "-=100px"}, {duraiton: "3000", easing: "spring"});

*1.2* 路径：改变自身颜色等自身属性

        <path id="leftpath" fill="#ABB130" d="M654.901,404.54c2.364,2.84,5.705,7.565,5.91,11.793l3.618-1.104c0,0-3.75-7.561-7.577-11.304
            c-11.288-14.326-38.164-19.799-38.164-19.799c28.054,4.109,38.444,15.887,40.873,19.227c0.068-0.019,0.136-0.035,0.203-0.055
            c0,0,10.01-25.726-23.868-28.609c-28.414-2.418-27.068-12.342-25.896-15.481C606.422,367.16,584.232,421.528,654.901,404.54z
             M650.602,379.665c11.154,5.352,9.306,16.892,9.306,16.892C660.074,387.207,650.602,379.665,650.602,379.665z M605.855,380.965
            c-0.921,13.751,7.52,20.609,7.52,20.609C602.591,395.327,605.855,380.965,605.855,380.965z M610.447,358.252
            c0,0-0.22,0.353-0.446,0.957C610.28,358.59,610.447,358.252,610.447,358.252z"/>

        //jquery操作
        $("#leftpath").velocity({fillRed: "255"}, {duraiton: "3000", easing: "spring"});


###### 2. velocity.js 对svg颜色的设置  

*2.1* fillRed: num ; //num是(0,255]之间的一个数

        $("#leftpath").velocity({fillRed: "255"}, {duraiton: "3000", easing: "spring"});

*2.2*  fill svg的填充颜色属性
        
        $("#leftpath").velocity({fill: "#eee"}, {duraiton: "3000", easing: "spring"});