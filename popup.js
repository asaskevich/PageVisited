var myDiv = document.getElementById("popup");

function preffixOfString(text) {
	if (text.length > 15) return text.substr(0,15) + "..."
	else return text;
}

var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

function showStat(){
	chrome.tabs.create({url:'options.html'});
}

// Set information inside popup window
chrome.tabs.getSelected(null, function(tab){
	var host = getLocation(tab.url).hostname;
	myDiv.innerHTML = "<center><h2>" + preffixOfString(tab.title) + 
					  "</h2></center><center>Сайт посещен: " + Math.floor(parseInt(localStorage[host]) / 2) + 
					  " раз(a)</center><center>Страница посещена: " + Math.floor(parseInt(localStorage[tab.url]) / 2) + 
					  " раз(a)</center>";
});