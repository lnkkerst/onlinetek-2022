if (window.innerHeight <= window.innerWidth) {
    document.write("<div style='position: fixed; top: 0; left: 0; height: 100vh; width: 100vw; background-color: #000; z-index: 168; display: flex; justify-content: center;'>" + "<p id='vertical-tips' style='align-self: center; color: #ffffff; text-align: center;'>请使用竖屏访问<br/>电脑端用户可以将浏览器拉伸至竖屏比例后刷新访问<br/>～(∠・ω< )⌒★</p>" + "</div>");
    document.getElementById("vertical-tips").style.fontSize = Math.min(window.innerHeight / 20, window.innerWidth / 30).toString() + "px"
}