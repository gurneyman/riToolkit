$(document).ready(function() {


    // Grab the height of the menu and nudge it down
    var menuHeight = $('.main-menu').height();
    var $content = $('.main-content');
    $content.css('margin-top', (menuHeight) + 'px');

    // Place JavaScript code here...
    $('#summer-note').summernote({
        minHeight: 200, // set minimum height of editor
        maxHeight: 600
    });
});
