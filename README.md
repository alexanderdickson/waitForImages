#waitForImages 1.1.1#

Copyright (c) 2011 Alex Dickson

Licensed under the MIT licenses.

[http://www.alexanderdickson.com](http://www.alexanderdickson.com)

##Overview##

Provides usefull callbacks once descendent images have loaded.

It can be useful when WebKit incorrectly reports element dimensions on document ready, because it has not calculated their descendent img dimensions yet.


##Usage##

###Standard###

Just provide a callback function and it will be called once all descendent images have loaded.

    $('selector').waitForImages(function() {
   
        alert('All images are loaded.');

    });

###Advanced###

You can pass a second function as a callback. It will be called for each image that is loaded, with some information.

    $('selector').waitForImages(function() {

        alert('All images are loaded.');

    }, function(loaded, count) {

       alert(loaded + ' of ' + count + ' images have loaded.');
       $(this).addClass('loaded');

    });
