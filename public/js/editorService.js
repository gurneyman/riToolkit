var editorService = (function() {
    var helloButtonHtml = '<input class="inputfile" type="file" name="file" id="file" role="button" style="display:none"><label class="fa fa-folder-open" for="file"> Open</label>';
    var HelloButton = function(context) {
        var ui = $.summernote.ui;

        // create button
        var button = ui.button({
            contents: helloButtonHtml,
            tooltip: 'Open File',
            click: handleFileSelect
        });

        return button.render(); // return button as jquery object 
    }

    // Methods
    function displayResult(result) {
        if (result.value) {
            console.log(result.value);
            // Probably need to do some processing here
            // Swap ndashes to mdashes
            // Convert links and make them open in new tab
            // Upload images to ftp and convert src to proper url
            $('#summer-note').summernote('code', result.value);
        } else {
            $('#summer-note').summernote('code', 'Didn\'t work...');
        }

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
    }

    function readFileInputEventAsArrayBuffer(event, callback) {
        // Set up event handlers on init?
        if (event.target.files && event.target.files.length > 0) {
            console.log("files", event.target.files, "Target", event.target, typeof event.target.files);
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
