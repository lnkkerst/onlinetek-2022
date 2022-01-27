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

function drawImageFile(ctx, files, now) {
    let img = new Image();
    now = now || 0;
    let x = files[now][1] || 0;
    let y = files[now][2] || 0;
    img.onload = function () {
        ctx.drawImage(img, x, y);
        drawImageFile(ctx, files, now + 1)
    };
    img.src = files[now][0];
}

$("document").ready(function () {
    let params = getParams();
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    let bgImg = new Image();
    bgImg.onload = function () {
        ctx.drawImage(bgImg, 0, 0);
        let qrImg = new Image();
        qrImg.onload = function () {
            ctx.drawImage(qrImg, 360, 780);
            let output = new Image();
            output.src = $("#canvas")[0].toDataURL("image/jpg");
            $("body").append(output);
            $(".loading").hide();
        }
        qrImg.src = "../assets/img/share/qr.jpg";
    };
    bgImg.src = "../assets/img/share/" + params["result"] + ".jpg";
});