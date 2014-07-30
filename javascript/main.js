$(function() {
  $('h1,h2,h3,h4').on('click', function(event) {
    $(event.target).addClass('highlight');
  });
});
