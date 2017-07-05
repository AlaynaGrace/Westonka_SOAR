$(function() {
  $('.ngview').on('click', '#wheelSpin',function(){
    console.log('toggle has been clicked');
    $("#wheelSpin").click(function(){
      console.log('spinner was clicked');
    });
    $("#wheelSpin").click(function(){
      $(".element").toggleClass("element-active");
    });
    // $("#wheelSpinn").click(function(){
    //   $(".element").toggleClass("element-active");
    // });
  });
});


$(function() {
  $('.ngview').on('click', '#wheelSpinn',function(){
    $("#wheelSpinn").click(function(){
      console.log('spinner was clicked');
    });
    $("#wheelSpinn").click(function(){
      $(".element").toggleClass("element-active");
    });
    // $("#wheelSpinn").click(function(){
    //   $(".element").toggleClass("element-active");
    // });
  });
});
