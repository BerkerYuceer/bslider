bslider
=======

Be Slider is a quick & easy to set up image slider, based on HTML markup and jQuery 1.9.1 & jQueryUI 1.9.2

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

Usage for bslider:
    
    <!-- Create a container for your images as shown below and put all images inside it -->
    <div id="container">
      <img src="../../../any.jpeg" alt="image" />
      <img src="../../../image.jpg" alt="image" />
      <img src="../../../file.png" alt="image" />
      <img src="../../../can.gif" alt="image" />
      <img src="../../../be.jpg" alt="image" />
      <img src="../../../used.jpg" alt="image" />
    </div>

Usage without any option given (Using defaults):
    
    <script type="text/javascript">
      $(document).ready(function(){
        $("#container").bslider();
      });
    </script>

Usage when user defined options:
    
    <script type="text/javascript">
      $(document).ready(function(){
        $("#container").bslider({
          width: 380,                                   // Width of slider (default value is container's css)
          height: 225,                                  // Height of slider (default value is container's css)
          interval: 5000,                               // Interval between each image slide by milisecond (default 5000)
          count: 4,                                     // Image count you want to show (in this case last 2 img hidden)
          speed: 'slow',                                // Speed of slide animation ('fast', 'slow', 200) // 200 as miliseconds
          urlLeft: 'http://www.blabla.com/image4.jpg',  // You can define your own left, right button by giving img url 
          urlRigh: 'http://www.blabla.com/image5.jpg',  // they both has same widht as 45px
          autoSlide: false,                             // Boolean for timed animations by given interval. def: true - On false animates only when clicked..
          animation: 'fade'                             // Animation type ('slide', 'fade') def: 'slide'
        });                                             
      });
    </script>

bshowcase
=======

Be Showcase is a quick & easy to set up image showcase, based on HTML markup and jQuery 1.9.1 & jQueryUI 1.9.2

Usage for bshowcase:
    
    <!-- Create a container for your images as shown below and put all images inside it -->
    <div id="container">
      <img src="../../../any.jpeg" alt="image" />
      <img src="../../../image.jpg" alt="image" />
      <img src="../../../file.png" alt="image" />
      <img src="../../../can.gif" alt="image" />
      <img src="../../../be.jpg" alt="image" />
      <img src="../../../used.jpg" alt="image" />
    </div>
    
Usage without any option given (Using defaults):
    
    <script type="text/javascript">
      $(document).ready(function(){
        $("#container").bshowcase();
      });
    </script>

Usage with user defined options:
    
    <script type="text/javascript">
      $(document).ready(function(){
        $("#container").bshowcase({
          width: 450,                                   // Width of slider (default value is container's css)
          height: 320,                                  // Height of slider (default value is container's css)
          interval: 10000,                              // Interval between each image slide by milisecond (default 10000)
          count: 4,                                     // Image count you want to show (in this case last 2 img hidden)
          speed: 750,                                   // Speed of fade animation ('fast' or 'slow' or 750) 750 as miliseconds
          autoSlide: false,                             // Boolean for timed animations by given interval. def: true - On false; animates only when clicked..
          position: 'right'                             // Position of the thumbnail gallery def: bottom
          borderColor: 'white',                         // Border color of mainframe and thumbnails
          shadowColor: 'silver',                        // Shadow color of mainframe and thumbnails
          borderSize: 10,                               // Border size of mainframe
          thumbBorderSize: 6                            // Border size of thumbnails
        });
      });
    </script>
