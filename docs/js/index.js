function setRem(){var e=document.documentElement.clientWidth/10,t=document.documentElement.clientHeight+"px";document.documentElement.style.fontSize=e+"px",$(".bg").css("height",t)}function reAnimate(e,t){var o;$(e).removeClass("animated").addClass("animated "+t).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",(o=t,function(){$(this).removeClass("animated "+o)}))}"scrollRestoration"in history&&(history.scrollRestoration="manual");let isBgmAutoPlayed=!1;function bgmToggle(){document.getElementById("bgm").paused?(document.getElementById("bgm").play(),$("#bgm-img").show(),$("#bgm-img-muted").hide()):(document.getElementById("bgm").pause(),$("#bgm-img").hide(),$("#bgm-img-muted").show())}function bgmOn(){document.getElementById("bgm");document.getElementById("bgm").play(),$("#bgm-img").show(),$("#bgm-img-muted").hide()}function bgmOff(){document.getElementById("bgm");document.getElementById("bgm").pause(),$("#bgm-img").hide(),$("#bgm-img-muted").show()}function wxBgmAutoPlay(e){let t=document.getElementById(e);document.addEventListener("WeixinJSBridgeReady",function(){t.play()},!1),document.addEventListener("YixinJSBridgeReady",function(){t.play()},!1)}function bgmInit(){let e=document.getElementById("bgm");e.paused?(e.play(),wxBgmAutoPlay("bgm"),e.paused||(isBgmAutoPlayed=!0,$("#bgm-img").show(),$("#bgm-img-muted").hide())):(isBgmAutoPlayed=!0,$("#bgm-img").show(),$("#bgm-img-muted").hide())}function banClick(e){e=e||0,$("#shield").show(),setTimeout("$('#shield').hide()",e)}function banScroll(e){e=e||0,$("#box").fullpage.setAutoScrolling(!1),$("#box").fullpage.setKeyboardScrolling(!1),setTimeout('$("#box").fullpage.setAutoScrolling(true);',e),setTimeout('$("#box").fullpage.setKeyboardScrolling(true);',e)}function getRandQuestion(e){return e="number"==typeof e?e:5,questionList.sort(function(){return Math.random()-.5}).slice(0,e)}let questions,selected=[-1,-1,-1,-1,-1];function getResultId(){for(let t=0;t<selected.length;++t)if(-1===selected[t]){let e=$($(".option-box")[t]);return $("#box").fullpage.moveTo(t+2),setTimeout(function(){reAnimate(e,"flash")},1200),"error"}let t=[];for(let e=0;e<5;++e)t.push([parseInt(questions[e].id),selected[e]]);t.sort(function(e,t){return e[0]>t[0]?1:-1});let e=t[0][0];for(var o of t)e=(114*e+(514*o[0]<<o[1]))%1919810;return e%5}function writeQuestions(){var t=$(".question-box"),o=$(".option-box");for(let e=0;e<t.length;++e)$(t[e]).append("<p class='question-text wow fadeIn'>"+questions[e].question+"</p>"),$(o[e]).append("<div class='option-text-block'></div>");var n=$(".option-text-block");for(let t=0;t<o.length;++t)for(let e=0;e<4;++e){var i=1.7+.3*e;$(n[t]).append("<p class = 'option-text option-text-"+["A","B","C","D"][e]+" wow fadeIn' data-wow-delay='"+i+"s'>"+questions[t].answers[e]+"</p>")}}function createSelectOption(e,t,o){return function(){banClick(1300),banScroll(1300),$(this).parent().children().css("border-top-width","0"),$(this).parent().children().css("border-bottom-width","0.5rem"),$(this).css("border-top-width","0.5rem"),$(this).css("border-bottom-width","0"),$(o).parent().children().css("border-top-width","0"),$(o).parent().children().css("border-bottom-width","0.5rem"),$(o).css("border-top-width","0.5rem"),$(o).css("border-bottom-width","0"),selected[e]=t,setTimeout("$('#box').fullpage.moveSectionDown()",300)}}function eventBind(){var e=$(".option-box");for(let t=0;t<e.length;++t){var o=$(e[t]).find("img"),n=$(e[t]).find("p");for(let e=0;e<o.length;++e)$(o[e]).click(createSelectOption(t,e,n[e])),$(n[e]).click(createSelectOption(t,e,o[e]))}$("#start-button").on("click",function(){$("#box").fullpage.moveSectionDown(),$("#box").fullpage.setAllowScrolling(!0),isBgmAutoPlayed||bgmOn()}),$("#draw-button").on("click",function(){let t=getResultId();"error"!==t&&(reAnimate("#wobble-box","wobble"),setTimeout(function(){var e="result/index.html?result="+t;window.open(e,"_self")},1500))}),$("#bgm-box").click(bgmToggle)}function pluginInit(){$("#box").fullpage({scrollBar:!0,resize:!0,scrollingSpeed:1e3,recordHistory:!1});let e=new WOW({boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0});e.init()}$(document).ready(function(){$("#box, #bgm-box, #shield").hide(),setRem(),questions=getRandQuestion(),pluginInit(),writeQuestions(),eventBind();let e=setInterval(function(){var t=document.querySelectorAll("img");let o=!0;for(let e=0;e<t.length;++e)t[e].complete||(o=!1);o&&($(".loading").hide(),$("#box, #bgm-box").show(),clearInterval(e))},200);bgmInit(),$("#box").fullpage.setAllowScrolling(!1)});