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
		loopEachPosts(100); // delay 1000 miliseconds
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

// Method 2: Loop one by one every x miliseconds
function loopEachPosts(miliseconds) {

	var counter = 0,
		posts = getPosts(),
		completed = false,
		synced = true,
		interval = setInterval(function() {

			if (!synced) {
				return;
			}

			if (counter < posts.length) {
               	wind.open(posts[counter++].getAttribute('href'));
			} else {
				
				var ranges = document.querySelector('.pagination .pull-left');
				
				if (ranges && !completed) {
					
					var values = ranges.innerText
						.replace(" - ", ",")
						.replace(" nga ", ",").split(","),
							from = parseInt(values[1]),
							to = parseInt(values[2]);
					
					if (values && values.length === 3 && from < to) {
						synced = false;
						document.querySelectorAll('.pagination .pull-left')[2].click();
					} else {
						completed = true;
					}
					
					setTimeout(function(){
						counter = 0;
						posts = getPosts();
						synced = true;
					}, 3000);
				} else {
					clearInterval(interval);
                	reloadPage(0);	
				}
			}
		}, miliseconds);
}

// Reload page
function reloadPage(miliseconds) {
	
	setTimeout(function() {
		
		location.reload();
	}, miliseconds);
}

