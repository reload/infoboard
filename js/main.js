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
    {"url": "http://twitterfontana.com/fountain.html?embed=true&twitter_search=%40reloaddk+OR+%23drupal+lang%3Ada&effect=Slide&message_animate_interval=6000&font_face=Helvetica%2C+'Helvetica+Neue'%2C+Arial%2C+sans-serif&text_color=%233f3f3f&special_color=%23EFA422&bg_color=%2398be31&box_bg=%23f9f8f7&utm_source=site&utm_medium=embed&utm_campaign=twitterfontana"}
  ],
  4: [
    {"url": "http://reload.dk/opensource#activity"}
  ],
  5: [
    {"url": "https://reload.geckoboard.com/dashboard/87CCED14EB760EEE/"}
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
