
/** Hides articles in favor of another **/
function showArticle(article) {
	$('body > article').hide();
	$('article' + article).show();
	document.title = $('article' + article + ' h2').html().replace('&amp;', '&') + ' :: SmartLogic';
	window.scrollTo(0, 0);
	_gaq.push(['_trackPageview'], article.replace(/#/g, '/'));
}

/** Loads selected article and portfolio item, if any **/
function loadStateFromHash() {
	if (window.location.hash) {
		var article = (window.location.hash.indexOf('/') > 0) ?
			window.location.hash.substring(0, window.location.hash.indexOf('/')) :
			window.location.hash;
		if ($('article' + article)) {
			showArticle(article);
		}
	} else {
		showArticle('#services');
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
	var imageWidth = figure.children('img').width() + 'px';
	figure.css('width', imageWidth);	
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
	
	// load initial state
	loadStateFromHash();
	
	// detect when the hash changes and react accordingly --> catch fwd/back buttons and all clicks to another article
	$(window).bind('hashchange', loadStateFromHash);
	
	// Open lightbox when appropriate link is clicked
	$('#portfolio aside a:first-child, #portfolio article a').click(function(e) {
		e.stopPropagation();
		showPortfolioImages($(this).attr('href'));
		e.preventDefault();
	});

});

// CONTACT FORM - show message when form is submitted & iframe back-button issue

function submitMessage() {
	$("#contact form input, #contact form textarea").hide();
	$("#contact form").append("<strong>Thank you, your comments have been received.</strong>")
}

function iframeBack() {
	var fakeTarget = document.getElementById("fake-target");
	if (fakeTarget.contentWindow.location.href == undefined) {
		window.history.back();
	}
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
