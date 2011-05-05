#waitForImages 1.2#

Copyright (c) 2011 Alex Dickson

Licensed under the MIT licenses.

[http://www.alexanderdickson.com](http://www.alexanderdickson.com)

##Overview##

Provides usefull callbacks once descendent images have loaded.

waitForImages 1.2 now supports images references in CSS.

It can be useful when WebKit incorrectly reports element dimensions on document ready, because it has not calculated their descendent img dimensions yet.


##Usage##

###Standard###

Just provide a callback function and it will be called once all descendent images have loaded.

    $('selector').waitForImages(function() {
   
        alert('All images are loaded.');

    });

###Advanced###

You can pass a second function as a callback. It will be called for each image that is loaded, with some information passed as arguments.

    $('selector').waitForImages(function() {

        alert('All images are loaded.');

    }, function(loaded, count) {

       alert(loaded + ' of ' + count + ' images have loaded.');
       $(this).addClass('loaded');

    });

You can also set the third argument to true if you'd like the plugin to iterate over all elements, checking for images referenced in the CSS. If it finds any, they will be treated as an image and loaded.

Alternatively, you can pass an object literal to the plugin, instead of the arguments individually.

    $('selector').waitForImages({
        finished: function() {
            ...
        },
        each: function() {
           ...
        },
        waitForAll: true
    });

You may also set the CSS properties that possibly contain image references yourself. Just assign an array of properties to the plugin.

    $().waitForImages.hasImgProperties = ['backgroundImage'];
