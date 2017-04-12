
 /* jQuery Pre loader
  -----------------------------------------------*/
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets    
});


$(document).ready(function() {

  //初始化 电脑边框的图片和背景图的大小
  var comptureWidth = $("#compture").width(),
      comptureHeight = $("#compture").height(),
      topLeft = 20 * comptureWidth / 800;
  $("#result-image").css({"width":comptureWidth * 752 / 800,"height":comptureHeight * 39 / 60,"border-top-left-radius":topLeft,"border-top-right-radius":topLeft});

  //监听窗口变化
  $(window).resize(function(){
    var comptureWidth = $("#compture").width(),
      comptureHeight = $("#compture").height(),
      topLeft = 20 * comptureWidth / 800;
  $("#result-image").css({"width":comptureWidth * 752 / 800,"height":comptureHeight * 39 / 60,"border-top-left-radius":topLeft,"border-top-right-radius":topLeft});
  });


  // 生成个性化单选框
  $('input').iCheck({
    checkboxClass: 'icheckbox_polaris',
    radioClass: 'iradio_polaris',
    increaseArea: '-10' // optional
  });

  $("#feature .nav-wrap .iradio_polaris").css({
      "background-color" : "#f1c11a",
  });

  // 生成圆形单选框组
  $(".nav-wrap").circleSelect();


  // socket
  var socket = io.connect("http://127.0.0.1:9093");

  socket.on("connect",function(){
    output("Client has connected to the server!");
  });

  socket.on("disconnect",function(){
    output("Client has disconnect!")
  });

  socket.on("sendImage",function(data){
    if(data){

      var jsonData = JSON.parse(data);
      var width = jsonData.width,
          height = jsonData.height;


      src = 'data:image/jpeg;base64,' + jsonData.image;

      // var left = $("#imageDiv").width() / 2 - width / 2;
      var top = 30 + 20 * height / 390;

      $("#result-image").attr("src",src).css({"width":width,"height":height,"top":top,"border-top-left-radius":20*height/390,"border-top-right-radius":20*height/390});
      $("#compture").css({"width":width / 75.2 * 80,"height":height / 39 * 60})


    }
  });

  function sendImageRequest(style, mood, width, height){
    var jsonObject = {type: style, mood: mood, width:width, height:height};//width:766, height:527
    socket.emit('imageRequest', jsonObject);
  };



  // 生成图片处理
  $("#generateImage").click(function(e){
    var $style = $("#stylePanel input[name='iCheckStyle']:checked");
    var $emotion = $("#emotionPanel input[type='radio']:checked");
    var $width = $("#sizeWidth");
    var $height = $("#sizeHeight");
    
    var style = $style.val();
    var emotion = $emotion.val();
    var width = $width.val();
    var height = $height.val();

    if(style <= 3){
      
      if(isNumber(width) && isNumber(height)){

        sendImageRequest(style,emotion,width,height);

        $("#gengrateImage2").click();



      }else{
        alert("宽度和高度请输入数字!")
      }

    }else{
      alert("This style will be implemented in the future!")
    }

  });

  /* Home Slideshow Vegas
  -----------------------------------------------*/
  $(function() {
    $('body').vegas({
        slides: [
            // { src: 'images/slide-1.jpg' },
            // { src: 'images/slide-2.jpg' },
            { src: 'images/Kandinsky_Composition_VIII.jpg' },
            { src: 'images/Kandinsky_On_White_II.jpg' },
            { src: 'images/Kandinsky_Black_and_Violet.jpg' },
            { src: 'images/Kandinsky_Several_Circles.jpg' },
        ],
        timer: false,
        animation: 'kenburns',
        transition: [ 'zoomOut', ]
    });

    // $('input').iCheck({
    //   checkboxClass: 'icheckbox_square-red',
    //   radioClass: 'iradio_square-red',
    //   increaseArea: '20%' // optional
    // });

  });

   /* Back top
  -----------------------------------------------*/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
        $('.go-top').fadeIn(200);
        } else {
          $('.go-top').fadeOut(200);
        }
    });   
        // Animate the scroll to top
    $('.go-top').click(function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, 300);
    });
      

  /* wow
  -------------------------------*/
  new WOW({ mobile: false }).init();

});

function isNumber(value) {
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
};

function output(message) {
            console.log(moment().format('HH:mm:ss.SSS')+":"+message);
};


