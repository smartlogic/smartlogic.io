//  Google Map
var map;
function initMap() {
  var myLatLng = {lat: 39.277936, lng: -76.567172};
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 14,
    disableDefaultUI: true
  });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}

var hamburger = document.querySelector('.header__hamburger-wrap');
var header = document.querySelector('.header');
hamburger.addEventListener('click', function(){
  this.classList.toggle('open');
  var content = this.nextElementSibling;
  console.log(content);
  if (content.style.maxHeight){
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = "500px";
  } 
  header.classList.toggle('header-hamburger-open');
})