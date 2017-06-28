console.log('jqStudent');
$(function() {
  $('.ngview').on('click','.button',function (){
  // $('.button').click(function(){
    var buttonId = $(this).attr('id');
    var buttonVal = $(this).val();
    console.log('This is the button val', buttonVal);

    if(buttonVal){
      $('#modal-container').removeAttr('class').addClass(buttonId);
      $('body').addClass('modal-active');
    }
    else{
      $('#modal-container-false').removeAttr('class').addClass(buttonId);
      $('body').addClass('modal-active');
    }
  });

  $('.ngview').on('click','#modal-container',function(){
  // $('#modal-container').click(function(){
    $(this).addClass('out');
    $('body').removeClass('modal-active');
  });
});
