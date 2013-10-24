var urls = {
  0: [
    {"url": "http://timeking.reload.dk"}
  ],
  1: [
    {"url":"http://jenkins.reload.dk/plugin/jenkinswalldisplay/walldisplay.html?viewName=All&jenkinsUrl=http%3A%2F%2Fjenkins.reload.dk%2F"}
  ],
  2: [
    {"url": "https://reload.geckoboard.com/dashboard/470D0EB4CA98E67D/"}
  ],
  3: [
    {"url": "http://reload.dk/opensource#activity"}
  ]
};

var pointer = 0;
var delay = 120000;

function objectLength(obj) {
  var result = 0;
  for(var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
    // or Object.prototype.hasOwnProperty.call(obj, prop)
      result++;
    }
  }
  return result;
}

function changeUrl() { 
  
  items = objectLength(urls);
  url = urls[pointer][0].url;
  $('iframe#viewer').attr('src', url);

	// animate the progress bar
	$('#progress').stop(true,true);
	$('#progress').css('width','0px');
	//$('#progress').delay(1).animate({width: '0%'}, 99, 'swing'); 
  $('#progress').animate({width: '100%'}, delay, 'easeInSine');  
  
  pointer++;
  if(pointer >= items) {
    pointer = 0;
  }
  
  setTimeout(function(){
    changeUrl();
  }, delay);  
  
}

$(function(){
  changeUrl();
});
