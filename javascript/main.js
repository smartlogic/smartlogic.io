//  Google Map
//  note: not sure why but there is a duplicate script in map.js; stops working when I delete one or the other
//  so leaving as-is. Just remember to update both if you are changing the address location
var map;
function initMap() {
  var myLatLng = { lat: 39.288550, lng: -76.606950 };
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
if (hamburger) {
  var header = document.querySelector('.header');
  hamburger.addEventListener('click', function () {
    this.classList.toggle('open');
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = "800px";
    }
    header.classList.toggle('header-hamburger-open');
  })
}


/* =========================================
   Header dropdowns: Services & Technologies
   ========================================= */

var dropdowns = document.querySelectorAll(
  '.header__menu-item--dropdown'
);

function closeDropdown(menu) {
  var toggle = menu.querySelector('.header__dropdown-toggle');

  menu.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}

dropdowns.forEach(function (menu) {
  var toggle = menu.querySelector('.header__dropdown-toggle');

  if (!toggle) return;

  toggle.addEventListener('click', function () {
    var wasOpen = menu.classList.contains('is-open');

    // Close any other open dropdowns
    dropdowns.forEach(closeDropdown);

    // Open the selected dropdown if it was closed
    if (!wasOpen) {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close the dropdown with Escape
  menu.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      closeDropdown(menu);
      toggle.focus();
    }
  });
});

// Close dropdowns when clicking elsewhere
document.addEventListener('click', function (event) {
  dropdowns.forEach(function (menu) {
    if (!menu.contains(event.target)) {
      closeDropdown(menu);
    }
  });
});
