#waitForImages 1.0#

Copyright (c) 2011 Alex Dickson
Licensed under the MIT licenses.

http://www.alexanderdickson.com/

##Overview##

Provides a callback when all images have loaded in your given selector.

It can be useful when WebKit incorrectly reports element dimensions on document ready, because it has not calculated their descenendent img dimensions yet.


##Usage##

$('selector').waitForImages(function() {

    alert('Images have loaded');

});

