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
            display: 'block',
            margin: '20px 10px',
            borderRadius: '20px 20px 20px 20px'
        });
        // this.replaceWith(obj);
        // Append Image container
        var mid = $('<div class="mid"></div>').appendTo(obj).css({
            padding: 0,
            width: mywidth,
            height: myheight,
            overflow: 'hidden',
            display: 'block',
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
