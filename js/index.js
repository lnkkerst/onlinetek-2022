if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
}

function setRem() {
    let e = document.documentElement.clientWidth / 10;
    let t = document.documentElement.clientHeight + "px";
    document.documentElement.style.fontSize = e + "px";
    $(".bg").css("height", t)
}

function reAnimate(e, t) {
    $(e).removeClass("animated").addClass("animated " + t).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function (e) {
        return function () {
            $(this).removeClass("animated " + e)
        }
    }(t))
}

let isBgmAutoPlayed = false;

// 切换背景音乐播放状态
function bgmToggle() {
    let bgm = document.getElementById('bgm');
    if (!bgm.paused) {
        document.getElementById('bgm').pause();
        $("#bgm-img").hide();
        $("#bgm-img-muted").show();

    } else {
        document.getElementById('bgm').play();
        $("#bgm-img").show();
        $("#bgm-img-muted").hide();
    }
}

function bgmOn() {
    let bgm = document.getElementById('bgm');
    document.getElementById('bgm').play();
    $("#bgm-img").show();
    $("#bgm-img-muted").hide();
}

function bgmOff() {
    let bgm = document.getElementById('bgm');
    document.getElementById('bgm').pause();
    $("#bgm-img").hide();
    $("#bgm-img-muted").show();
}

function wxBgmAutoPlay(id) {
    let audio = document.getElementById(id);
    document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
    }, false);
    document.addEventListener("YixinJSBridgeReady", function () {
        audio.play();
    }, false);
}

// 检测背景音乐有没有自动播放
function bgmInit() {
    let bgm = document.getElementById('bgm');
    if (!bgm.paused) {
        isBgmAutoPlayed = true;
        $("#bgm-img").show();
        $("#bgm-img-muted").hide();
    } else {
        bgm.play();
        wxBgmAutoPlay("bgm");
        if (!bgm.paused) {
            isBgmAutoPlayed = true;
            $("#bgm-img").show();
            $("#bgm-img-muted").hide();
        }
    }
}

function showResultInIframe(url) {
    url = url || "result/?result=0"
    $("body").append(`<iframe id="iframe-result" src="${url}"><script>window.open(url, "_self")</script></iframe>`);

}

function banClick(ms) {
    ms = ms || 0;
    $("#shield").show();
    setTimeout("$('#shield').hide()", ms);
}

function banScroll(ms) {
    ms = ms || 0;
    $("#box").fullpage.setAutoScrolling(false);
    $("#box").fullpage.setKeyboardScrolling(false);
    setTimeout("$(\"#box\").fullpage.setAutoScrolling(true);", ms);
    setTimeout("$(\"#box\").fullpage.setKeyboardScrolling(true);", ms);
}

function getRandQuestion(e) {
    e = typeof e === "number" ? e : 5;
    return questionList.sort(function () {
        return Math.random() - .5
    }).slice(0, e)
}

let questions;
let selected = [-1, -1, -1, -1, -1];

function getResultId() {
    for (let t = 0; t < selected.length; ++t) {
        if (selected[t] === -1) {
            let e = $($(".option-box")[t]);
            $("#box").fullpage.moveTo(t + 2);
            setTimeout(function () {
                reAnimate(e, "flash")
            }, 1200);
            return "error"
        }
    }
    let t = [];
    for (let e = 0; e < 5; ++e) {
        t.push([parseInt(questions[e]["id"]), selected[e]])
    }
    t.sort(function (e, t) {
        if (e[0] > t[0]) {
            return 1
        } else {
            return -1
        }
    });
    let n = t[0][0];
    for (let e of t) {
        n = (n * 114 + (e[0] * 514 << e[1])) % 1919810
    }
    return n % 5
}

function writeQuestions() {
    let t = $(".question-box");
    let o = $(".option-box");
    for (let e = 0; e < t.length; ++e) {
        $(t[e]).append("<p class='question-text wow fadeIn'>" + questions[e]["question"] + "</p>");
        $(o[e]).append("<div class='option-text-block'></div>")
    }
    let i = $(".option-text-block");
    for (let n = 0; n < o.length; ++n) {
        for (let t = 0; t < 4; ++t) {
            let e = 1.7 + .3 * t;
            $(i[n]).append("<p class = 'option-text option-text-" + ["A", "B", "C", "D"][t] + " wow fadeIn" + "'" + " data-wow-delay='" + e + "s'>" + questions[n]["answers"][t] + "</p>")
        }
    }
}

function createSelectOption(e, t, n) {
    return function () {
        banClick(1300);
        banScroll(1300);
        $(this).parent().children().css("border-top-width", "0");
        $(this).parent().children().css("border-bottom-width", "0.5rem");
        $(this).css("border-top-width", "0.5rem");
        $(this).css("border-bottom-width", "0");
        $(n).parent().children().css("border-top-width", "0");
        $(n).parent().children().css("border-bottom-width", "0.5rem");
        $(n).css("border-top-width", "0.5rem");
        $(n).css("border-bottom-width", "0");
        selected[e] = t;
        setTimeout("$('#box').fullpage.moveSectionDown()", 300);
    }
}

function eventBind() {
    let e = $(".option-box");
    for (let o = 0; o < e.length; ++o) {
        let t = $(e[o]).find("img");
        let n = $(e[o]).find("p");
        for (let e = 0; e < t.length; ++e) {
            $(t[e]).click(function (e, t, n) {
                return createSelectOption(e, t, n)
            }(o, e, n[e]));
            $(n[e]).click(function (e, t, n) {
                return createSelectOption(e, t, n)
            }(o, e, t[e]))
        }
    }
    $("#start-button").on("click", function () {
        $("#box").fullpage.moveSectionDown();
        $("#box").fullpage.setAllowScrolling(true);
        if (!isBgmAutoPlayed) {
            bgmOn();
        }
    });
    $("#draw-button").on("click", function () {
        let t = getResultId();
        if (t !== "error") {
            reAnimate("#wobble-box", "wobble");
            setTimeout(function () {
                let e = "result/index.html?result=" + t;
                // window.open(e, "_self")
                showResultInIframe(e);
                $("#box").hide();
            }, 1500);
        }
    });
    $("#bgm-box").click(bgmToggle);
}

function pluginInit() {
    $("#box").fullpage({
        scrollBar: true,
        resize: true,
        scrollingSpeed: 1e3,
        recordHistory: false,
    });
    let e = new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: true,
        live: true,
    });
    e.init();
}

$(document).ready(function () {
    $("#box, #bgm-box, #shield").hide();
    setRem();
    questions = getRandQuestion();
    pluginInit();
    writeQuestions();
    eventBind();
    let loaderId = setInterval(function () {
        let imgs = document.querySelectorAll("img");
        let loaded = true;
        for(let i = 0; i < imgs.length; ++i) {
            if(!imgs[i].complete) {
                loaded = false;
            }
        }
        if(loaded) {
            $(".loading").hide();
            $("#box, #bgm-box").show();
            clearInterval(loaderId);
        }
    }, 200);
    bgmInit();
    $("#box").fullpage.setAllowScrolling(false);
});