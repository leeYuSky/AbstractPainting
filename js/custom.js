
 /* jQuery Pre loader
  -----------------------------------------------*/
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets    
});


$(document).ready(function() {

  var parentWidth = $("#image-wraper-parent").width();
  $("#image-wraper").css({"height" : parentWidth *  1712 / 2878})
  $("#result-image").css({"height" : parentWidth *  1712 / 2878})
  //初始化 电脑边框的图片和背景图的大小
  // var comptureWidth = $("#compture").width(),
  //     comptureHeight = $("#compture").height(),
  //     topLeft = 20 * comptureWidth / 800;
  // $("#result-image").css({"width":comptureWidth * 752 / 800,"height":comptureHeight * 39 / 60,"border-top-left-radius":topLeft,"border-top-right-radius":topLeft});

  //监听窗口变化
  // $(window).resize(function(){

  // });


  // 生成个性化单选框
  $('input').iCheck({
    checkboxClass: 'icheckbox_polaris',
    radioClass: 'iradio_polaris',
    increaseArea: '-10' // optional
  });

  // $('input').iCheck({
  //   checkboxClass: 'icheckbox_flat-red',
  //   radioClass: 'iradio_flat-red'
  // });

  

  // 生成圆形单选框组

  // $("#feature .nav-wrap .iradio_polaris").css({
  //     "background-color" : "#f1c11a",
  // });
  // $(".nav-wrap").circleSelect();


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
      // var top = 30 + 20 * height / 390;

      // $("#result-image").attr("src",src).css({"width":width,"height":height,"top":top,"border-top-left-radius":20*height/390,"border-top-right-radius":20*height/390});
      // $("#compture").css({"width":width / 75.2 * 80,"height":height / 39 * 60})

      var parentWidth = $("#image-wraper-parent").width();
      if(parentWidth > 550){
        if(width > height){
          var r1 = parentWidth / 550 ;
          var r2 = width / height;

          if(r1 > r2){
            $("#image-wraper").css({"width" : width / height * 550,"height" : "100%" });
            $("#result-image").attr("src",src).css({"width" : "100%","height" : "100%" });
          } else {
            $("#image-wraper").css({"width" : "100%","height" : parentWidth * height / width});
            $("#result-image").attr("src",src).css({"width" : "100%","height" : "100%"})
          }


        } else if( width < height){

          $("#image-wraper").css({"width" : width / height * 550,"height" : "100%"});
          $("#result-image").attr("src",src).css({"width" : "100%","height" : "100%"})

        } else {

          $("#image-wraper").css({"width" : 550,"height" : 550});
          $("#result-image").attr("src",src).css({"width" : "100%","height" : "100%"})

        }
      } else {
        if(width > height){

          $("#image-wraper").css({"width" : "100%","height" : parentWidth * height / width});
          $("#result-image").attr("src",src).css({"width" : "100%","height" : "100%"})

        } else if( width < height){
          var r1 = 550 / parentWidth;
          var r2 = height / width;

          if(r1 > r2){
            $("#image-wraper").css({"width" : "100%","height" : parentWidth * height / width});
            $("#result-image").attr("src",src).css({"width" : "100%","height" : "100%"})
          } else {
            $("#image-wraper").css({"width" : width / height * 550,"height" : "100%"});
            $("#result-image").attr("src",src).css({"width" : "100%","height" : "100%"})
          }

          
        } else {

          $("#image-wraper").css({"width" : parentWidth,"height" : parentWidth});
          $("#result-image").attr("src",src).css({"width" : "100%","height" : "100%" })

        }
      }
      // myBrowser();
      // $("#saveImage").attr("download",src);

      var odownLoad = null; 
      odownLoad = document.getElementById("saveImage");  
      odownLoad.onclick = function () {  
        oDownLoad(src,odownLoad);  
      } 


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

        // $("#gengrateImage2").click();



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


function myBrowser() {  

    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isOpera = userAgent.indexOf("OPR") > -1; if (isOpera) { return "Opera" }; //判断是否Opera浏览器 OPR/43.0.2442.991  
  
    //if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) { return "IE"; }; //判断是否IE浏览器   
  
    if (userAgent.indexOf("Firefox") > -1) { return "FF"; } //判断是否Firefox浏览器  Firefox/51.0  
    if (userAgent.indexOf("Trident") > -1) { return "IE"; } //判断是否IE浏览器  Trident/7.0; rv:11.0  
    if (userAgent.indexOf("Edge") > -1) { return "Edge"; } //判断是否Edge浏览器  Edge/14.14393  
    if (userAgent.indexOf("Chrome") > -1) { return "Chrome"; }// Chrome/56.0.2924.87  
    if (userAgent.indexOf("Safari") > -1) { return "Safari"; } //判断是否Safari浏览
}

function downloadFile(fileName, content) {  
    var blob = base64Img2Blob(content);  
    //支持IE11  
    window.navigator.msSaveBlob(blob, fileName);  
} 

function oDownLoad(url,link) {  
    console.log(myBrowser());  
    console.log(link)
    if (myBrowser() === "IE") { //IE  //|| myBrowser() === "Edge"  
        link.href = "#";  
  
        // SaveAs5(url);  
        downloadFile(url+".jpg", url);  
        alert("下载成功！");
    } else if (myBrowser() === "Safari"){
        alert("请使用其他浏览器或自行手动下载！")
    } else { //!IE   
        var blob = base64Img2Blob(url);  
        url = window.URL.createObjectURL(blob);  
        link.href = url; link.download = url+".jpg";  
        alert("下载成功！");
    }  
} 

function base64Img2Blob(code){
    var parts = code.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType}); 
}


