/*=========================================================================================
    File Name: dropzone.js
    Description: dropzone
    --------------------------------------------------------------------------------------
    Item Name: Stack - Responsive Admin Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

Dropzone.options.dpzSingleFile = {
    paramName: "file", // The name that will be used to transfer the file
    maxFiles: 1,
    acceptedFiles: 'video/*',
    init: function() {
        this.on("maxfilesexceeded", function(file) {
            this.removeAllFiles();
            this.addFile(file);
        });
    },
    clickable: true
};

/********************************************
*               Multiple Files              *
********************************************/
Dropzone.options.dpzMultipleFiles = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 0.5, // MB
    clickable: true
}

var z_page="";
/********************************************************
*               Use Button To Select Files              *
********************************************************/
//if(z_page=="vlog"){
    new Dropzone(document.body, { // Make the whole body a dropzone
        url: "http://localhost/misterpet/public/vlog/up_file", // Set the url
        previewsContainer: "#dpz-single-file", // Define the container to display the previews
        acceptedFiles: 'video/*',
        maxFiles: 2,
        clickable: true,
        init: function() {
            this.on("maxfilesexceeded", function(file) {
                this.removeAllFiles();
                this.addFile(file);

            }),
                this.on("success", function(file, serverResponse) {
                    // Called after the file successfully uploaded.
                    videodata=new Array();
                    videodata=serverResponse.split(',');
                    $('input[name=vedio_id]').val(videodata[0]);
                    $('input[name=url]').val(videodata[1]);
//alert(serverResponse);
// console.log(serverResponse);
                    // If the image is already a thumbnail:
                    // this.emit('thumbnail', file, serverResponse.imageUrl);

                    // If it needs resizing:
                    // this.createThumbnailFromUrl(file, serverResponse.imageUrl);
                });

        },
    });
//}


/****************************************************************
*               Limit File Size and No. Of Files                *
****************************************************************/
Dropzone.options.dpzFileLimits = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 0.5, // MB
    maxFiles: 5,
    maxThumbnailFilesize: 1, // MB
}


/********************************************
*               Accepted Files              *
********************************************/
Dropzone.options.dpAcceptFiles = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 1, // MB
    acceptedFiles: 'image/*'
}


/************************************************
*               Remove Thumbnail                *
************************************************/
Dropzone.options.dpzRemoveThumb = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 1, // MB
    addRemoveLinks: true,
    dictRemoveFile: " Trash"
}

/*****************************************************
*               Remove All Thumbnails                *
*****************************************************/
Dropzone.options.dpzRemoveAllThumb = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 1, // MB
    init: function() {

        // Using a closure.
        var _this = this;

        // Setup the observer for the button.
        $("#clear-dropzone").on("click", function() {
            // Using "_this" here, because "this" doesn't point to the dropzone anymore
            _this.removeAllFiles();
            // If you want to cancel uploads as well, you
            // could also call _this.removeAllFiles(true);
        });
    }
}
