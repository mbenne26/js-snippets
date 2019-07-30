// ==UserScript==
// @name         LabOnDemand Fullscreen (no-detach)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes instructions ifield (open in new window), and maximizes display on fullscreen
// @author       Max Bennett
// @match        https://labondemand.com/VirtualizationClient/*
// @grant        GM_addStyle
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

//include jquery
var $ = window.jQuery;
// var $iFrameDOM = $("iframe#consoleIframe").contents();

//set width of console window to full size, should also resize virtual windows resolution
var myConsoleWrapper = document.getElementById('consoleWrapper');
myConsoleWrapper.style.width ="88%";

//override resize func from breaking 100% width
$(window).resize(function () {
    myConsoleWrapper.style.width = ($(window).width()-.1*($(window).width())) + "px";
//     myConsoleWrapper.css({"position": "static"});
//     $('#vmWrapper.machineWrapper').css({"text-align": "left"});
});

//parse GUID from VirtualizationClient URL
// var pathArray = window.location.pathname.split( '/' );
// var myGUID = pathArray[2];
// //Instructions URL
// var myCloudClientPath = "https://labondemand.com/CloudClient/" + myGUID

//reduce instructions size (by resizing to 12%)
var myInstructionsWrapper = document.getElementById('instructionsWrapper');
myInstructionsWrapper.style = 'width: 12%;';

// $(document).on('ready', function() {
//     setTimeout(function() {
//         document.body.style.zoom = "10%";
//     }, 5000);
// });
// $(document).on('ready', function() {
//     setTimeout(function() {
//         alert("test");
//         $('#vmWrapper.machineWrapper').css({"text-align": "left"});
//     }, 10000);
// });
// var myConfObj = {
//   iframeMouseOver : false
// }
// window.addEventListener('blur',function(){
//   if(myConfObj.iframeMouseOver){
//     console.log('Wow! Iframe Click!');
//   }
// });

// document.getElementById('#vmWrapper.machineWrapper').addEventListener('mouseover',function(){
//    myConfObj.iframeMouseOver = true;
//     $('#vmWrapper.machineWrapper').css({"text-align": "left"});
// });
// document.getElementById('#vmWrapper.machineWrapper').addEventListener('mouseout',function(){
//     myConfObj.iframeMouseOver = false;
//     $('#vmWrapper.machineWrapper').css({"text-align": "left"});
// });

// setTimeout(function() {
//             document.addEventListener('DOMContentLoaded', function() {
//                 $('#vmWrapper.machineWrapper').css({"text-align": "left"});
//                 $('#vmWrapper').css({"position": "fixed"});
//                 $('#wsinput').css({"position": "fixed"});
//             });
//         }, 3000);

// //open instructions in new window, move to lower-right corner
// var smallWidth = $(window).width()*.1;
// var smallHeight = $(window).height()*.94;

// var sidePanel = window.open(myCloudClientPath,'','width='+smallWidth+',height='+smallHeight)
// sidePanel.moveTo(window.screen.width,window.screen.height);

//create button within its own div
// var zNode = document.createElement('div');
// zNode.innerHTML = '<input type="button" id="toggleBtn" value="Hide" />';
// zNode.setAttribute('id', 'myContainer');
// document.body.appendChild(zNode);
// var myToggleBtn = document.getElementById("toggleBtn");

// //activate the newly added button
// myToggleBtn.addEventListener(
// 	"click", ButtonClickAction, false
// );

// var myButtonClickAction=true;
// //click function
// function ButtonClickAction(zEvent) {
//     //instructions are invisible, make visible, decrease console screen size, change & move btn
// 	if (myButtonClickAction) {
//         $('#wsinput').css({"position": "static"});
//         myButtonClickAction = !myButtonClickAction;
//         myToggleBtn.value = "Show";
//     //instructions are visible, make invisible, increase console screen size, change & move btn
// 	} else {
//         $('#wsinput').css({"position": "absolute"});
//         myButtonClickAction = !myButtonClickAction;
//         myToggleBtn.value = "Hide";
// 	}
// }

// // transform:rotate(270deg);
// // -ms-transform:rotate(270deg);



function addCss(cssString) {
    var head = document.getElementsByTagName('head')[0];
    var newCss = document.createElement('style');
    newCss.type = "text/css";
    newCss.innerHTML = cssString;
    head.appendChild(newCss);
}
addCss (
    '#vmWrapper.machineWrapper {text-align: left;}'
);


if (typeof GM_addStyle == 'undefined') {
  this.GM_addStyle = (aCss) => {
    'use strict';
    let head = document.getElementsByTagName('head')[0];
    if (head) {
      let style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.textContent = aCss;
      head.appendChild(style);
      return style;
    }
    return null;
  };
}



// //style our newly added elements using CSS
GM_addStyle(multilineStr(function() {
    /*!
	#vmWrapper.machineWrapper {
    text-align: left;
    }
	*/
}));

// /*!
// 	#myContainer {
// 	position:absolute;
// 	top:3%;
// 	left:75%;
// 	font-size:20px;
// 	}
// 	*/

//helper function for GM_addStyle
function multilineStr(dummyFunc) {
    var str = dummyFunc.toString();
    str = str.replace(/^[^\/]+\/\*!?/, '') // Strip function () { /*!
        .replace(/\s*\*\/\s*\}\s*$/, '') // Strip */ }
        .replace(/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
    ;
    return str;
}