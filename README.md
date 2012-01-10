#waitForImages 1.4#

Copyright (c) 2011 Alex Dickson [@alexdickson](http://twitter.com/alexdickson)

Licensed under the MIT licenses.

[http://www.alexanderdickson.com](http://www.alexanderdickson.com)

[Donate!](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=6DLJ39QSQWDGE)

##Overview##

Provides useful callbacks once descendent images have loaded.

waitForImages also supports images references in CSS, such as `background-image`.

It can be useful when WebKit incorrectly reports element dimensions/offsets on document ready, because it has not calculated their descendent `img` dimensions yet.

##Thanks##

[Matt Scharley](https://github.com/mscharley).

##Usage##

###Standard###

Just provide a callback function and it will be called once all descendent images have loaded.

    $('selector').waitForImages(function() {
   
        alert('All images are loaded.');
        $(this).slideUp();
    });

`this` is a reference to the element that `waitForImages()` is called on.

###Advanced###

You can pass a second function as a callback that will be called for each image that is loaded, with some information passed as arguments.

    $('selector').waitForImages(function() {

        alert('All images have loaded.');

    }, function(loaded, count, success) {

       alert(loaded + ' of ' + count + ' images has ' + (success ? 'loaded' : 'failed to load') +  '.');
       $(this).addClass('loaded');

    });


You can also set the third argument to `true` if you'd like the plugin to iterate over all elements, checking for images referenced in the CSS (by default, it looks at the `background-image`, `listStyleImage`, `borderImage` and `borderCornerImage` properties). If it finds any, they will be treated as an image and loaded.

The callback will be called on the successful **and** unsuccessful loading of the image. Check the third argument to determine the success of the image load. It will be `true` if the image loaded successfully.

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

    $.waitForImages.hasImgProperties = ['backgroundImage'];

waitForImages also exposes a custom selector, `:uncached`, which when used in conjunction with the `img` selector, allows you to select `img` elements that are not cached already by the browser.

    $('img:uncached').attr('title', 'Loading Image');

##Feedback##

Please use the [Issues](https://github.com/alexanderdickson/waitForImages/issues) for any bugs, feature requests, etc.

