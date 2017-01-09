$(document).ready(function() {


    // Grab the height of the menu and nudge it down
    var menuHeight = $('.main-menu').height();
    var $content = $('.main-content');
    $content.css('margin-top', menuHeight + 'px');

    editorService.init('#summer-note', {
        minHeight: 200, // set minimum height of editor
        maxHeight: 400,
        toolbar: [
            ['mybutton', ['hello']],
            ['codeview', ['codeview']]
        ],

        buttons: {
            hello: editorService.HelloButton
        }
    });

    // Setup event handler for file opening
    //$(".inputfile").change(editorService.handleFileSelect);
});
