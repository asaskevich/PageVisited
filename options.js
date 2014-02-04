// boolean String.startsWith(String anotherString)
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

// Loading list of visited web-sites from local storage
var keys = [];
for (var key in localStorage)
{
	if (!key.startsWith("http") && !key.startsWith("chrome") && !key.startsWith("file") && !key.startsWith("view-source:")){
		keys.push(key);
	}
}

// Return first 50's symbols of string
var preffixOfString = function (text) { if (text.length > 50)	{ return text.substr(0,50) + "..." } else return text; };
// Compare two keys in list (used in q-sort)
var compare = function (a,b)
{
	if (parseFloat(localStorage[keys[a]]) > parseFloat(localStorage[keys[b]])) return 1;
	if (parseFloat(localStorage[keys[a]]) < parseFloat(localStorage[keys[b]])) return -1;
	return 0;
};
// QuickSort
// We sorting keys from greates to smallest
var qsort = function (l, r)  {
    var i = l,
        j = r,
        x = (l + r) >> 1;
    while(i <= j) {
        while(compare(i, x) == 1) i++;
        while(compare(j, x) == -1) j--;
        if(i <= j) {
        	var temp = keys[i];
        	keys[i] = keys[j]; 
        	keys[j] = temp;
        	i++; j--;
        }
    };
    if(l < j) qsort(l, j);
    if(i < r) qsort(i, r);
};
 
qsort(0, keys.length - 1);

// Writing table
var table = document.getElementById("table");
var inner = "<table>";
var flag = 0;
for (var i = 0; i < keys.length; i ++)
{
	var key = keys[i];
	if (!key.startsWith("http") && !key.startsWith("chrome")){
		var row = "<tr class='" + (flag % 2 == 0 ? "even" : "odd") + "'>" +
				  "<td style='width:90%'>" + preffixOfString(key) + "</td>" + 
				  "<td style='width:5%'>" + Math.floor(parseInt(localStorage[key]) / 2) + "</td></tr>";
		inner += row;
	}
	flag ++;
}
inner += "</table>";
table.innerHTML = inner;