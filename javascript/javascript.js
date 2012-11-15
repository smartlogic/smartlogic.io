/** Support and redirect the old links **/
function redirectOldLinks() {
  // hash table of old to new links
  var newLinks = new Object();
  newLinks['/#home']          = '/index.html';
  newLinks['/#process-tools'] = '/process-and-tools.html';
  newLinks['/#portfolio']     = '/portfolio.html';
  newLinks['/#team']          = '/team.html';
  newLinks['/#contact']       = '/contact.html';
  newLinks['/#community']     = '/community.html';
  // redirect!
  var oldUrl = window.location.href.substring(window.location.href.lastIndexOf("/"));
  if (newLinks.hasOwnProperty(oldUrl)) {
    window.location = newLinks[oldUrl];
  }
}
redirectOldLinks();

/** Dropdown site navigation for mobile browsers **/
function mobileNavDropdownChange() {
  var selectedArticle = $('header nav select').val();
  window.location = selectedArticle;
}

/** Display current page in navigation dropdown menu **/
function selectCurrentPage() { 
  var numberOfDropdownOptions = $('option').size();
  var fileName = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
  for(i=1; i<=numberOfDropdownOptions; i++) {
    var dropdownOptionValue = $('option:nth-child(' + i + ')').attr('value');
    if(dropdownOptionValue == fileName) {
      $('option:nth-child(' + i + ')').attr('selected', 'selected');
    }
  }
}

/** Loads the selected portfolio item's images **/
function showPortfolioImages(portfolioItem) {
	_gaq.push(['_trackPageview'], portfolioItem.replace(/#/g, '/').replace(/\\/g, ''));
	portfolioItem = portfolioItem.replace(/\//g, "\\/");
	openLightBox(portfolioItem);
	$(window).keydown(function(e) { handleLightBoxKeyPresses(e, portfolioItem); });
	$('html').click(function() { closeLightBox(portfolioItem); });
	$(portfolioItem).click(function(e) { e.stopPropagation(); });
	$(window).resize(function(e) { positionFigure(); });
}

function handleLightBoxKeyPresses(e, portfolioItem) {
	var key = e.which ? e.which : e.keyCode;
	switch (key) {
		case 27: // Escape key
			closeLightBox(portfolioItem);
			break;
		case 37: // Left arrow
			showPreviousPortfolioImage(portfolioItem);
			break;
		case 39: // Right arrow
			showNextPortfolioImage(portfolioItem);
			break;
	}
}

function showNavButtons(figure) {
	var id = figure.parent().attr('id').replace(/\//g, "\\\\/");
	figure.prepend("<a href='#' class='lightbox-left-arrow' onclick='javascript:showPreviousPortfolioImage(\"#" + id + "\"); return false;'></a>");
	figure.append("<a href='#' class='lightbox-right-arrow' onclick='javascript:showNextPortfolioImage(\"#" + id + "\"); return false;'></a>");
}

function removeNavButtons(figure) {
	figure.find('a').remove();
}

function positionFigure(figure) {
	if (!figure) figure = $('#portfolio figure').filter(':visible');
	figure.css('left', ($(window).width() - figure.width()) / 2);
}

function openLightBox(portfolioItem) {
	$(portfolioItem).show();
	var figure = $(portfolioItem + " figure").first();
	figure.show();
	$('body').append('<div class="lightmybox"></div>');
	$('body').addClass('myboxislit');
	positionFigure(figure);
	showNavButtons(figure);
}

function closeLightBox(portfolioItem) {
	removeNavButtons($(portfolioItem + " figure").filter(':visible'));
	$(portfolioItem).hide();
	$(portfolioItem + " figure").hide();
	$('.lightmybox').remove();
	$('body').removeClass('myboxislit');
	$(window).unbind('keydown');
	$('html').unbind('click');
	$(portfolioItem).unbind('click');
	$(window).unbind('resize');
}

function showPreviousPortfolioImage(portfolioItem) {
	var figure = $(portfolioItem + " figure").filter(':visible');
	removeNavButtons(figure);
	figure.hide();
	figure = (figure.prev().is('figure')) ? figure.prev() : $(portfolioItem + " figure").last();
	figure.show();
	positionFigure(figure);
	showNavButtons(figure);
}

function showNextPortfolioImage(portfolioItem) {
	var figure = $(portfolioItem + " figure").filter(':visible');
	removeNavButtons(figure);
	figure.hide();
	figure = (figure.next().is('figure')) ? figure.next() : $(portfolioItem + " figure").first();
	figure.show();
	positionFigure(figure);
	showNavButtons(figure);
}

$(document).ready(function() {
	
  // detect when mobile navigation dropdown is changed
  $('header nav select').bind('change', mobileNavDropdownChange);
  
  // select current page in navigation dropwdown
  selectCurrentPage();

	// if browser is wider than 670px, open lightbox when appropriate link is clicked
	$('#portfolio aside a:first-child, #portfolio > article > a').click(function(e) {
    var documentWidth = $(document).width();
    if(documentWidth >= 670) {
		  showPortfolioImages($(this).attr('href'));
    } 
    e.stopPropagation();
    e.preventDefault();
	});

});

// CONTACT FORM - show message when form is submitted & iframe back-button issue

function submitMessage() {
	$("#contact form input, #contact form textarea").hide();
	$("#contact form").append("<strong>Thank you, we'll be in touch shortly!</strong>");
  _gaq.push(['_trackPageview', '/thankyou']);
	document.getElementById("google-adwords-fake-target").src = "thank-you.html";
}

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-466947-1']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
