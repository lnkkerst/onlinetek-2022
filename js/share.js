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

// $("document").ready(function () {
//     $("#reserved").hide(); // 隐藏加载字体占位元素
//     let params = getParams(); // 获取参数
//     let c = document.getElementById("canvas");
//     let ctx = c.getContext("2d"); // 画笔
//     let resultId = (params["result"] || 0).toString();
//     let operation = params["operation"] || "share";
//     let result = resultList[resultId]["result"];
//     drawImageFile(ctx, `../assets/img/share/${resultId}-bg.jpg`).then(function () { // 画背景
//         return drawImageFile(ctx, `../assets/img/share/text-bg.png`, 0, 70);
//     }).then(function () { // 画半透明文本框
//         return drawImageFile(ctx, `../assets/img/share/${resultId}-text.png`);
//     }).then(function () { // 画字
//         return new Promise(function (resolve, reject) {
//             ctx.font = "50px XingKai";
//             for (let i = 0; i < result.length; ++i) {
//                 ctx.fillText(result[i], 115, 295 + 76 * i);
//             }
//             resolve();
//         });
//     }).then(function () {
//         return new Promise(function (resolve, reject) {
//             ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
//             ctx.fillRect(0, 900, 540, 60);
//             resolve();
//         });
//     }).then(function () {
//         return drawImageFile(ctx, "../assets/img/share/yiban.png", 130, 906);
//     }).then(function () {
//         return drawImageFile(ctx, "../assets/img/share/sdu-online.png", 5, 911);
//     }).then(function () {
//         return new Promise(function (resolve, reject) {
//             if(operation === "share") {
//                 drawImageFile(ctx, "../assets/img/share/qr.jpg", 415, 835).then(function () {
//                     return drawImageFile(ctx, "../assets/img/share/qr-text.png", 260, 912);
//                 }).then(resolve);
//             } else {
//                 resolve();
//             }
//         });
//     }).then(function () {  // 输出图片
//         let output = new Image();
//         output.src = $("#canvas")[0].toDataURL("image/jpg");
//         $("body").append(output);
//         $(".loading").hide();
//     });
// });

$("document").ready(function () {
    $("#reserved").hide(); // 隐藏加载字体占位元素
    let params = getParams(); // 获取参数
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d"); // 画笔
    let resultId = (params["result"] || 0).toString();
    let operation = params["operation"] || "share";
    let result = resultList[resultId]["result"];
    const name = ["dinner", "papercutting", "people", "tiger", "village"];
    drawImageFile(ctx, `../assets/img/result/${name[resultId]}-bg.jpg`).then(function () { // 画背景
        return drawImageFile(ctx, `../assets/img/result/textbox-transparent.png`, 0, 100);
    }).then(function () { // 画半透明文本框
        return drawImageFile(ctx, `../assets/img/share/${resultId}-text.png`);
    }).then(function () { // 画字
        return new Promise(function (resolve, reject) {
            ctx.font = "66px XingKai";
            for (let i = 0; i < result.length; ++i) {
                ctx.fillText(result[i], 162, 400 + 100 * i);
            }
            resolve();
        });
    }).then(function () {
        return new Promise(function (resolve, reject) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
            ctx.fillRect(0, 1200, 720, 80);
            resolve();
        });
    }).then(function () {
        return drawImageFile(ctx, "../assets/img/share/yiban.png", 175, 1208);
    }).then(function () {
        return drawImageFile(ctx, "../assets/img/share/sdu-online.png", 7, 1215);
    }).then(function () {
        return new Promise(function (resolve, reject) {
            if(operation === "share") {
                drawImageFile(ctx, "../assets/img/share/qr.jpg", 553, 1113).then(function () {
                    return drawImageFile(ctx, "../assets/img/share/qr-text.png", 347, 1216);
                }).then(resolve);
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