chrome.tabs.onUpdated.addListener(function(tabId, props) {
	refreshTab(tabId);
});

// String.startsWith(str)
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

// We call it when tab is updated or link clicked
function refreshTab(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    if (!tab.url.startsWith("chrome") && !tab.url.startsWith("file") && !tab.url.startsWith("view-source:"))
    {
      var url = getLocation(tab.url);
      updateURL(url.hostname);
      updateURL(tab.url);  	
  	  chrome.browserAction.setBadgeText({text: Math.floor(parseInt(localStorage[url.hostname]) / 2) + "", tabId: tabId});
    }
  });
}

// Increase count of views for URL
function updateURL(url)
{
    if (localStorage[url] === undefined){
      localStorage[url] = "0";
    }
    if (isNaN(parseInt(localStorage[url]))){
      localStorage[url] = "0";
    }
    localStorage[url] = (parseInt(localStorage[url]) + 1) + "";
}