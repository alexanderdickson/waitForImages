#waitForImages 1.4.2#

Copyright (c) 2011-2013 Alex Dickson [@alexdickson](http://twitter.com/alexdickson)

Licensed under the [MIT licenses](https://raw.github.com/alexanderdickson/waitForImages/master/LICENSE-MIT).

[http://alexanderdickson.com](http://alexanderdickson.com)

[![Donate](http://www.pledgie.com/campaigns/18572.png?skin_name=chrome)](http://www.pledgie.com/campaigns/18572)


[![Build Status](https://secure.travis-ci.org/alexanderdickson/waitForImages.png)](http://travis-ci.org/alexanderdickson/waitForImages)

##Overview##

Provides useful callbacks once descendant images have loaded.

waitForImages also supports images referenced in CSS, such as the `background-image` property.

It can be useful when WebKit incorrectly reports element dimensions/offsets on document ready, because it has not calculated their descendant `img` dimensions yet.

##Download##

- [Production (minified)](https://raw.github.com/alexanderdickson/waitForImages/master/dist/jquery.waitforimages.min.js)
- [Development (unminified)](https://raw.github.com/alexanderdickson/waitForImages/master/dist/jquery.waitforimages.js)


##Usage##

###Standard###

Just provide a callback function and it will be called once all descendent images have loaded.

    $('selector').waitForImages(function() {
		// All descendant images have loaded, now slide up.
        $(this).slideUp();	
    });

`this` is a reference to the collection that `waitForImages()` was called on.

###Advanced###

You can pass a second function as a callback that will be called for each image that is loaded, with some information passed as arguments.

    $('selector').waitForImages(function() {
        alert('All images have loaded.');
    }, function(loaded, count, success) {
       alert(loaded + ' of ' + count + ' images has ' + (success ? 'loaded' : 'failed to load') +  '.');
       $(this).addClass('loaded');
    });
	
You can also set the third argument to `true` if you'd like the plugin to iterate over the colleciton and all descendent elements, checking for images referenced in the CSS (by default, it looks at the `background-image`, `list-style-image`, `border-image` and `border-corner-image` properties). If it finds any, they will be treated as a descendant image.

The callback will be called on the successful **and** unsuccessful loading of the image. Check the third argument to determine the success of the image load. It will be `true` if the image loaded successfully.

If you want to skip the first argument, pass `$.noop` or alternatively, pass an object literal to the plugin, instead of the arguments individually.

    $('selector').waitForImages({
        finished: function() {
            // ...
        },
        each: function() {
           // ...
        },
        waitForAll: true
    });

You may also set the CSS properties that possibly contain image references yourself. Just assign an array of properties to the plugin.

    $.waitForImages.hasImgProperties = ['backgroundImage'];

waitForImages also exposes a custom selector, `:uncached`, which when used in conjunction with the `img` selector, allows you to select `img` elements that are not cached already by the browser.

    $('img:uncached').attr('title', 'Loading Image');

##Thanks##

- [Matt Scharley](https://github.com/mscharley)
- [Astletron](https://github.com/astletron)
- [Zerkms](https://github.com/zerkms)


##Feedback##

Please use the [Issues](https://github.com/alexanderdickson/waitForImages/issues) for any bugs, feature requests, etc.

