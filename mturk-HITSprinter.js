//run ONCE, first in DevTools console
var banList = []
//var banList = 
var k = 0
//var k = banList.length-1
var isBanned = 0
var myHITs = document.querySelectorAll("div")[9].querySelectorAll("tr")

//then run this code as a live expression in DevTools
myHITs = document.querySelectorAll("div")[9].querySelectorAll("tr")
for (i = 1; i < myHITs.length-1; i++) {
	for (j = 0; j < banList.length; j++) {
		if (myHITs[i].querySelectorAll("td")[2].textContent + " TITLE: " + myHITs[i].querySelectorAll("td")[3].textContent == banList[j]) {
			isBanned = 1
			j = banList.length
		}
		else 
			isBanned = 0
	}
	if(isBanned != 1 && Number((myHITs[i].querySelectorAll("a")[2].textContent).replace(/[^0-9.-]+/g,"")) >= 0.1 && getComputedStyle(document.querySelectorAll("div")[9].querySelectorAll("tr")[i].querySelector("td"))["backgroundColor"] == "rgb(0, 188, 140)") {
		//myHITs[i].querySelectorAll("td")[5].querySelector("a").style.setProperty('--color', '#0B0080')
		myWindow = window.open(myHITs[i].querySelectorAll("td")[5].querySelector("a"))
		alert(myHITs[i].querySelectorAll("td")[2].textContent + " TITLE: " + myHITs[i].querySelectorAll("td")[3].textContent)
		banList[k] = myHITs[i].querySelectorAll("td")[2].textContent + " TITLE: " + myHITs[i].querySelectorAll("td")[3].textContent
		k++
		myWindow.close()
	}
	else if (banList[i-1] != undefined)
		console.log("Already hit " + banList[i-1].split(" TITLE: ")[0] + ", skipping...")
}