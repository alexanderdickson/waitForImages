#waitForImages#

Copyright (c) 2011-2016 Alexander Dickson [@alexdickson](http://twitter.com/alexdickson)

Licensed under the [MIT licenses](https://raw.github.com/alexanderdickson/waitForImages/master/LICENSE-MIT).

[http://alexanderdickson.com](http://alexanderdickson.com)

[![Donate](http://www.pledgie.com/campaigns/18572.png?skin_name=chrome)](http://www.pledgie.com/campaigns/18572)


[![Build Status](https://secure.travis-ci.org/alexanderdickson/waitForImages.png)](http://travis-ci.org/alexanderdickson/waitForImages)

##Overview##

Provides useful callbacks once descendant images have loaded.

waitForImages also supports both images referenced in CSS, such as the `background-image` property, and images referenced in element attributes such as `srcset`. Images referenced in attributes can also be a comma-separated list of images.

It can be useful when WebKit incorrectly reports element dimensions/offsets on document ready, because it has not calculated their descendant `img` dimensions yet.

Supports all browsers you probably care about.

##Get it##

You can either grab the source yourself...

- [Production (minified)](https://raw.github.com/alexanderdickson/waitForImages/master/dist/jquery.waitforimages.min.js)
- [Development (unminified)](https://raw.github.com/alexanderdickson/waitForImages/master/dist/jquery.waitforimages.js)

...or you can use a hosted version...

- [Hosted on CDNJS (minified)](http://cdnjs.cloudflare.com/ajax/libs/jquery.waitforimages/1.5.0/jquery.waitforimages.min.js)

Alternatively, you can install with [`bower`](http://bower.io/).

```bash
bower install waitForImages
```

Of course, these need to be loaded after `jQuery` is made available. The current version should be supported by at least jQuery 1.8, or perhaps earlier. If you find incompatibility issues, please check out a previous tagged version.

##Usage##

There are two ways to use waitForImages: with a standard callback system (previously the only API) or receiving a promise.

###Standard###

Just provide a callback function and it will be called once all descendant images have loaded.

```javascript
$('selector').waitForImages(function() {
    // All descendant images have loaded, now slide up.
    $(this).slideUp();
});
```

You can also use the jQuery promise API.

```javascript
$('selector').waitForImages().done(function() {
    // All descendant images have loaded, now slide up.
    $(this).slideUp();
});
```

In the callbacks, `this` is a reference to the collection that `waitForImages()` was called on.

###Advanced###

You can pass a second function as a callback that will be called for each image that is loaded, with some information passed as arguments.

```javascript
$('selector').waitForImages(function() {
    alert('All images have loaded.');
}, function(loaded, count, success) {
   alert(loaded + ' of ' + count + ' images has ' + (success ? 'loaded' : 'failed to load') +  '.');
   $(this).addClass('loaded');
});
```

Using the jQuery promises API, you can then use the `progress()` method to know when an individual image has been loaded.

```javascript
$('selector').waitForImages().progress(function(loaded, count, success) {
   alert(loaded + ' of ' + count + ' images has ' + (success ? 'loaded' : 'failed to load') +  '.');
   $(this).addClass('loaded');
});
```

You can also set the third argument to `true` if you'd like the plugin to iterate over the collection and all descendent elements, checking for images referenced in the CSS (by default, it looks at the `background-image`, `list-style-image`, `border-image`, `border-corner-image` and `cursor` properties). If it finds any, they will be treated as a descendant image.

The callback will be called on the successful **and** unsuccessful loading of the image. Check the third argument to determine the success of the image load. It will be `true` if the image loaded successfully.

If you want to skip the first argument, pass `$.noop` or alternatively, pass an object literal to the plugin, instead of the arguments individually.

```javascript
$('selector').waitForImages({
    finished: function() {
        // ...
    },
    each: function() {
       // ...
    },
    waitForAll: true
});
```

To use this with the promise API, simply pass one argument, which is `waitForAll`.

```javascript
$('selector').waitForImages(true).done(function() {
    // ...
});
```

You may also set the CSS properties that possibly contain image references yourself. Just assign an array of properties to the plugin.

```javascript
$.waitForImages.hasImgProperties = ['backgroundImage'];
```

waitForImages also exposes two custom selectors, `img:has-src` and `img:uncached`, (both used in conjunction with the `img` selector), which allow you to select `img` elements with a valid `src` attribute or that are not already cached already by the browser, respectively.

```javascript
$('img').not(':has-src').remove();
$('img:uncached').attr('title', 'Loading Image');
```

##Feedback##

Please use the [Issues](https://github.com/alexanderdickson/waitForImages/issues) for any bugs, feature requests, etc.

If you're having problems using the plugin, [ask a question on Stack Overflow](http://stackoverflow.com/questions/tagged/waitforimages).
