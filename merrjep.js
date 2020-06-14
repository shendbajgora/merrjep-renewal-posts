// Step 1: Install google chrome extension 'cjs': https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija?hl=en
// Step 2: Insert code inside cjs
// Step 3: Have fun (works only for merrjep renewal posts)

var wind = window,
	domain = wind.location.hostname;

if (domain.indexOf('merrjep') > -1) {	  
	
	initScript();
}

// Init script
function initScript() {

	var url = decodeURIComponent(window.location.href);

	// Confirm page
	if (url.toLowerCase().indexOf('konfirmimi') > -1) {
		closePage();
	}

	// Renewal page
	else if (url.toLowerCase().indexOf('rregullim-i-shpalljes') > -1) {
		renewalPost();
	}

	// Loop posts
	else if (url.indexOf('incView=~/Views/Advertiser/Index.cshtml') > -1 && 
			 url.indexOf('incView=~/Views/Advertiser/My_Ads.cshtml') > -1) {
		loopPosts();
	}
}

// Close page
function closePage() {
	
	wind.close();
}

// Get posts
function getPosts() {
    return document.querySelectorAll('.my-ads-layout > table > tbody > tr > td:nth-child(2) > .btn-toolbar > a:last-child');
}

// Renewal post
function renewalPost() {

	document.querySelector('input[value="Renewal"]').click();

	setTimeout(function() {
		
		var btns = document.querySelectorAll('input[type="submit"]');

		btns.forEach(function(btn) {
			
			btn.click();
		});
	}, 100);
}

// Loop posts
function loopPosts() {
	// Method 1: Loop all
	// loopAll(aTags);

	// Method 2: Loop one by one every x miliseconds
	loopEachPosts(1000); // delay 1000 miliseconds
}

// Method 1: Loop all
function loopAll(aTags) {

	aTags.forEach(function(aTag) {
		
		var aHref = aTag.getAttribute('href');

		wind.open(aHref);
	});

	reloadPage(30000); // Reload page after 30 seconds.
}

// Method 2: Loop one by one every x miliseconds
function loopEachPosts(miliseconds) {

	var counter = 0,
		posts = getPosts(),
		rightArrow = document.querySelectorAll('.pagination .pull-left')[2],
		synced = true,
		interval = setInterval(function() {

			if (!synced) {
				return;
			}

			if (counter < posts.length) {
                wind.open(posts[counter++].getAttribute('href'));
			} else if (rightArrow) {

				rightArrow.click();
				synced = false;

				setTimeout(function(){
                    counter = 0;
                    posts = getPosts();

                    if (posts.length < 50) {
                        rightArrow = null;
                    }

                    synced = true;
				}, 2000);
			} else {
				clearInterval(interval);
                reloadPage(0);
			}
		}, miliseconds);
}

// Reload page
function reloadPage(miliseconds) {
	
	setTimeout(function() {
		
		location.reload();
	}, miliseconds);
}

