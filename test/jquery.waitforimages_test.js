/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

    var IMG_ELEMENTS = 1;
    var DIV_ELEMENTS = 1;

    var getImageUrl = function() {
		return "about:";
    };

    var setup = {
        setup: function() {
			
			var i;
			
			this.container = $("<div />").appendTo("#qunit-fixture");

            for (i = 0; i < IMG_ELEMENTS; i++) {
                $("<img />", {
                    src: getImageUrl(),
                    alt: ""
                }).appendTo(this.container);
            }

            for (i = 0; i < DIV_ELEMENTS; i++) {
                $("<div />", {
                    css: {
                        background: "url(" + getImageUrl() + ")"
                    }
                }).appendTo(this.container);
            }
			
			this.container.css("background", "url(" + getImageUrl() + ")");
			
        },

        teardown: function() {
            this.container.empty();
        }
    };

    module("Argument checking", setup);

    test("Check Callbacks", function() {
		
		expect(4);
		
		var self = this;
		
        raises(function() {
			self.container.waitForImages("string");
        }, TypeError, "Finished Callback is function as argument");

        raises(function() {
            self.container.waitForImages($.noop, "string");
        }, TypeError, "Each callback is function as argument");

        raises(function() {
            self.container.waitForImages({
                finished: "string"
            });
        }, TypeError, "Finished callback is function as passed in object");

        raises(function() {
            self.container.waitForImages({
                each: "string"
            });
        }, TypeError, "Each callback is function as passed in object");

    });
	

    module("Img Elements", setup);

    asyncTest("Finished Callback", function() {
				
		expect(2);
		
		var self = this;

        this.container.waitForImages(function() {
            equal(this, self.container[0], "Assert `this` is set correctly.");		
            ok(true, "Assert callback called.");
            start();
        });

    });

    asyncTest("Each Callback", function() {
		
		expect(4 * IMG_ELEMENTS);	
		
        this.container.waitForImages($.noop, function(loaded, count, success) {
            ok($(this).is("img"), "Assert `this` is an `img` element.");
            ok(loaded <= count, "Assert loaded count is never larger than the count.");
            ok(typeof success == "boolean", "Assert `success` argument is a Boolean.");
            ok(true, "Assert callback called.");
            start();
        });

    }); 
	
    module("Img Elements & Elements with CSS Backgrounds", setup);

    asyncTest("Finished Callback", function() {
		
		expect(2);
		
		var self = this;

        this.container.waitForImages(function() {
            equal(this, self.container[0], "Assert `this` is set correctly.");
            ok(true, "Assert callback called.");
            start();
        }, $.noop, true);

    }); 

    asyncTest("Each Callback", function() {
		
		expect(4 * (IMG_ELEMENTS + DIV_ELEMENTS + 1) + 1);

		var self = this;

        this.container.waitForImages($.noop, function(loaded, count, success) {
			if (this === self.container[0]) {
				ok(true, "Assert container element is checked.");
			}
				
            ok($(this).filter("*").length, "Assert `this` is an element.");
            ok(loaded <= count, "Assert loaded count is never larger than the count.");
            ok(typeof success == "boolean", "Assert `success` argument is a Boolean.");
            ok(true, "Assert callback called.");
            start();
        }, true);

    });

}(jQuery));
