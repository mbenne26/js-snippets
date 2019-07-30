//k = answerThis(questionList,answerList,k);
//download(JSON.stringify(questionList), 'questionList.txt', 'text/plain');
//download(JSON.stringify(answerList), 'answerList.txt', 'text/plain');
var questionList = [];
var answerList = [];
//var questionList[0] = ["123"];
//var answerList[0] = ["Abc"];
var k=0;
function answerThis(questionList,answerList,k) {
  scroll(0,350);
  
  var myAnswer = prompt("ABCD1234");
  if(myAnswer == 1){myAnswer = 'A';}
  if(myAnswer == 2){myAnswer = 'B';}
  if(myAnswer == 3){myAnswer = 'C';}
  if(myAnswer == 4){myAnswer = 'D';}
  if(myAnswer == 't'){myAnswer = 'True';}
  if(myAnswer == 'f'){myAnswer = 'False';}
  myAnswer = myAnswer.charAt(0).toUpperCase();
  
  var answerSelector = "div#DivAnswer" + myAnswer;
  console.log(document.getElementById("thisQuestion").innerText + "\n" + document.querySelector(answerSelector).innerText);
  questionList[k] = document.getElementById("thisQuestion").innerText;
  answerList[k] = document.querySelector(answerSelector).innerText;
  document.querySelector(answerSelector).click();
  k++;
  return k;
};
function finalExam(questionList,answerList) {
  var currentAnswer="";
  var currentQuestion="";
  var myAnswer="";
  var answerSelector = "div#DivAnswer";
  currentQuestion = document.getElementById("thisQuestion").innerText
  //currentQuestion = "123"
  for (i = 0; i<questionList.length; i++) {
    if(currentQuestion == questionList[i]) {
      currentAnswer = answerList[i];
      myAnswer = answerList[i].charAt(0);
      if(myAnswer == 'T')
        myAnswer = 'True';
      if(myAnswer == 'F')
        myAnswer = 'False';
      answerSelector = answerSelector + myAnswer;
      console.log(currentAnswer);
    }
  }
  document.querySelector(answerSelector).click();
  return answerSelector;
};
function printPage() {
var print = document.getElementsByClassName("bgmasklabel")[1].getElementsByTagName("a")[4].href
print = print.replace("javascript:openpopup('","")
print = print.replace("');","")
window.open(print)
};
function examPage() {
document.getElementsByClassName("examchecklist")[0].getElementsByTagName("ul")[0].getElementsByTagName("li")[0].getElementsByTagName("a")[0].click()
};
function download(strData, strFileName, strMimeType) {	
	var D = document,
			A = arguments,
			a = D.createElement("a"),
			d = A[0],
			n = A[1],
			t = A[2] || "text/plain";

	//build download link:
	a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);

	if ('download' in a) { //FF20, CH19
			a.setAttribute("download", n);
			a.innerHTML = "downloading...";
			D.body.appendChild(a);
			setTimeout(function() {
					var e = D.createEvent("MouseEvents");
					e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					a.dispatchEvent(e);
					D.body.removeChild(a);
			}, 66);
			return true;
	}; /* end if('download' in a) */
};