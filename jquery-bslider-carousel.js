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
// Thanks to Seain Malkin selection disabled
'user-select': 'none',
'-o-user-select': 'none',
'-ms-user-select': 'none',
'-moz-user-select': 'none',
'-khtml-user-select': 'none',
'-webkit-user-select': 'none',
'-webkit-touch-callout': 'none'
*/
; (function () {
    // Main function
    $.fn.bcarousel = function () {
        // Static
        var i = 0,
            here = 0,
            result = 0,
            butwidth = 45,
            bordersize = 5,
            thumbbordersize = 4,
            marginsize = 5,
            interval = 5000,
            images = "",
            img = new Array([]),
            loc = new Array([]),
            mywidth = this.width(),
            myheight = this.height(),
            count = this.children('img').length,
            aspect = 0;
        if (mywidth > myheight)
            { aspect = myheight / mywidth; }
        else
            { aspect = mywidth / myheight; }
        var contentWidth = aspect * (mywidth / 5),
            contentHeight = aspect * (myheight / 5),
            midwidth = (contentWidth + thumbbordersize * 2 + marginsize) * count,
            urlLeft = 'http://img842.imageshack.us/img842/613/arrowleftr.png',
            urlRight = 'http://img7.imageshack.us/img7/4593/arrowrightq.png';
        // Cache Images and calgulate locations first
        for (i = 0; i < count; i++) {
            // Cache Images
            var elem = this.children('img').eq(i);
            img[i] = '<img src="' + elem.attr('src') + '" alt="' + elem.attr('alt') + '" />';
            images = images + '<img src="' + elem.attr('src') + '" alt="' + elem.attr('alt') + '" />';
            // Calgulate locations
            loc[i] = result;
            result = result - mywidth;
        }
        // Clean
        this.empty();
        // Slider
        var obj = this.addClass("bcarousel").css({
            margin: 0,
            padding: 0,
            width: mywidth,
            height: myheight + contentHeight + bordersize * 2 + thumbbordersize * 2 + marginsize
        });
        var mid = $('<div class="mid">' + img[0] + '</div>').appendTo(obj).css({
            float: 'left',
            clear: 'both',
            margin: 0,
            padding: 0,
            width: mywidth,
            height: myheight,
            overflow: 'hidden',
            position: 'relative',
            display: 'inline-block',
            border: '5px solid white',
            'box-shadow': '0 0 4px gray, 0 1px 4px gray',
            zIndex: 0
        }).children('img').css({ width: mywidth, height: myheight });
        // Append Image container
        var bottom = $('<div class="bottom"></div>').appendTo(obj).css({
            float: 'left',
            padding: 0,
            margin: 0,
            bottom: 0,
            width: mywidth + bordersize * 2,
            height: contentHeight + marginsize * 2 + thumbbordersize * 2,
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
            marginTop: 5,
            marginLeft: 5,
            marginRight: 0,
            marginBottom: 0,
            width: contentWidth,
            height: contentHeight,
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
                    var item = $(img[here].toString()).css({ width: mywidth, height: myheight }).hide();
                    $('.mid').empty().append(item).children('img').fadeIn("slow");
                });
            });
        });
        $(".bottom").mousemove(function (e) {
            var position = $(this).position(),
                width = $(this).width(),
                minX = position.left + contentWidth,
                maxX = minX + width,
                tickSize = width / midwidth;
            if (e.pageX >= minX && e.pageX <= maxX) {
                var val = ((e.pageX - minX) / tickSize) * -1;
                if (val > (midwidth - width + bordersize * 2) * -1) {
                    $('.container').css({ left: val });
                }
            }
        });
        // Thanks to karim79 selection disabled
        function clearSelection() {
            var sel;
            if (document.selection && document.selection.empty) {
                document.selection.empty();
            } else if (window.getSelection) {
                sel = window.getSelection();
                if (sel.empty) sel.empty();
                if (sel.removeAllRanges) sel.removeAllRanges();
            }
        }
        // Default behavior
        function doIt() {
            if (here < count - 1) { here = here + 1; } else { here = 0; }
            $('.mid > img').fadeOut("slow", function () {
                var item = $(img[here].toString()).css({ width: mywidth, height: myheight }).hide();
                $('.mid').empty().append(item).children('img').fadeIn("slow");
            });
        }
        var ints = setInterval(doIt, interval * 3);
        // Allow chain
        return obj;
    };
} ());
