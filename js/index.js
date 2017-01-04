window.onload = function() {
  var button = document.getElementById('add_button');
  button.onclick = setURL;
  var search = document.getElementById('note_text');
};

// This creates the  JSON URL based on search value //
function setURL() {
  var value = document.getElementById("note_text").value;
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + value + "&limit=10&namespace=0&format=json&callback=getWikiData";
  var button = document.getElementById("submit");
  requestJSONP(url);
}


// Receives URL. Adds to <head> thus invoking 'getWikiData' callback function //
function requestJSONP(url) {
  var script = document.createElement('script');
  script.src = url
  script.id = 'json';
  
  // insert script tag into the DOM (append to <head>)
  var head = document.getElementsByTagName('head')[0];
  var oldScript = document.getElementById('json');
  if (oldScript == null) {
    head.appendChild(script);
  }
      else {
        head.replaceChild(script,oldScript);
           }
}


// Inactive. Removing stickies if there's content there. //
function clearData() {
  var stickies = document.getElementById('stickies');
while (stickies.firstChild) {
    stickies.removeChild(stickies.firstChild);
}
}

// Updating the DOM // 
function getWikiData(data) {
  var sticky = document.getElementById('stickies');
  
  // If there are results, remove all of them until there are none left //
  while (sticky.firstChild) {
    sticky.removeChild(sticky.firstChild);
  }
  // Then loop through the array and return the new results //
    if (data[1].length == 0) {
      console.log('no results');
      sticky.innerHTML = 'No results';
    }
  else {
      for (i = 0; i < data[1].length - 1; i++) {
      var p = document.createElement('p');  // create a p
      p.id = "item";
      p.setAttribute("class",'searchresult'); // setting the attribute //
      var term = data[1][i]; // grabing the search term
      var description = data[2][i]; // the description 
      var URL = data[3][i]; // the URL
      // term.id = 'title';
      // description.id = 'description';
      // URL.id = 'url'
      p.innerHTML ="<strong>" + term + "</strong><br>" +  description + "<br>" + "<a href=\"" + URL + "\">" + URL + "</a>";
      sticky.appendChild(p);
          }
      }
}

// experimenting with some animations //
function animateIt(p, sticky) {
var L = p.animate([  // keyframes
  { transform: 'translateY(10px)' }, 
  { transform: 'translateY(-150px)' }
], { 
  // timing options
  duration: 1000,
  // iterations: Infinity
});
 sticky.appendChild(p);
}

//get data and do something with it
// function getWikiData(data) {
//   var search1 = data[1][0];
//   // console.log(search1);
//