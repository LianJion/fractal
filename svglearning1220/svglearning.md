#### 1220 caption 2 在网页中使用SVG

*1* 在 "img"元素中包含svg

    <img src = "cat.svg" title="cat" alter="cat" />

*2* 在css中包含svg , background-image, border-image , list-image

    div.background-cat {
        background-image: url("cat.svg");
        background-size: 100% 100%;
    }

*3* svg作为应用程序：嵌入对象"object"标签,type="image/svg+xml"

    <object> 标签用于包含对象，比如图像、音频、视频、Java applets、ActiveX、PDF 以及 Flash。

    <object data="cat.svg" type="image/svg+xml" title="Cat Obj" alt="cat">
    //效果类似于<img>标签的效果，不继承定义在父文档中的任何样式，缩放适配嵌入元素嵌入的宽高


    
*4* 混合文档中的svg标签：html与svg共存
###### 在html5中内联SVG
      //css可以给svg元素添加这些样式
      circle {
        fill: lavender;
        stroke: navy;
        stroke-width: 5;
      }
      svg {
        display: block;
        width: 500px;
        height: 500px;
        margin: auto;
        border: thick double navy;
        background-color: lightblue;
      }
      
