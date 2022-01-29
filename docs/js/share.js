$("html, body").css("font-size",Math.min(window.innerHeight/20,window.innerWidth/15));function getParams(){let results={};let paramList=window.location.search.substr(1).split("&");for(let i=0;i<paramList.length;++i){let param=paramList[i].split("=");results[param[0]]=param[1]}return results}function drawImageFile(ctx,imgFile,x,y){return new Promise(function(resolve,reject){let img=new Image;x=x||0;y=y||0;img.onload=function(){ctx.drawImage(img,x,y);resolve()};img.src=imgFile})}$("document").ready(function(){$("#reserved").hide();let params=getParams();let c=document.getElementById("canvas");let ctx=c.getContext("2d");let resultId=(params["result"]||0).toString();let operation=params["operation"]||"share";let result=resultList[resultId]["result"];const name=["dinner","papercutting","people","tiger","village"];drawImageFile(ctx,`../assets/img/result/${name[resultId]}-bg.jpg`).then(function(){return drawImageFile(ctx,`../assets/img/result/textbox-transparent.png`,0,100)}).then(function(){return drawImageFile(ctx,`../assets/img/share/${resultId}-text.png`)}).then(function(){return new Promise(function(resolve,reject){ctx.font="66px XingKai";for(let i=0;i<result.length;++i){ctx.fillText(result[i],162,400+100*i)}resolve()})}).then(function(){return new Promise(function(resolve,reject){ctx.fillStyle="rgba(255, 255, 255, 0.6)";ctx.fillRect(0,1200,720,80);resolve()})}).then(function(){return drawImageFile(ctx,"../assets/img/share/yiban.png",175,1208)}).then(function(){return drawImageFile(ctx,"../assets/img/share/sdu-online.png",7,1215)}).then(function(){return new Promise(function(resolve,reject){if(operation==="share"){drawImageFile(ctx,"../assets/img/share/qr.jpg",553,1113).then(function(){return drawImageFile(ctx,"../assets/img/share/qr-text.png",347,1216)}).then(resolve)}else{resolve()}})}).then(function(){let output=new Image;output.src=$("#canvas")[0].toDataURL("image/jpg");$("body").append(output);$(".loading").hide()})});