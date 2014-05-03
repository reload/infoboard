var urls =
    [
        {
            "url": "http://timeking.reload.dk",
            "displayTime": 10,
            "preloadBefore": 3
        },
        {
            "url":"http://jenkins.reload.dk/plugin/jenkinswalldisplay/walldisplay.html?viewName=All&jenkinsUrl=http%3A%2F%2Fjenkins.reload.dk%2F",
            "displayTime": 15,
            "preloadBefore": 3
        },
        {
            "url": "https://reload.geckoboard.com/dashboard/470D0EB4CA98E67D/",
            "displayTime": 15,
            "preloadBefore": 2
        },
        {
            "url": "http://reload.dk/opensource#activity",
            "displayTime": 20,
            "preloadBefore": 5
        }
    ]
;

var frames = ['#viewer1', '#viewer2'];
var $frames = $('.viewerframe');
var activeFrame = 0;
var nextFrame = 0;
var pointer = 0;
var nextPointer = 0;
var $progressbar = $('#progress');

$(function(){
    $(frames[activeFrame]).attr('src', urls[nextPointer].url);
    showNext();
});

// Callback for showing
function showNext() {
    // animate the progress bar
    $progressbar.stop(true,true);
    $progressbar.removeClass('loading');
    $progressbar.css('width','0px');
    $progressbar.animate({width: '100%'}, urls[pointer].displayTime * 1000, 'easeInSine');

    // Switch to active frame
    //$frames.css('border', '5px solid grey');
    $frames.hide();
    //$(frames[activeFrame]).css('border', '5px solid red');
    $(frames[activeFrame]).show();
    // Change "next" frame
    nextFrame = (activeFrame + 1) % frames.length;
    nextPointer = (pointer + 1) % urls.length;
    // Schedule next load (this displaytime - next preload)
    setTimeout(function () {
        $progressbar.addClass('loading');
        $(frames[nextFrame]).attr('src', urls[nextPointer].url);
    }, (urls[pointer].displayTime - urls[nextPointer].preloadBefore) * 1000);
    // Schedule next view (this displaytime)
    setTimeout(showNext, urls[pointer].displayTime * 1000);

    pointer = nextPointer;
    activeFrame = nextFrame;
}
