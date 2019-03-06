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
(function ($) {
    $.widget("fn.bshowcase", {
        options: {
            width: 0,
            height: 0,
            interval: 5000,
            speed: 750,
            count: 0,
            autoSlide: true,
            position: 'bottom',
            borderColor: 'white',
            shadowColor: 'silver',
            borderSize: 0,
            thumbBorderSize: 0
        },
        _create: function () {
            var width = this.options.width || this.element.width(),
                height = this.options.height || this.element.height(),
                interval = this.options.interval,
                count = this.options.count || this.element.children('img').length,
                speed = this.options.speed,
                autoSlide = this.options.autoSlide,
                position = this.options.position,
                borderColor = this.options.borderColor,
                shadowColor = this.options.shadowColor,
                img = new Array([]),
                // Images
                imgWidth = new Array([]),
                imgHeight = new Array([]),
                ratioHeight = 0,
                ratioWidth = 0,
                ratio = 0,
                // Thumbnails
                tWidth = new Array([]),
                tHeight = new Array([]),
                thumbWidth = 0,
                thumbHeight = 0,
                thumbRatio = 0,
                // Container
                containerWidth = 0,
                containerHeight = 0,
                // Borders & Margins
                thumbBorderSize = this.options.thumbBorderSize || 4,
                borderSize = this.options.borderSize || 5,
                marginSize = 5,
                here = 0,
                left = 0;
            // Cache Images and calgulate locations first
            for (i = 0; i < count; i++) {
                // Cache Images
                var elem = this.element.children('img').eq(i);
                // Calgulate AspectRatio
                ratioWidth = (width - Math.round(width / 6) - (thumbBorderSize * 2) - (borderSize * 2) - (marginSize * 2)) / elem.width();
                ratioHeight = (height - Math.round(height / 6) - (thumbBorderSize * 2) - (borderSize * 2) - (marginSize * 2)) / elem.height();
                // Choose the smaller ratio
                if (ratioWidth > ratioHeight)
                { ratio = ratioHeight; }
                else
                { ratio = ratioWidth; }
                // Calgulate imgWidth and imgHeight
                imgWidth[i] = elem.width() * ratio;
                imgHeight[i] = elem.height() * ratio;
                // Calgulate AspectRatio
                thumbWidth = (width / 6) / elem.width();
                thumbHeight = (height / 6) / elem.height();
                // Choose the smaller ratio
                if (thumbWidth > thumbHeight)
                { thumbRatio = thumbHeight; }
                else
                { thumbRatio = thumbWidth; }
                // Calgulate imgWidth and imgHeight
                tWidth[i] = elem.width() * thumbRatio;
                tHeight[i] = elem.height() * thumbRatio;
                // Calgulate container width
                containerWidth = containerWidth + (tWidth[i] + thumbBorderSize * 2 + marginSize * 2);
                containerHeight = containerHeight + (tHeight[i] + thumbBorderSize * 2 + marginSize * 2);
                img[i] = '<img src="' + elem.attr('src') + '" alt="' + elem.attr('alt') + '" />';
            }
            this.element.empty(); // Clean
            // Set default slider position to use later
            var defaultStartPositionH = ((width-(borderSize*2))/2)-((imgWidth[0]+(thumbBorderSize*2))/2);
            var defaultStartPositionV = ((height-(borderSize*2))/2)-((imgHeight[0]+(thumbBorderSize*2))/2);
            // Slider
            var obj = this.element.addClass("ui-bshowcase").css({
                padding: 0,
                width: width,
                height: height
            });
            // Append Main Image Container
            var mid = $('<div class="ui-bshowcase-mid">' + img[0] + '</div>').appendTo(obj);
            // Append Container Holder
            var holder = $('<div class="ui-bshowcase-holder"></div>').appendTo(obj);
            // Append Thumbnail Image Container
            var container = $('<div class="ui-bshowcase-container"></div>').appendTo(holder);
            // Apply CSS
            // Top alinged thumb container
            if (position === 'top') {
                holder.css({
                    float: 'left',
                    clear: 'both',
                    margin: 0,
                    padding: 0,
                    top: 0,
                    width: width,
                    height: Math.abs(height / 6) + thumbBorderSize * 2 + marginSize * 2,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'block',
                    zIndex: 0
                });
                mid.css({
                    float: 'left',
                    clear: 'both',
                    margin: holder.height() + 'px 0 0 0',
                    padding: 0,
                    maxWidth: imgWidth[0],
                    maxHeight: imgHeight[0],
                    marginLeft: (width - borderSize * 2 - imgWidth[0]) / 2,
                    overflow: 'hidden',
                    position: 'absolute',
                    display: 'block',
                    border: borderSize + 'px solid ' + borderColor,
                    'box-shadow': '0 0 4px '+ shadowColor + ', 0 1px 4px ' + shadowColor,
                    zIndex: 0
                }).children('img').css({ height: imgHeight[0] });
                container.css({
                    padding: 0,
                    margin: 0,
                    left: ((width-(borderSize*2))/2 - (imgWidth[0]/2)),
                    width: containerWidth,
                    height: Math.abs(height / 6) + borderSize * 2 + marginSize * 2,
                    display: 'block',
                    position: 'relative',
                    zIndex: -1
                });
                container.append(img.join('').toString()).children('img').each(function (){
                    $(this).css({
                        float: 'left',
                        clear: 'none',
                        cursor: 'pointer',
                        opacity: 0.4,
                        marginTop: (holder.height() - (tHeight[$(".ui-bshowcase-container > img").index(this)] + thumbBorderSize * 2 + marginSize)) / 2,
                        marginLeft: 5,
                        marginRight: 0,
                        marginBottom: 0,
                        width: tWidth[$(".ui-bshowcase-container > img").index(this)],
                        height: tHeight[$(".ui-bshowcase-container > img").index(this)],
                        border: thumbBorderSize + 'px solid ' + borderColor,
                        'box-shadow': '0 0 4px ' + shadowColor,
                        'list-style': 'none'
                    }).hover(function () {
                        $(".ui-bshowcase-container > img").css({ opacity: 0.4 });
                        $(this).css({ opacity: 1 });
                    }).click(function () {
                        here = $(".ui-bshowcase-container > img").index(this);
                        $('.ui-bshowcase-mid > img').fadeOut(speed, function () {
                            var item = $(img[here]).css({ height: imgHeight[here], width: imgWidth[here] }).hide();
                            $('.ui-bshowcase-mid').empty().append(item).children('img').fadeIn(speed);
                            $('.ui-bshowcase-mid').animate({
                                marginLeft: (width - (imgWidth[here] + (borderSize * 2))) / 2
                            }, speed);
                        });
                    });
                });
            // Left alinged thumb container
            } else if (position === 'left') {
                holder.css({
                    float: 'left',
                    padding: 0,
                    margin: 0,
                    left: marginSize,
                    width: Math.abs(width / 6) + thumbBorderSize * 2 + marginSize,
                    height: height,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'block',
                    zIndex: 0
                });
                mid.css({
                    float: 'left',
                    clear: 'both',
                    margin: 0,
                    padding: 0,
                    maxHeight: imgHeight[0],
                    maxWidth: imgWidth[0],
                    marginTop: (height - (imgHeight[0]+borderSize*2)) / 2,
                    marginLeft: holder.width() + ((width - (imgWidth[0]+borderSize*2)) / 2),
                    overflow: 'hidden',
                    position: 'absolute',
                    display: 'block',
                    border: borderSize + 'px solid ' + borderColor,
                    'box-shadow': '0 0 4px ' + shadowColor + ', 0 1px 4px ' + shadowColor,
                    zIndex: 0
                }).children('img').css({ width: imgWidth[0] });
                container.css({
                    float: 'left',
                    padding: 0,
                    margin: '0 0 0 4px',
                    top: ((height-(borderSize*2))/2 - (imgHeight[0]/2)),
                    height: containerHeight,
                    display: 'block',
                    position: 'relative',
                    zIndex: -1
                });
                container.append(img.join('').toString()).children('img').each(function (){
                    $(this).css({
                        float: 'left',
                        clear: 'both',
                        cursor: 'pointer',
                        opacity: 0.4,
                        marginTop: 5,
                        marginLeft: Math.floor((holder.width() - (tWidth[$(".ui-bshowcase-container > img").index(this)] + thumbBorderSize * 2 + marginSize)) / 2),
                        marginRight: 0,
                        marginBottom: 0,
                        width: tWidth[$(".ui-bshowcase-container > img").index(this)],
                        height: tHeight[$(".ui-bshowcase-container > img").index(this)],
                        border: thumbBorderSize + 'px solid ' + borderColor,
                        'box-shadow': '0 0 4px ' + shadowColor,
                        'list-style': 'none'
                    }).hover(function () {
                        $(".ui-bshowcase-container > img").css({ opacity: 0.4 });
                        $(this).css({ opacity: 1 });
                    }).click(function () {
                        here = $(".ui-bshowcase-container > img").index(this);
                        $('.ui-bshowcase-mid > img').fadeOut(speed, function () {
                            var item = $(img[here]).css({ height: imgHeight[here], width: imgWidth[here] }).hide();
                            $('.ui-bshowcase-mid').empty().append(item).children('img').fadeIn(speed);
                            $('.ui-bshowcase-mid').animate({
                                marginTop: (height - (imgHeight[here]+borderSize*2)) / 2,
                                marginLeft: holder.width() + ((width - (imgWidth[here]+borderSize*2)) / 2)
                            }, speed);
                        });
                    });
                });
            // Right alinged thumb container
            } else if (position === 'right') {
                holder.css({
                    float: 'right',
                    padding: 0,
                    margin: 0,
                    right: 0,
                    width: Math.abs(width / 6) + thumbBorderSize * 2 + marginSize * 2,
                    height: height,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'block',
                    zIndex: 0
                });
                mid.css({
                    float: 'left',
                    margin: 0,
                    padding: 0,
                    maxHeight: imgHeight[0],
                    maxWidth: imgWidth[0],
                    marginTop: (height - (imgHeight[0]+borderSize*2)) / 2,
                    marginLeft: (width - (imgWidth[0]+borderSize*2)-holder.width()) / 2,
                    overflow: 'hidden',
                    position: 'absolute',
                    display: 'block',
                    border: borderSize + 'px solid ' + borderColor,
                    'box-shadow': '0 0 4px ' + shadowColor + ', 0 1px 4px ' + shadowColor,
                    zIndex: 0
                }).children('img').css({ width: imgWidth[0] });
                container.css({
                    float: 'left',
                    padding: 0,
                    margin: 0,
                    top: ((height-(borderSize*2))/2 - (imgHeight[0]/2)),
                    height: containerHeight,
                    display: 'block',
                    position: 'relative',
                    zIndex: -1
                });
                container.append(img.join('').toString()).children('img').each(function (){
                    $(this).css({
                        float: 'left',
                        clear: 'both',
                        cursor: 'pointer',
                        opacity: 0.4,
                        marginTop: 5,
                        marginLeft: (holder.width() - (tWidth[$(".ui-bshowcase-container > img").index(this)] + thumbBorderSize * 2 + marginSize)) / 2,
                        marginRight: 0,
                        marginBottom: 0,
                        width: tWidth[$(".ui-bshowcase-container > img").index(this)],
                        height: tHeight[$(".ui-bshowcase-container > img").index(this)],
                        border: thumbBorderSize + 'px solid '+ borderColor,
                        'box-shadow': '0 0 4px ' + shadowColor,
                        'list-style': 'none'
                    }).hover(function () {
                        $(".ui-bshowcase-container > img").css({ opacity: 0.4 });
                        $(this).css({ opacity: 1 });
                    }).click(function () {
                        here = $(".ui-bshowcase-container > img").index(this);
                        $('.ui-bshowcase-mid > img').fadeOut(speed, function () {
                            var item = $(img[here]).css({ height: imgHeight[here], width: imgWidth[here] }).hide();
                            $('.ui-bshowcase-mid').empty().append(item).children('img').fadeIn(speed);
                            $('.ui-bshowcase-mid').animate({
                                marginTop: (height - (imgHeight[here]+borderSize*2)) / 2,
                                marginLeft: (width - (imgWidth[here]+borderSize*2)-holder.width()) / 2
                            }, speed);
                        });
                    });
                });
            // Bottom alinged thumb container as Default
            } else {
                holder.css({
                    float: 'left',
                    margin: height - (Math.abs(height / 6) + thumbBorderSize * 2 + marginSize * 2) + 'px 0 0 0',
                    padding: 0,
                    width: width,
                    height: Math.abs(height / 6) + thumbBorderSize * 2 + marginSize * 2,
                    overflow: 'hidden',
                    position: 'absolute',
                    display: 'block',
                    zIndex: 0
                });
                mid.css({
                    float: 'left',
                    clear: 'both',
                    margin: 0,
                    padding: 0,
                    maxWidth: imgWidth[0],
                    maxHeight: imgHeight[0],
                    marginLeft: (width - borderSize * 2 - imgWidth[0]) / 2,
                    marginTop: (height - borderSize * 2 - imgHeight[0] - holder.height) / 2,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'block',
                    border: borderSize + 'px solid ' + borderColor,
                    'box-shadow': '0 0 4px ' + shadowColor + ', 0 1px 4px ' + shadowColor,
                    zIndex: 0
                }).children('img').css({ height: imgHeight[0] });
                container.css({
                    padding: 0,
                    margin: 0,
                    left: ((width-(borderSize*2))/2 - (imgWidth[0]/2)),
                    width: containerWidth,
                    height: Math.abs(height / 6) + borderSize * 2 + marginSize,
                    display: 'block',
                    position: 'relative',
                    zIndex: -1
                });
                container.append(img.join('').toString()).children('img').each(function (){
                    $(this).css({
                        float: 'left',
                        clear: 'none',
                        cursor: 'pointer',
                        opacity: 0.4,
                        marginTop: (holder.height() - (tHeight[$(".ui-bshowcase-container > img").index(this)] + thumbBorderSize * 2 + marginSize)) / 2,
                        marginLeft: 5,
                        marginRight: 0,
                        marginBottom: 0,
                        width: tWidth[$(".ui-bshowcase-container > img").index(this)],
                        height: tHeight[$(".ui-bshowcase-container > img").index(this)],
                        border: thumbBorderSize + 'px solid '+ borderColor,
                        'box-shadow': '0 0 4px ' + shadowColor,
                        'list-style': 'none'
                    }).hover(function () {
                        $(".ui-bshowcase-container > img").css({ opacity: 0.4 });
                        $(this).css({ opacity: 1 });
                    }).click(function () {
                        here = $(".ui-bshowcase-container > img").index(this);
                        $('.ui-bshowcase-mid > img').fadeOut(speed, function () {
                            var item = $(img[here]).css({ height: imgHeight[here], width: imgWidth[here] }).hide();
                            $('.ui-bshowcase-mid').empty().append(item).children('img').fadeIn(speed);
                            $('.ui-bshowcase-mid').animate({
                                marginLeft: (width - (imgWidth[here]+(borderSize*2))) / 2
                            }, speed);
                        });
                    });
                });
            }
            // Mouse move events vertical or horizontal!
            $(".ui-bshowcase-container").children('img').eq(0).css({ opacity: 1 });
            if (position === 'left' || position === 'right'){
                $(".ui-bshowcase-holder").mousemove(function (e) {
                    var position = $(this).position(),
                        height = $(this).height(),
                        minY = position.top + Math.round(height / 4),
                        maxY = minY + height,
                        tickSize =  height / containerHeight;
                    if (e.pageY >= minY && e.pageY <= maxY) {
                        var val = ((e.pageY - minY) / tickSize) * -1;
                        if (val > (containerHeight - height) * -1) {
                            $('.ui-bshowcase-container').css({ top: val });
                        }
                    }
                });
            } else {
                $(".ui-bshowcase-holder").mousemove(function (e) {
                    var position = $(this).position(),
                        width = $(this).width(),
                        minX = position.left + (width / 4),
                        maxX = minX + width,
                        tickSize =  width / containerWidth;
                    if (e.pageX >= minX && e.pageX <= maxX) {
                        var val = ((e.pageX - minX) / tickSize) * -1;
                        if (val > (containerWidth - width) * -1) {
                            $('.ui-bshowcase-container').css({ left: val });
                        }
                    }
                });
            }
            // Auto slide behavior
            function doItVertical() {
                if (here < count - 1) { here = here + 1; } else { here = 0; }
                $('.ui-bshowcase-mid > img').fadeOut(speed, function () {
                    var item = $(img[here].toString()).css({ height: imgHeight[here], width: imgWidth[here] }).hide();
                    $('.ui-bshowcase-mid').empty().append(item).children('img').fadeIn(speed);
                    var marginL;
                    if (position === 'left'){
                        marginL = width - (imgWidth[here]+(borderSize*2))/ 2 - holder.width();
                    } else if (position === 'right') {
                        marginL = (width - (imgWidth[here]+borderSize*2) - holder.width())/ 2;
                    }
                    $('.ui-bshowcase-mid').animate({
                        marginTop: (height - (imgHeight[here]+borderSize*2)) / 2,
                        marginLeft: marginL
                    }, speed);
                    var val = 0;
                    for (var i = 0; i < here; i++) {
                        val = val + tHeight[i] + marginSize + (thumbBorderSize * 2);
                    }
                    val = (val - (height / 2) + (tHeight[i] + (thumbBorderSize * 2))/ 2) * -1;
                    if (val > (containerHeight - height) * -1 && val < 0) {
                        $('.ui-bshowcase-container').animate({ top: val }, speed);
                    } else if (here === 0 || here === 1) {
                        $('.ui-bshowcase-container').animate({ top: defaultStartPositionV }, speed);
                    }
                    $(".ui-bshowcase-container > img").css({ opacity: 0.4 }).eq(here).css({ opacity: 1 });
                });
            }
            // Auto slide behavior
            function doItHorizontal() {
                if (here < count - 1) { here = here + 1; } else { here = 0; }
                $('.ui-bshowcase-mid > img').fadeOut(speed, function () {
                    var item = $(img[here].toString()).css({ height: imgHeight[here], width: imgWidth[here] }).hide();
                    $('.ui-bshowcase-mid').empty().append(item).children('img').fadeIn(speed);
                    $('.ui-bshowcase-mid').animate({
                        marginLeft: (width - ($('.ui-bshowcase-mid').width()+(borderSize*2))) / 2
                    }, speed);
                    var val = 0;
                    for (var i = 0; i < here; i++) {
                        val = val + tWidth[i] + marginSize + (thumbBorderSize * 2);
                    }
                    val = (val - (width / 2) + (tWidth[i] + (thumbBorderSize * 2))/ 2) * -1;
                    if (val > (containerWidth - width) * -1 && val < 0) {
                        $('.ui-bshowcase-container').animate({ left: val }, speed);
                    } else if (here === 0 || here === 1) {
                        $('.ui-bshowcase-container').animate({ left: defaultStartPositionH }, speed);
                    }
                    $(".ui-bshowcase-container > img").css({ opacity: 0.4 }).eq(here).css({ opacity: 1 });
                });
            }
            if (autoSlide) {
                if (position === 'left' || position === 'right') {
                    clearInterval(vertical);
                    var vertical = setInterval(doItVertical, interval);
                } else if (position === 'top' || position === 'bottom') {
                    clearInterval(horizontal);
                    var horizontal = setInterval(doItHorizontal, interval);
                }
            }
            // Allow chain
            return obj;
        },
        _destroy: function () {
            this.element.empty(); // Clean
            this.element.removeClass("ui-bshowcase");
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
        autoSlide: function (newAutoSlide) {
            if (newAutoSlide === undefined) {
                return this.options.autoSlide;
            }
            this.options.autoSlide = newAutoSlide;
        },
        position: function (newPosition) {
            if(newPosition === undefined) {
                return this.options.position;
            }
            this.options.position = newPosition;
        },
        borderColor: function (newBorderColor) {
            if(newBorderColor === undefined) {
                return this.options.borderColor;
            }
            this.options.borderColor = newBorderColor;
        },
        shadowColor: function (newShadowColor) {
            if(newShadowColor === undefined) {
                return this.options.shadowColor;
            }
            this.options.shadowColor = newShadowColor;
        },
        borderSize: function (newBorderSize) {
            if(newBorderSize === undefined) {
                return this.options.borderSize;
            }
            this.options.borderSize = newBorderSize;
        },
        thumbBorderSize: function (newThumbBorderSize) {
            if(newThumbBorderSize === undefined) {
                return this.options.thumbBorderSize;
            }
            this.options.thumbBorderSize = newThumbBorderSize;
        }
    });
    $.extend($.fn.bshowcase, { version: "1.0.1" });
})(jQuery);
