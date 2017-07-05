$(function() {
  $('.ngview').on('click', '#wheelSpin',function(){
    $(".element").addClass("element-active");
    setTimeout(function () {
      $(".element").removeClass("element-active");
    }, 5000);

    // $("#wheelSpin").click(function(){
    //   console.log('spinner was clicked');
    //   $(".element").toggleClass("element-active");
    //
    // });
    // $("#wheelSpin").click(function(){
    //   $(".element").toggleClass("element-active");
    // });
    // $("#wheelSpinn").click(function(){
    //   $(".element").toggleClass("element-active");
    // });
  });
});


$(function() {
  $('.ngview').on('click', '#wheelSpinn',function(){
    $(".element").addClass("element-active");
    setTimeout(function () {
      $(".element").removeClass("element-active");
    }, 5000);
    // $('#wheelSpinn').toggleClass('element-active');
    // $("#wheelSpinn").click(function(){
    //   console.log('spinner was clicked');
    // });
    // $("#wheelSpinn").click(function(){
    //   $(".element").toggleClass("element-active");
    // });
    // $("#wheelSpinn").click(function(){
    //   $(".element").toggleClass("element-active");
    // });
  });
});
