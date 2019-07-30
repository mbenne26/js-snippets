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

//set width of console window to full size, should also resize virtual windows resolution
var myConsoleWrapper = document.getElementById('consoleWrapper');
myConsoleWrapper.style.width ="88%";

//override resize func from breaking 100% width
$(window).resize(function () {
    myConsoleWrapper.style.width = ($(window).width()-.1*($(window).width())) + "px";
});

//reduce instructions size (by resizing to 12%)
var myInstructionsWrapper = document.getElementById('instructionsWrapper');
myInstructionsWrapper.style = 'width: 12%;';

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