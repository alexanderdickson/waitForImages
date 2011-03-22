/*
 * waitForImages 1.1.2
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
    $.fn.waitForImages = function(finishedCallback, eachCallback) {

        eachCallback = eachCallback || function() {};

        if ( ! $.isFunction(finishedCallback) ||  ! $.isFunction(eachCallback)) {
            throw {
                name: 'invalid_callback',
                message: 'An invalid callback was supplied.'
            };
        };

        var objs = $(this),
            allImgs = objs.find('img'),
            allImgsLength = allImgs.length,
            allImgsLoaded = 0;

        if (allImgsLength == 0) {
            finishedCallback.call(this);
        };

        return objs.each(function() {
            var obj = $(this),
                imgs = obj.find('img');

            if (imgs.length == 0) {
                return true;
            };

            imgs.each(function() {
                var image = new Image,
                    imgElement = this;

                image.onload = function() {
                    allImgsLoaded++;
                    eachCallback.call(imgElement, allImgsLoaded, allImgsLength);
                    if (allImgsLoaded == allImgsLength) {
                        finishedCallback.call(obj[0]);
                        return false;
                    };
                };

                image.src = this.src;
            });
        });
    };
})(jQuery);