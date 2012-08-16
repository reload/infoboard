var urls = {
  0: [
    {"url": "http://timeking.reload.dk"}
  ],
  1: [
    {"url": "https://reload.geckoboard.com/dashboard/470D0EB4CA98E67D/"}
  ],
  2: [
    {"url": "http://visibletweets.com/#query=%23drupal%20OR%20%40reloaddk%20lang%3Ada&animation=2"}
  ],
  3: [
    {"url": "http://reload.dk/opensource#activity"}
  ],
  4: [
    {"url": "http://visibletweets.com/#query=from%3Arasmusluckow%20OR%20from%3Akasperg%20OR%20from%3Axendk%20OR%20from%3Aramlev%20OR%20from%3Atwomasc%20OR%20from%3Ahalfgirl%20OR%20from%3Aarnested%20OR%20from%3Adanquah%20OR%20from%3Atrogels%20OR%20from%3Amartinelvar%20OR%20from%3Ahamderhallas%20OR%20from%3Apaludanent%20OR%20from%3Areloaddk&animation=1"}
  ]
};

var items = 3;
var pointer = 0;
var delay = 120000;

function changeUrl() { 
  
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
