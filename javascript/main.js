$(document).ready(function() {

  $('.sidebar a').click(function() {
    $('.primary-navigation').toggleClass('active', 1000, 'easeOutCubic');
  });

});
