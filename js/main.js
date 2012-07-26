var urls = {
  0: [
    {"url": "http://timeking.reload.dk"}
  ],
  1: [
    {"url": "https://reload.geckoboard.com/dashboard/470D0EB4CA98E67D/"}
  ],
  2: [
    {"url": "http://visibletweets.com/#query=%23drupal%20OR%20%40reloaddk%20lang%3Ada&animation=2"}
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

/*  
  $(document).ready(function(){
      $('iframe#viewer').attr('src', current_url);    
  });
*/
/*
  for(var i = 0; i < urls.length; i++){
  
    // Goalies gets the moustache 
    if(data.ranking[i].group == "B-goalie") _item.find('.user_avatar').prepend($('<figure class="sir"></figure>'));
  
    // sets the ranking numbers and name
    //_item.find('.rank').addClass('bg'+i).html(i+1);
    _item.find('.rank').addClass(data.ranking[i].group).html(groups[data.ranking[i].group][0].icon);
    _item.find('h2').html(data.ranking[i].name+'.');
  
    // winner and loser get a custom text, everybody else the default text
    if(data.ranking[i].group == "B-goalie") _item.find('.hours').html('Like a boss!');
  //		  else if(i == data.ranking.length-1) _item.find('.hours').html('Only <span>'+data.ranking[i].hours_registered+' hours logged</span>. What a whimp!');
  //		  else _item.find('.hours').html('<span>'+data.ranking[i].hours_registered+' hours logged</span>.');
  
    // get a 'funny' sentence from the lines object
    _item.find('.desc').html(groups[data.ranking[i].group][0].text);

    // append it
    $('#user_ranking ul').append(_item);
  
  }
*/  
  
  
});
