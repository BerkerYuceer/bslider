/*
* Copyright (c) 2013 BERKER YUCEER
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software
* and associated documentation files (the "Software"), 
* to deal in the Software without restriction, 
* including without limitation the rights to 
* use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom 
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all 
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
* IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
* OTHER DEALINGS IN THE SOFTWARE.
*/
(function ($, undefined) {
    $.widget("ui.bslider", {
        options: {
            width: 0,
            height: 0,
            interval: 5000,
            count: 0,
            speed: 'fast',
            urlLeft: 'http://img842.imageshack.us/img842/613/arrowleftr.png',
            urlRight: 'http://img7.imageshack.us/img7/4593/arrowrightq.png',
            autoSlide: true,
            animation: 'slide'
        },
        _create: function () {
            var width = this.options.width || this.element.width(),
                height = this.options.height || this.element.height(),
                interval = this.options.interval,
                count = this.options.count || this.element.children('img').length,
                speed = this.options.speed,
                urlLeft = this.options.urlLeft,
                urlRight = this.options.urlRight,
                autoSlide = this.options.autoSlide,
                animation = this.options.animation,
                img = new Array([]),
                imgLocation = new Array([]),
                buttonWidth = 45,
                here = 0,
                left = 0;
            // Cache Images and calgulate locations first
            for (i = 0; i < count; i++) {
                // Cache Images
                var elem = this.element.children('img').eq(i);
                img[i] = '<img src="' + elem.attr('src') + '" alt="' + elem.attr('alt') + '" />';
                // Calgulate locations for a proper slide effect
                imgLocation[i] = left;
                left = left - width;
            }
            this.element.empty(); // Clean
            // Slider
            var obj = this.element.addClass("ui-bslider").css({
                padding: 0,
                width: width,
                height: height,
                /* Thanks to Seain Malkin 
                selection disabled */
                'user-select': 'none',
                '-o-user-select': 'none',
                '-ms-user-select': 'none',
                '-moz-user-select': 'none',
                '-khtml-user-select': 'none',
                '-webkit-user-select': 'none',
                '-webkit-touch-callout': 'none'
            });
            // Append Image container
            var mid = $('<div class="ui-bslider-mid"></div>').appendTo(obj).css({
                margin: 0,
                padding: 0,
                width: width,
                height: height,
                overflow: 'hidden',
                position: 'absolute',
                display: 'inline-block',
                zIndex: 0
            });
            $('<div class="ui-bslider-container">' + img.join('').toString() + '</div>').appendTo(mid).css({
                margin: 0,
                padding: 0,
                width: width * count,
                height: height,
                position: 'relative',
                display: 'inline-block',
                zIndex: -1
            }).children('img').css({
                float: 'left',
                clear: 'none',
                width: width,
                height: height,
                /* Thanks to Seain Malkin 
                selection disabled */
                'user-select': 'none',
                '-o-user-select': 'none',
                '-ms-user-select': 'none',
                '-moz-user-select': 'none',
                '-khtml-user-select': 'none',
                '-webkit-user-select': 'none',
                '-webkit-touch-callout': 'none'
            });
            // Append Left button
            $('<div class="ui-bslider-left"></div>').insertBefore(mid).css({
                float: 'left',
                clear: 'none',
                margin: 0,
                padding: 0,
                opacity: 0,
                width: buttonWidth,
                height: height,
                background: 'url(' + urlLeft + ') no-repeat left center',
                cursor: 'pointer',
                display: 'block',
                position: 'absolute',
                zIndex: 1
            }).hover(function () {
                $(this).animate({ opacity: 0.6 }, 'fast');
            }).mouseleave(function () {
                $(this).animate({ opacity: 0 }, 'fast');
            }).click(function (e) {
                e.preventDefault();
                if (animation === 'fade') {
                    $('.ui-bslider-container').fadeOut(speed, function () {
                        if (here > 0) { here--; } else { here = count - 1; }
                        $('.ui-bslider-container').css({ left: imgLocation[here] });
                        $('.ui-bslider-container').fadeIn(speed);
                    });
                } else {
                    $('.ui-bslider-container').animate({ left: imgLocation[here] }, speed);
                }
            });
            // Append Right button
            $('<div class="ui-bslider-right"></div>').insertBefore(mid).css({
                float: 'right',
                clear: 'none',
                margin: 0,
                padding: 0,
                opacity: 0,
                width: buttonWidth,
                height: height,
                background: 'url(' + urlRight + ') no-repeat right center',
                cursor: 'pointer',
                display: 'inline',
                position: 'relative',
                zIndex: 1
            }).hover(function () {
                $(this).animate({ opacity: 0.6 }, 'fast');
            }).mouseleave(function () {
                $(this).animate({ opacity: 0 }, 'fast');
            }).click(function (e) {
                e.preventDefault();
                if (animation === 'fade') {
                    $('.ui-bslider-container').fadeOut(speed, function () {
                        if (here < count - 1) { here++; } else { here = 0; }
                        $('.ui-bslider-container').css({ left: imgLocation[here] });
                        $('.ui-bslider-container').fadeIn(speed);
                    });
                } else {
                    $('.ui-bslider-container').animate({ left: imgLocation[here] }, speed);
                }
            });
            function doIt() { obj.find('.ui-bslider-right').click(); }
            if (autoSlide) {
                // Auto slide behavior
                var ints = setInterval(doIt, interval);
            }
            // Allow chain
            return obj;
        },
        _destroy: function () {
            this.element.empty(); // Clean
            this.element.removeClass("ui-bslider");
            this.element.append(img);
            return this.element;
        },
        width: function (newWidth) {
            if (newWidth === undefined) {
                return this.element.width;
            }
            this.options.width = newWidth;
        },
        height: function (newHeight) {
            if (newHeight === undefined) {
                return this.element.height;
            }
            this.options.height = newHeight;
        },
        interval: function (newInterval) {
            if (newInterval === undefined) {
                return this.options.interval;
            }
            this.options.interval = newInterval;
        },
        speed: function (newSpeed) {
            if (newSpeed === undefined) {
                return this.options.speed;
            }
            this.options.speed = newSpeed;
        },
        count: function (newCount) {
            if (newCount === undefined) {
                return this.element.children().length;
            }
            // Don't allow any count more than image count
            this.options.count = Math.min(count, newCount);
        },
        urlLeft: function (newUrlLeft) {
            if (newUrlLeft === undefined) {
                return this.options.urlLeft;
            }
            this.options.urlLeft = newUrlLeft;
        },
        urlRight: function (newUrlRight) {
            if (newUrlRight === undefined) {
                return this.options.urlRight;
            }
            this.options.urlRight = newUrlRight;
        },
        autoSlide: function (newAutoSlide) {
            if (newAutoSlide === undefined) {
                return this.options.autoSlide;
            }
            this.options.autoSlide = newAutoSlide;
        },
        animation: function (newAnimation) {
            if (newAnimation === undefined) {
                return this.options.animation;
            }
            this.options.animation = newAnimation;
        }
    });
    $.extend($.ui.bslider, { version: "1.0.0" });
})(jQuery);
