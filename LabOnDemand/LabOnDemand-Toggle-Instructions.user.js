// ==UserScript==
// @name         LabOnDemand Toggle Instructions
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds button to toggle InstructionsWrapper, enlarges ConsoleWrapper, & prevents re-scaling from blank space
// @author       Max Bennett
// @match        https://labondemand.com/VirtualizationClient/*
// @grant        GM_addStyle
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

//include jquery
var $ = window.jQuery;

// //override resize func from breaking width
// $(window).resize(function () {
//     myConsoleWrapper.style.width = ($(window).width()) + "px";
// });

//create button within its own div
var zNode = document.createElement('div');
zNode.innerHTML = '<input type="button" id="toggleBtn" value="Hide" />';
zNode.setAttribute('id', 'myContainer');
document.body.appendChild(zNode);
var myToggleBtn = document.getElementById("toggleBtn");

//activate the newly added button
myToggleBtn.addEventListener(
	"click", ButtonClickAction, false
);

//access divs
var myInstructionsWrapper = document.getElementById('instructionsWrapper');
var myConsoleWrapper = document.getElementById('consoleWrapper');

//click function
function ButtonClickAction(zEvent) {
    //instructions are invisible, make visible, decrease console screen size, change & move btn
	if (myInstructionsWrapper.style.width == "0%") {
        myInstructionsWrapper.style.width = "12%";
		myConsoleWrapper.style.width = "88%";
        myToggleBtn.value = "Hide";
        $('#myContainer').css('left', '82%');
    //instructions are visible, make invisible, increase console screen size, change & move btn
	} else {
		myInstructionsWrapper.style.width = "0%";
		myConsoleWrapper.style.width = "100%";
        myToggleBtn.value = "Show";
        $('#myContainer').css('left', '93%');
	}
}

//style our newly added elements using CSS
GM_addStyle(multilineStr(function() {
	/*!
	#myContainer {
	position:absolute;
	top:2%;
	left:82%;
	font-size:20px;
	}
	*/
}));

//     transform:rotate(270deg);
//     -ms-transform:rotate(270deg);

//helper function for GM_addStyle
function multilineStr(dummyFunc) {
	var str = dummyFunc.toString();
	str = str.replace(/^[^\/]+\/\*!?/, '') // Strip function () { /*!
		.replace(/\s*\*\/\s*\}\s*$/, '') // Strip */ }
		.replace(/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
	;
	return str;
}