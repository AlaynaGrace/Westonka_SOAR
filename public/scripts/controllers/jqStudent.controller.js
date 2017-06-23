console.log('jqStudent');
$(function() {
  $('.ngview').on('click','.button',function (){
  // $('.button').click(function(){
    var buttonId = $(this).attr('id');
    $('#modal-container').removeAttr('class').addClass(buttonId);
    $('body').addClass('modal-active');
  })

  $('.ngview').on('click','#modal-container',function(){
  // $('#modal-container').click(function(){
    $(this).addClass('out');
    $('body').removeClass('modal-active');
  });
});
