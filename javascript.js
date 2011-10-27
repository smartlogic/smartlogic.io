/** Hides articles in favor of another **/
function showArticle(article) {
	$('body > article').hide();
	$('body > div > article').hide();
	$('article' + article).show();
	document.title = $('article' + article + ' h2').html() + ' :: SmartLogic';
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

$(document).ready(function() {
	
	// load initial state
	loadStateFromHash();
	
	// detect when the hash changes and react accordingly --> catch fwd/back buttons
	$(window).bind('hashchange', loadStateFromHash);
	
	// when you click a nav link show the associated article
	$('body > nav > a').click(function() {
		showArticle($(this).attr('href'));
	});
	
});
