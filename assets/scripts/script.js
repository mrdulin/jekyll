$(function() {
	var site = {
		origin: window.location.origin,
		baseUrl: '/blog',
		isLocal: true,
		onlineIndexUrl: ''
	};

	site.isLocal = site.origin.indexOf('github') === -1;
	if(!site.isLocal) {
		site.onlineIndexUrl = site.origin + site.baseUrl;
	}

	var $postTag = $('.post-tag'),
		$returnTopBtn = $('#returnTopBtn'),
		$container = $('#container'),
		$categoryItem = $('.category-name'),
		$hotPostContainer = $('.ds-top-threads'),
		$fullScreenBtn = $('#full-screen'),
		$postTitles = $('.post-title'),
		$pre = $('.highlight').find('pre');

	$pre.mCustomScrollbar({
		axis:"x",
		theme:"3d-thick-dark",
		mouseWheel: false,	
		scrollButtons: true,
		scrollInertia: 0
	});

	$fullScreenBtn.text('开启全屏')
	.on('click', function(e) {
		toggleFullScreen(e.target);
	});

	function isFullScreen() {
	    return (document.fullScreenElement && document.fullScreenElement !== null)
	         || document.mozFullScreen
	         || document.webkitIsFullScreen;
	}

	function requestFullScreen(element){
	    if (element.requestFullscreen)
	        element.requestFullscreen();
	    else if (element.msRequestFullscreen)
	        element.msRequestFullscreen();
	    else if (element.mozRequestFullScreen)
	        element.mozRequestFullScreen();
	    else if (element.webkitRequestFullscreen)
	        element.webkitRequestFullscreen();
	}

	function exitFullScreen(){
	    if (document.exitFullscreen)
	        document.exitFullscreen();
	    else if (document.msExitFullscreen)
	        document.msExitFullscreen();
	    else if (document.mozCancelFullScreen)
	        document.mozCancelFullScreen();
	    else if (document.webkitExitFullscreen)
	        document.webkitExitFullscreen();
	}

	function toggleFullScreen(element){
	    if (isFullScreen()) {
	    	exitFullScreen();
	    	$(element).text('开启全屏');
	    } else {
	    	requestFullScreen(document.documentElement);
	    	$(element).text('退出全屏');
	    }
	        
	}

	$container.on('scroll', function(e) {
		var that = this,
			scrollTop = $(that).scrollTop();
		if (scrollTop) {
			$returnTopBtn.stop(true, true)
						.fadeIn();
		} else {
			$returnTopBtn.stop(true, true)
						.fadeOut();
		}
	});

	$returnTopBtn.on('click', function(e) {
		var that = this;
		$container.animate({
			scrollTop: '0'
		}, {
			duration: 'fast',
			easing: 'swing'
		});
	});

	$postTag.on('dragstart', function() {
		return false;
	});

	$hotPostContainer.on('click', 'a' ,function(e) {
		var link, href, postUrl, newUrl;
		link = e.target;
		href = link.href;
		if(href.indexOf(site.origin) !== -1) return ;
		postUrl = '/' + href.replace('http://', '');
		newUrl = site.isLocal ? site.origin + postUrl : site.onlineIndexUrl + postUrl;
		link.href = newUrl;
	});

});