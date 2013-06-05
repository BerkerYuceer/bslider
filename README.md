bslider
=======

Be Slider is a quick & easy to set up slider, based on html markup and jquery..

Usage:
    
    <!-- Create a container for your images as shown below and put all images inside it -->
    <div id="container">
      <img src="../../../any.jpeg" alt="image" />
      <img src="../../../image.jpg" alt="image" />
      <img src="../../../file.png" alt="image" />
      <img src="../../../can.gif" alt="image" />
      <img src="../../../be.jpg" alt="image" />
      <img src="../../../used.jpg" alt="image" />
    </div>
    
    <!-- Then add script -->
    <script type="text/javascript">
      $(document).ready(function(){
        $("#container").bslider();                      // Without any option given (Using defaults)
      });
    </script>
    
    <!-- Then add script -->
    <script type="text/javascript">
      $(document).ready(function(){
        $("#container").bslider();                      // Without any option given (Using defaults)
        $("#container").bslider({                       // User defined options
          width: 380,                                   // Width of slider (default value is container's css)
          height: 225,                                  // Height of slider (default value is container's css)
          interval: 3000,                               // Interval between each image slide by milisecond (default 5000)
          count: 3,                                     // Image count you want to show (in this case last 3 img hidden)
          speed: 'slow',                                // Speed of slide animation ('fast', 'slow') default: fast
          urlLeft: 'http://www.blabla.com/image4.jpg',  // You can define your own left, right button by giving img url 
          urlRigh: 'http://www.blabla.com/image5.jpg'   // they both has same widht as 45px
        });
      });
    </script>
