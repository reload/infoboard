(function($){
    var urls;
    var frames = ['#viewer1', '#viewer2'];
    var $frames = $('.viewerframe');
    var activeFrame = 0;
    var nextFrame = 0;
    var pointer = 0;
    var nextPointer = 0;
    var $progressbar = $('#progress');
    var config = {};

    <!-- Load data from YAML files -->
    // Get data
    $.get('config.yml', function(data) {
        config = jsyaml.load(data);
        var hash = window.location.hash.replace('#', '');
        if (config.boards[hash] !== undefined) {
            urls = config.boards[hash].show;
            $(frames[activeFrame]).attr('src', urls[nextPointer].url);
            showNext();
        }
        else {
            alert('Config not found');
        }
    });

    // Callback for showing
    function showNext() {
        // animate the progress bar
        $progressbar.stop(true,true);
        $progressbar.removeClass('loading');
        $progressbar.css('width','0px');
        var displayTime = (urls[pointer].displayTime !== undefined) ? urls[pointer].displayTime : config.defaults.displayTime;
        $progressbar.animate({width: '100%'}, displayTime * 1000, 'easeInSine');

        // Switch to active frame
        $frames.hide();
        $(frames[activeFrame]).show();
        // Change "next" frame
        nextFrame = (activeFrame + 1) % frames.length;
        nextPointer = (pointer + 1) % urls.length;
        // Schedule next load (this displaytime - next preload)
        var preloadBefore = (urls[nextPointer].preloadBefore !== undefined) ? urls[nextPointer].preloadBefore : config.defaults.preloadBefore;

        setTimeout(function () {
            $progressbar.addClass('loading');
            $(frames[nextFrame]).attr('src', urls[nextPointer].url);
        }, (displayTime - preloadBefore) * 1000);
        // Schedule next view (this displaytime)
        setTimeout(showNext, displayTime * 1000);

        pointer = nextPointer;
        activeFrame = nextFrame;
    }

})(jQuery);
