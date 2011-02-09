/*
 * waitForImages 1.0
 * -----------------
 * Provides a callback when all images have loaded in your given selector.
 * http://www.alexanderdickson.com/
 *
 *
 * Copyright (c) 2011 Alex Dickson
 * Licensed under the MIT licenses.
 * See website for more info.
 *
 */

;(function($) {
    $.fn.waitForImages = function(callback) {
        if (typeof callback != 'function') {
            throw 'Not a valid callback';
        };

        var objs = $(this),
            allImgs = objs.find('img'),
            allImgsLength = allImgs.length,
            allImgsLoaded = 0;
        
        if (allImgsLength == 0) {
            callback.call();
        };

        return objs.each(function() {
            var obj = $(this),
                imgs = obj.find('img');

            if (imgs.length == 0) {
                return true;
            };

            imgs.each(function() {
                var image = new Image();
                image.onload = function() {
                    allImgsLoaded++;
                    if (allImgsLoaded == allImgsLength) {
                        callback.call();
                        return false;
                    };
                };
                image.src = this.src;
            });
        });
    };
})(jQuery);