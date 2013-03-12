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
 /*
    // For future usage
    is = {
        ff: window.globalStorage,
        ie: document.all && !window.opera,
        ie6: !window.XMLHttpRequest,
        ie7: document.all && window.XMLHttpRequest && !XDomainRequest && !window.opera,
        ie8: document.documentMode==8,
        opera: Boolean(window.opera),
        chrome: Boolean(window.chrome),
        safari: window.getComputedStyle && !window.globalStorage && !window.opera 
    }
*/
;(function () {
    // Main function
    $.fn.bslider = function () {
        // Static
        var i = 0,
            img = "",
            here = 0,
            result = 0,
            butwidth = 45,
            interval = 5000,
            loc = new Array([]),
            mywidth = this.width(),
            myheight = this.height(),
            count = this.children('img').length,
            midwidth = mywidth * count,
            urlLeft = 'http://img842.imageshack.us/img842/613/arrowleftr.png',
            urlRight = 'http://img7.imageshack.us/img7/4593/arrowrightq.png';
        // urlLeft = "/Content/arrowleft.png"
        // urlRight = "/Content/arrowright.png"
        // Cache Images and calgulate locations first
        for(i=0;i<count;i++) {
            // Cache Images
            var elem = this.children('img').eq(i);
            img = img + '<img src="' + elem.attr('src') + '" alt="' + elem.attr('alt') + '" />';
            // Calgulate locations
            loc[i] = result;
            result = result - mywidth;
        }
        // Clean
        this.empty();
        // Slider
        // $('<div class="bslider"></div>').appendTo(this)
        // this.addClass('bslider')
        var obj = this.addClass("bslider").css({
            padding: 0,
            width: mywidth,
            height: myheight,
            margin: '20px 10px',
            position: 'absolute',
            borderRadius: '20px 20px 20px 20px'
        });
        // this.replaceWith(obj);
        // Append Image container
        var mid = $('<div class="mid"></div>').appendTo(obj).css({
            padding: 0,
            width: mywidth,
            height: myheight,
            overflow: 'hidden',
            position: 'absolute',
            display: 'inline-block',
            zIndex: 0
        });
        $('<div class="container">' + img + '</div>').appendTo(mid).css({
            padding: 0,
            width: midwidth,
            height: myheight,
            position: 'relative',
            display: 'inline-block',
            zIndex: -1
        }).children('img').css({
            width: mywidth,
            height: myheight,
            float: 'left',
            clear: 'none'
        });
        // Append Left button
        $('<div class="left"></div>').insertBefore(mid).css({
            float: 'left',
            clear: 'none',
            display: 'block',
            position: 'absolute',
            zIndex: 1,
            margin: 0,
            opacity: 0,
            width: butwidth,
            height: myheight,
            cursor: 'pointer',
            background: 'url(' + urlLeft + ') no-repeat left center'
        }).hover(function () {
            $(this).animate({opacity: 0.6 }, 'fast');
        }).mouseleave(function () {
            $(this).animate({opacity: 0 }, 'fast');
        }).click(function () {
            if (here > 0) { here--; } else { here = count-1; }
            $('.mid .container').animate({ left: loc[here] }, 'fast');
        });
        // Append Right button
        $('<div class="right"></div>').insertBefore(mid).css({
            float: 'right',
            clear: 'none',
            display: 'inline',
            position: 'relative',
            zIndex: 1,
            margin: 0,
            opacity: 0,
            width: butwidth,
            height: myheight,
            cursor: 'pointer',
            background: 'url(' + urlRight + ') no-repeat right center'
        }).hover(function () {
            $(this).animate({opacity: 0.6 }, 'fast');
        }).mouseleave(function () {
            $(this).animate({opacity: 0 }, 'fast');
        }).click(function () {
            if (here < count-1) { here++; } else { here = 0; }
            $('.mid .container').animate({ left: loc[here] }, 'fast');
        });
        // Default behavior
        function doIt() { obj.find('.right').click(); }
        var int = setInterval(doIt, interval);
        // Allow chain
        return obj;
    };
} ());
