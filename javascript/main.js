$(document).ready(function() {

  $('.sidebar a').click(function() {
    $('.primary-navigation').toggleClass('active', 1000, 'easeOutCubic');
    $('.primary-navigation > *').delay(250).toggleClass('active', 750, 'easeOutCubic');
  });

});
