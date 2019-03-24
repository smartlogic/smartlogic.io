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