$("html, body").css("font-size",Math.min(window.innerHeight/20,window.innerWidth/15));function getParams(){let n={};let a=window.location.search.substr(1).split("&");for(let t=0;t<a.length;++t){let e=a[t].split("=");n[e[0]]=e[1]}return n}function drawImageFile(e,t,n){let a=new Image;n=n||0;let l=t[n][1]||0;let o=t[n][2]||0;a.onload=function(){e.drawImage(a,l,o);drawImageFile(e,t,n+1)};a.src=t[n][0]}$("document").ready(function(){let e=getParams();let t=document.getElementById("canvas");let n=t.getContext("2d");let a=new Image;a.onload=function(){n.drawImage(a,0,0);let t=new Image;t.src="../assets/img/share/qr.jpg";t.onload=function(){n.drawImage(t,360,780);let e=new Image;e.src=$("#canvas")[0].toDataURL("image/jpg");$("body").append(e)}};a.src="../assets/img/share/"+e["result"]+".jpg"});