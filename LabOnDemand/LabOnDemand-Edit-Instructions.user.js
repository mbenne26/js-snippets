// ==UserScript==
// @name         LabOnDemand edit instructions
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove tabHeadings, & increase size of instructions to fill the gap
// @author       Max Bennett
// @match        https://labondemand.com/CloudClient/*
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-2.2.4.min.js
// ==/UserScript==

(function() {
    'use strict';

//include jquery
var $ = window.jQuery;

$("body").append ( `
<style type="text/css">#vmWrapper.machineWrapper {
text-align: left;
}</style>
` );

//when mouse in instructions tab, focus chkbox, remove bkgrnd from all ol>li elements, grey bkgrd of current task
var chkbxs,ollis = null;
$('div#instructionsContent').mouseenter(function() {
    //current list of chxbxs and ol lis
    var chkbxs = $('.task-list-item .checkbox');
    var ollis = $('ol.taskList > li.task-list-item');

    //focus on current chkbox
    chkbxsHelper(chkbxs);
    //removes background color of all olli
    ollis.css({"background":''});
    //applies grey to the active task
    ollisHelper(ollis, 'darkslategrey');
});
//when mouse out instructions tab, refocus chkbox, grey bkgrd color of ol>li
$('div#instructionsContent').mouseleave(function() {
    //current list of chxbxs and ol lis
    chkbxs = $('.task-list-item .checkbox');
    ollis = $('ol.taskList > li.task-list-item');

    //applies grey to the active task
    ollisHelper(ollis, 'darkslategrey');
    //removes grey from LAST task
    ollisHelper2(ollis, '');
    //focus on current chkbox
    chkbxsHelper(chkbxs);
});

//delete the tab heading containing Resources, Help etc.
var elmDeleted = document.getElementById('tabHeadings');
elmDeleted.parentNode.removeChild(elmDeleted);

//reduce size & padding of previous & next btns (in footer)
$("#previous, #next").css({"line-height": "0"});
$("#previous").css({"padding-left": "24px"});
$("#next").css({"padding-right": "18px"});

//more resizing in function
$("#next").click(resizeContent());

$(document).ready(function() { //When document has loaded
    setTimeout(function() {
        //do more resizing
        resizeContent();

        //hides (banishes) the non-TAB-key-friendly CSS3 chxbx
        $('.checkbox > span').css({"display": "none"});
        //un-hides the ACTUAL input chkbxsbx
        $('label.checkbox > input').css({"display": "inline"});
        //pushes the TAB-friendly input chkbxsbx to the position of the (now-hidden) CSS3 chxbx
        $('p > label.checkbox').css({"right": "0", "top": "0"});

        //set displayed value for instructions zoomValue to 80%
        $("#zoomValue").html("80%");
        //the actual 80% transformation takes place here
        $(".zoomable").css({"transform": "scale(0.9)", "width": "111%"});
    }, 1000); //x milliseconds will elapse and code will execute
});

function ollisHelper(ollis, color) {
    ollis = $('ol.taskList > li.task-list-item');
    ollis[$("input[type='checkbox']:checked").map(function() {
        return $(this)}).length].style.background = color;
}
function ollisHelper2(ollis, color) {
    ollis = $('ol.taskList > li.task-list-item');
    ollis[$("input[type='checkbox']:checked").map(function() {
        return $(this)}).length-1].style.background = color;
}
function chkbxsHelper(chkbxs) {
    chkbxs[$("input[type='checkbox']:checked").map(function() {
        return $(this)}).length].focus();
}
function resizeContent() {
    setTimeout(function() {
        //fills empty space from reduced size of footer btns & deleted tabHeadings
        $(".tabContent").css({"top": "6%", "bottom": "6%","padding": "0"});
        //removes padding from task list
        $('ol.taskList').css({"padding-left": "0","margin-left": "0"});
        $('li.task-list-item').css({"margin": "0 0 0 6px"});
        //add a tiny bit of padding to anything that isn't numbered
        $('#pages h1, h2').css({"margin-left": "7px"});
        $('.page.selected > p').css({"margin-left": "7px"});
        //removes padding from lesson title header
        $('#header').css({"padding": "0 15px 0 15px", "min-height": "30px"});
        $('#vmWrapper.machineWrapper').css({"text-align": "left"});
        $('.page ol').css({'list-style-position': 'inside'});

        $('li.task-list-item > p:nth-child(2)').css({"text-align": "center"});

    }, 1000);
};
})();


// $.each( chkbxs, function( i, val ) {
//   $( "#" + val ).text( "Mine is " + val + "." );
//   // Will stop running after "three"
//   return ( val !== "three" );
// });
// document.addEventListener('readystatechange', function() {
//     $('#vmWrapper').css({"position": "absolute"});
// });
// var myLostFocus;
// if($('.task-list-item .checkbox').is(':checked')) {
//     console.log('Check occured');
//     myLostFocus = this;
//     alert(myLostFocus);
// }
// var len = chkbxs.length
// var checked = false;
// var i=0;
// for(i=0; i<len; i++) {
// 	if(chkbxs[i].value != 'on') {
//         break;
//     }
// }
// console.log(i);
// chkbxs[i].focus();
// $('div#instructionsFooter').mouseover(function(e) {
//     console.log('moving to last checkbox');
//     var code = e.keyCode || e.which;
//     function setFocusInstructionsIframe() {
//         var iframe = $("#instructionsIFrame")[0];
//         //         iframe.contentWindow.focus();
//         myLostFocus.focus();
//     } setTimeout(setFocusInstructionsIframe, 100);
//     return false;
// });
//document.getElementById("vmWrapper").scrollIntoView()
//$("body").on('click','div[id^="wsinput"]', function (e) { $('#wsinput').css({"position": "static"}); });
//$('#vmWrapper').focus();
//         setTimeout(function() {
//             document.addEventListener('DOMContentLoaded', function() {
//                 $('#vmWrapper.machineWrapper').css({"text-align": "left"});
//                 $('#vmWrapper').css({"position": "fixed"});
//                 $('#wsinput').css({"position": "fixed"});
//             });
//         }, 1000);