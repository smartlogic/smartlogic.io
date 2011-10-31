
/** Hides articles in favor of another **/
function showArticle(article) {
	$('body > article').hide();
	$('article' + article).show();
	document.title = $('article' + article + ' h2').html().replace('&amp;', '&') + ' :: SmartLogic';
	window.scrollTo(0, 0);
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
		showArticle('#about');
	}
}

/** Loads the selected portfolio item's images **/
function showPortfolioImages(portfolioItem) {
	portfolioItem = portfolioItem.replace(/\//g, "\\/");
	openLightBox(portfolioItem);
	$(window).keydown(function(e) { handleLightBoxKeyPresses(e, portfolioItem); });
	$('html').click(function() { closeLightBox(portfolioItem); });
	$(portfolioItem).click(function(e) { e.stopPropagation(); });
}

function handleLightBoxKeyPresses(e, portfolioItem) {
	var key			= e.which ? e.which : e.keyCode;
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
	figure.prepend("<a href='#' onclick='javascript:showPreviousPortfolioImage(\"#" + id + "\"); return false;'></a>");
	figure.append("<a href='#' onclick='javascript:showNextPortfolioImage(\"#" + id + "\"); return false;'></a>");
}

function removeNavButtons(figure) {
	figure.find('a').remove();
}

function openLightBox(portfolioItem) {
	$(portfolioItem).show();
	$(portfolioItem + " figure").first().show();
	$('body').append('<div class="lightmybox"></div>');
	$('body').addClass('myboxislit');
	showNavButtons($(portfolioItem + " figure").first());
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
}

function showPreviousPortfolioImage(portfolioItem) {
	var currentFigure = $(portfolioItem + " figure").filter(':visible');
	removeNavButtons(currentFigure);
	currentFigure.hide();
	currentFigure = (currentFigure.prev().is('figure')) ? currentFigure.prev() : $(portfolioItem + " figure").last();
	currentFigure.show();
	showNavButtons(currentFigure);
}

function showNextPortfolioImage(portfolioItem) {
	var currentFigure = $(portfolioItem + " figure").filter(':visible');
	removeNavButtons(currentFigure);
	currentFigure.hide();
	currentFigure = (currentFigure.next().is('figure')) ? currentFigure.next() : $(portfolioItem + " figure").first();
	currentFigure.show();
	showNavButtons(currentFigure);
}

$(document).ready(function() {
	
	// load initial state
	loadStateFromHash();
	
	// detect when the hash changes and react accordingly --> catch fwd/back buttons
	$(window).bind('hashchange', loadStateFromHash);
	
	// when you click a nav link show the associated article
	$('body > nav > a').click(function() {
		showArticle($(this).attr('href'));
	});
	
	// TODO: choose a better selector here
	$('#portfolio aside a:first-child').click(function(e) {
		e.stopPropagation();
		showPortfolioImages($(this).attr('href'));
		return false;
	});

});
