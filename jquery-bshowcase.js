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
    $.widget("ui.bshowcase", {
        options: {
            width: 0,
            height: 0,
            interval: 10000,
            count: 0,
            speed: 'fast'
        },
        _create: function () {
            var width = this.options.width || this.element.width(),
                height = this.options.height || this.element.height(),
                interval = this.options.interval,
                count = this.options.count || this.element.children('img').length,
                speed = this.options.speed,
                images = "",
                img = new Array([]),
                thumbBorderSize = 4,
                borderSize = 5,
                marginSize = 5,
                aspect = 0,
                here = 0,
                left = 0;
            if (width > height)
            { aspect = height / width; }
            else
            { aspect = width / height; }
            var thumbWidth = aspect * (width / 5),
                thumbHeight = aspect * (height / 5),
                midwidth = (thumbWidth + thumbBorderSize * 2 + marginSize) * count;
            // Cache Images and calgulate locations first
            for (i = 0; i < count; i++) {
                // Cache Images
                var elem = this.element.children('img').eq(i);
                img[i] = '<img src="' + elem.attr('src') + '" alt="' + elem.attr('alt') + '" />';
                images = images + '<img src="' + elem.attr('src') + '" alt="' + elem.attr('alt') + '" />';
            }
            this.element.empty(); // Clean
            // Slider
            var obj = this.element.addClass("bshowcase").css({
                padding: 0,
                width: width,
                height: height + thumbHeight + borderSize * 2 + thumbBorderSize * 2 + marginSize
            });
            // Append Main Image container
            var mid = $('<div class="mid">' + img[0] + '</div>').appendTo(obj).css({
                float: 'left',
                clear: 'both',
                margin: 0,
                padding: 0,
                maxWidth: width,
                marginLeft: (width - borderSize - $('.mid').width()) / 2,
                height: height,
                overflow: 'hidden',
                position: 'relative',
                display: 'block',
                border: '5px solid white',
                'box-shadow': '0 0 4px gray, 0 1px 4px gray',
                zIndex: 0
            }).children('img').css({ height: height });
            // Append thumbImage container
            var bottom = $('<div class="bottom"></div>').appendTo(obj).css({
                float: 'left',
                padding: 0,
                margin: 0,
                bottom: 0,
                width: width + borderSize * 2,
                height: thumbHeight + marginSize * 2 + thumbBorderSize * 2,
                overflow: 'hidden',
                position: 'relative',
                display: 'inline-block',
                zIndex: 0
            });
            $('<div class="container"></div>').appendTo(".bottom").css({
                float: 'left',
                padding: 0,
                margin: 0,
                width: midwidth,
                display: 'block',
                position: 'relative',
                zIndex: -1
            }).append(images).children('img').css({
                float: 'left',
                clear: 'none',
                cursor: 'pointer',
                marginTop: 5,
                marginLeft: 5,
                marginRight: 0,
                marginBottom: 0,
                width: thumbWidth,
                height: thumbHeight,
                border: '4px solid white',
                'box-shadow': '0 0 4px gray',
                'list-style': 'none'
            }).each(function () {
                $(this).hover(
                    function () {
                        $(".container > img").css({ opacity: 0.4 });
                        $(this).css({ opacity: 1 });
                    },
                    function () {
                        $(".container > img").css({ opacity: 1 });
                    }
                ).click(function () {
                    here = $(".container > img").index(this);
                    $('.mid > img').fadeOut("slow", function () {
                        var item = $(img[here].toString()).css({ height: height }).hide();
                        $('.mid').empty().append(item).children('img').fadeIn("slow");
                        $('.mid').css({
                            marginLeft: (width - borderSize - $('.mid').width()) / 2
                        });
                    });
                });
            });
            $(".bottom").mousemove(function (e) {
                var position = $(this).position(),
                    width = $(this).width(),
                    minX = position.left + thumbWidth,
                    maxX = minX + width,
                    tickSize = width / midwidth;
                if (e.pageX >= minX && e.pageX <= maxX) {
                    var val = ((e.pageX - minX) / tickSize) * -1;
                    if (val > (midwidth - width + borderSize * 2) * -1) {
                        $('.container').css({ left: val });
                    }
                }
            });
            // Auto slide behavior
            function doIt() {
                if (here < count - 1) { here = here + 1; } else { here = 0; }
                $('.mid > img').fadeOut("slow", function () {
                    var item = $(img[here].toString()).css({ height: height }).hide();
                    $('.mid').empty().append(item).children('img').fadeIn("slow");
                    $('.mid').css({
                        marginLeft: (width - borderSize - $('.mid').width()) / 2
                    });
                });
            }
            var ints = setInterval(doIt, interval);
            // Allow chain
            return obj;
        },
        _destroy: function () {
            this.element.empty(); // Clean
            this.element.removeClass("bshowcase");
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
            if (newSpeed === undefined && newSpeed != 'slow') {
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
        }
    });
    $.extend($.ui.bshowcase, { version: "1.0.0" });
})(jQuery);
