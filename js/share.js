$("html, body").css("font-size", Math.min(window.innerHeight / 20, window.innerWidth / 15))

function getParams() {
    let results = {};
    let paramList = window.location.search.substr(1).split("&");
    for (let i = 0; i < paramList.length; ++i) {
        let param = paramList[i].split("=");
        results[param[0]] = param[1];
    }
    return results;
}

function drawImageFile(ctx, imgFile, x, y) {
    return new Promise(function (resolve, reject) {
        let img = new Image();
        x = x || 0;
        y = y || 0;
        img.onload = function () {
            ctx.drawImage(img, x, y);
            resolve();
        };
        img.src = imgFile;
    });
}

$("document").ready(function () {
    $("#reserved").hide(); // 隐藏加载字体占位元素
    let params = getParams(); // 获取参数
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d"); // 画笔
    let resultId = (params["result"] || 0).toString();
    let operation = params["operation"] || "share";
    let result = resultList[resultId]["result"];
    drawImageFile(ctx, `../assets/img/share/${resultId}-bg.jpg`).then(function () { // 画背景
        return drawImageFile(ctx, `../assets/img/share/text-bg.png`, 0, 70);
    }).then(function () { // 画半透明文本框
        return drawImageFile(ctx, `../assets/img/share/${resultId}-text.png`);
    }).then(function () { // 画字
        return new Promise(function (resolve, reject) {
            ctx.font = "36px XingKai";
            for (let i = 0; i < result.length; ++i) {
                ctx.fillText(result[i], 160, 280 + 80 * i);
            }
            resolve();
        });
    }).then(function () {
        return new Promise(function (resolve, reject) {
            ctx.fillStyle = "#ffffff88";
            ctx.fillRect(20, 840, 500, 100);
            resolve();
        });
    }).then(function () {
        return drawImageFile(ctx, "../assets/img/share/yiban.png", 330, 852);
    }).then(function () {
        return drawImageFile(ctx, "../assets/img/share/sdu-online.png", 60, 857);
    }).then(function () {
        return new Promise(function (resolve, reject) {
            if(operation === "share") {
                ctx.fillRect(270, 760, 250, 80);
                ctx.font = "20px san-serif";
                ctx.fillStyle = "#000000";
                ctx.fillText("扫码答题", 275, 790);
                ctx.fillText("解锁新春签语", 275, 820);
                drawImageFile(ctx, "../assets/img/share/qr.jpg", 400, 710).then(resolve);
            } else {
                resolve();
            }
        });
    }).then(function () {  // 输出图片
        let output = new Image();
        output.src = $("#canvas")[0].toDataURL("image/jpg");
        $("body").append(output);
        $(".loading").hide();
    });
});