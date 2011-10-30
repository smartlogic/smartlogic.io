
/** Hides articles in favor of another **/
function showArticle(article) {
	$('body > article').hide();
	$('body > div > article').hide();
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
	$(portfolioItem).show();
	var whoToShow = $(portfolioItem + " figure:first-child");
	whoToShow.show();
	$('body').append('<div class="lightmybox"></div>');
	$('body').addClass('myboxislit');
	window.scrollTo(0, 0);
	$(window).keydown(function(e) {
		var key = e.which ? e.which : e.keyCode;
		switch (key) {
			case 27:
				$(portfolioItem).hide();
				$(portfolioItem + " figure").hide();
				$('.lightmybox').remove();
				$('body').removeClass('myboxislit');
				$(window).unbind('keydown');
				break;
			case 37:
				whoToShow.hide();
				whoToShow = (whoToShow.prev().length != 0) ? whoToShow.prev() : $(portfolioItem + " figure:last-child");
				whoToShow.show();
				break;
			case 39:
				whoToShow.hide();
				whoToShow = (whoToShow.next().length != 0) ? whoToShow.next() : $(portfolioItem + " figure:first-child");
				whoToShow.show();
				break;
		}
	});
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
	
	// deal with portfolio stuff
	// TODO: choose a better selector here
	$('#portfolio aside a:first-child').click(function() {
		showPortfolioImages($(this).attr('href'));
	});

});
