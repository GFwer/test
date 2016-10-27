//获取元素
var imgslist = document.getElementById("imgs"),
    imgs = imgslist.getElementsByTagName("li"),
    dotlist = document.getElementById("dots"),
    dots = dotlist.getElementsByTagName("li"),
    len = imgs.length,
    imgwidth = imgs[0].offsetWidth,//一张图片宽度
    totalwidth = imgwidth * (len - 1) * (-1),//总宽度
    changeleft = imgslist.offsetLeft,//初始图片块左边离box边的距离
    j=0,//用于记录小点的位置，j=0表示第一个，j=3表示最后一个
    timer;//=setInterval

//动画
function ani(elem, varywidth) {
    var curleft = imgslist.offsetLeft,//图片块左边离box的距离
        time = 20,//二十次动画
        anitime = 400,//切换时间
        intervaltime = anitime / time,//每次切换speed距离所需的时间，
        speed = (varywidth - curleft) / intervaltime,//每次定时切换的距离
        i = 0,//移动过了几次
        t = setInterval(function () {
            curleft = curleft + speed;
            elem.style.left = curleft + "px";
            i++;
            if (i === time) {
                clearInterval(t);//移动二十次后停止
            }
        },intervaltime);//每隔intervaltime时间移动speed距离，总共移动20次，即总时间为anitime
}

//下一张图片
function nextImg() {
    if (changeleft <= totalwidth) {//显示最后一张时，瞬间切换到第二张
        imgslist.style.left = -imgwidth + "px";
        changeleft = -imgwidth;
        dots[j].className = "dot";
        j++;
    }
    else {
        dots[j].className = "dot";
        j++;
        if (j == 4) {//白点位置归零
            j = 0;
        }
    }
    changeleft -= imgwidth;//每次移动后的left的值
    ani(imgslist, changeleft);
    dots[j].className = "wdot";
}

//上一张图片
function prevImg() {
    if (changeleft >= -imgwidth) {//显示第一张时，切换到倒数第二张
        imgslist.style.left = totalwidth + "px";
        changeleft = totalwidth;
        dots[j].className = "dot";
        j = 3;
    }
    else {
        dots[j].className = "dot";
        j--;
        if (j < 0) {
            j = 3;
        }
    }
    changeleft += imgwidth;//每次移动后的left的值
    ani(imgslist, changeleft);
    dots[j].className = "wdot";

}

//自动切换
function startAuto() {
    timer = setInterval(nextImg, 3000);
}

//停止自动切换
function stopAuto() {
    clearInterval(timer);
}

//点击圆点切换图片
function dotClick(event) {
    var target =event.target,//获取元素
        num;
    if (target.tagName.toLowerCase() === "li") {
        num = parseInt(target.id);
        changeleft = imgwidth * (num + 1) * (-1);
        ani(imgslist, changeleft);
        for (var k=0; k<len-2; k++) {
            dots[k].className="dot";
        }
        target.className="wdot";
        j =num;
    }
}
window.onload = function () {//载入时启用计时
    startAuto();

};
document.getElementById("R").onclick = nextImg;//点击右箭头
document.getElementById("L").onclick = prevImg;//点击左箭头
document.getElementById("dots").onclick = dotClick;//点击圆点切换对应图片
document.getElementById("box").onmouseover = stopAuto;//鼠标悬浮时停止计时
document.getElementById("box").onmouseout = startAuto;//鼠标离开时自动轮播