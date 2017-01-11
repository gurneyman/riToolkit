var editorService = (function() {
    var helloButtonHtml = '<input class="inputfile" type="file" name="file" id="file" role="button" style="display:none"><label class="fa fa-folder-open" for="file"> Open</label>';
    var HelloButton = function(context) {
        var ui = $.summernote.ui;

        // create button
        var button = ui.button({
            contents: helloButtonHtml,
            tooltip: 'Open File',
            click: function(event) {
                if (event.target.tagName === "BUTTON") {
                    $(event.target).find('.inputfile').click();
                }
                event.stopPropagation(); // We set the click event on the file input during init
            }
        });

        return button.render(); // return button as jquery object 
    }

    // Methods
    function displayResult(result) {
        if (result.value) {
            // Probably need to do some processing here
            // Swap ndashes to mdashes
            // Convert links and make them open in new tab
            // Upload images to ftp and convert src to proper url
            $('#summer-note').summernote('code', processHtml(result.value));

        } else {
            $('#summer-note').summernote('code', 'Didn\'t work...');
        }

        return $('.note-editor img').each(function() {
            $(this).on('click', function() {
                console.log('this');
            });
        });
    }

    function handleFileSelect(event) {
        readFileInputEventAsArrayBuffer(event, function(arrayBuffer) {
            mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                .then(displayResult)
                .done();
        });
    }

    function init(selector, options) {
        // set up summer note
        $(selector).summernote(options);
        $(selector).on('summernote.change', function(we, contents, $editable) {
            // Should be done with classes
            $('.note-editable img').each(function() {
                if ($(this).css('float') === 'left') {
                    $(this).css('margin-right', 15 + "px");
                    $(this).css('margin-left', 0);
                } else if ($(this).css('float') === 'right') {
                    $(this).css('margin-left', 15 + "px");
                    $(this).css('margin-right', 0);
                } else {
                    $(this).css('margin-right', 0);
                    $(this).css('margin-left', 0);
                    $(this).css('display', 'block');
                }
            });
        });


        return initEvents();
    }

    function initEvents() {
        $(".inputfile").on("change", handleFileSelect);
    }

    function processHtml(html) {
        // Remove extra space and put make sure p tags are on seperate lines
        var result = html.replace(/\s+/g, " ").replace(/(<p>)+/g, "\n<p>");
        return result;
    }

    function readFileInputEventAsArrayBuffer(event, callback) {
        // Set up event handlers on init?
        if (event.target.files && event.target.files.length > 0) {
            var file = event.target.files[0];

            var reader = new FileReader();

            reader.onload = function(loadEvent) {
                var arrayBuffer = loadEvent.target.result;
                callback(arrayBuffer);
            };

            reader.readAsArrayBuffer(file);
        }
    }

    return {
        handleFileSelect: handleFileSelect,
        HelloButton: HelloButton,
        init: init,
    };
})();
