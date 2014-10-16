// wait for jquery to load
function $$(e){if(window.$){e()}else{setTimeout(function(){$$(e)},50)}}

// helper function to split querystring into usable bits
window.GetQueryString=function(e){e=e.indexOf("?")>-1?e.split("?")[1]:e;return function(e){if(e=="")return{};var t={};for(var n=0;n<e.length;++n){var r=e[n].split("=");if(r.length!=2)continue;t[r[0]]=decodeURIComponent(r[1].replace(/\+/g," "))}return t}(e.split("&"))}

// helper function to extract path from url
window.GetPathName=function(e){var t="";if(e){t=e.split("?")[0].split("#")[0]}else{t=window.location.pathname}return t}

// allows us to wait for jquery to load, but removes plugin from global scope (can't call $.pluginname)
$$(function() {
	// elements we'll apply formatting to
	var cdcfeeds = $('.cdc-feed'),
		hasfeeds = cdcfeeds;
	
	// variable without var puts it in global
	CDCFeed = $.fn.CDCFeed = function (obj, opt) {
		var config = $.extend({
			href: "http://www2c.cdc.gov/podcasts/feed.asp",						// url of the feed
			format: 'json',														// format of feed
			feedid: 0,
			maxcount: 5,														// max number of items to display
			characterlimit: 0,				// character limit on the content
			titlelinktarget: '_blank',		// target of link (also heading)
			dateformat: '',					// http://momentjs.com/docs/#/displaying/format/
			dateformatlang:'en',			// language for date format
			feedtype: 'cdc',				// cdc,google,facebook,twitter...
			template: '',
			target: '_self'					// _blank, _self, _parent, _top, framename
		}, opt);

		// values used in the building of the output
		var qs = window.GetQueryString(config.href),
			url = BuildFeedUrl(config, qs),
			protocol = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
			scheme   = /(^|[^\/])(www\.[\S]+(\b|$))/gim,
			hash = /#(\S*)/gim,
			at = /@(\S*)/gim;		// TODO: remove ends in :

		//Handlebars helper to set anchors based off text
		Handlebars.registerHelper('enhance', function(text) {
			text = text.replace(protocol, '<a href="$1" target="' + config.target + '">$1</a>');
			text = text.replace(scheme,   '$1<a href="http://$2" target="' + config.target + '">$2</a>');
			text = text.replace(hash, '#<a href="http://twitter.com/#!/search/$1" target="' + config.target + '">$1</a>');
			//text = text.replace( hash, '#<a href="http://twitter.com/search?q=$1&src=hash" target="' + config.target + '">$1</a>');
			text = text.replace(at, '@<a href="http://twitter.com/$1" target="' + config.target + '">$1</a>');

			//https://twitter.com/TIMEHealth
			//https://twitter.com/search?q=%23CDCintheField&src=hash
			
			return new Handlebars.SafeString(text);
		});

		Handlebars.registerHelper('decode', function(text) {
			// TODO: this should decode the HTML entities, but seems to get confused on the anchor
			var decoded = $("<textarea />").html(text).text();

			decoded = decoded.replace(hash, '#<a href="https://www.facebook.com/hashtag/$1/" target="' + config.target + '">$1</a>');
			return decoded;
		});

		// Attempt to use a standard method for decoding the facebook hrefs returned in the feeds, which isn't 
		// any better than the jQuery method...
		var decodeEntities = (function() {
		  // this prevents any overhead from creating the object each time
		  var element = document.createElement('div');

		  function decodeHTMLEntities (str) {
		    if(str && typeof str === 'string') {
		      // strip script/html tags
		      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
		      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
		      element.innerHTML = str;
		      str = element.textContent;
		      element.textContent = '';
		    }

		    return str;
		  }
		  return decodeHTMLEntities;
		})();		

		//Handlebars helper to format dates
		//moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
		//usage: {{dateFormat creation_date format="MMMM YYYY"}}
		Handlebars.registerHelper('dateFormat', function(context, block) {
			if (window.moment) {
				var f = block.hash.format || config.dateformat;
				return moment(context).format(f);
			}
			else {
				return context;   // moment not available, return as is.
			}
		});

		Handlebars.registerHelper('each', function(context, options) {
			var ret = "";

			for(var i=0, j=context.length; i<j; i++) {
				ret = ret + options.fn(context[i]);
			}

			return ret;
		});

		// NOTE: the facebook feed doesn't seem to honor maxcount/maxnumber?
		// Limit the results to a range 
		Handlebars.registerHelper('range', function (from, to, context, options) {
			var item = "";
			for (var i = from, j = to; i < j; i++) {
				item = item + options.fn(context[i]);
			}
			return item;
		});

		// properties shared across the feed types
		var description, entries, output, template;

		// properties shared across entry types
		var categories, content, link, pubdate, title;

		// clear out the default text and add a loading indicator
		// WARN: don't use this one!
		//obj.empty().append('<img src="http://preloaders.net/preloaders/45/4%20Segments.gif" />');

		// get the template file from the feed type
		var templatefile;
		$.get('templates/' + config.feedtype + '.handlebars.html', function(d) {
			templatefile = d;
		});

		$.ajax({
			url: url,
			dataType: config.format,
			success: function (data) {
				// google
				if(data.responseData) {
					template = Handlebars.compile(templatefile, data.responseData.feed);
					output = template(data.responseData.feed);
				}
				else {
					// everything else
					template = Handlebars.compile(templatefile, data);
					output = template(data);
				}

				obj.html(output);
			}
		});
	}

	// This little bit of nonsense rebuilds the url for the feed based on the values passed
	// Users could potentially define a value, and have the value exist in the href; we can't use both!
	// 1. Assume config has greater precidence than URL
	var BuildFeedUrl = function(config, qs) {
		var href = GetPathName(config.href).toLowerCase();

		//example urls
		//http://www2c.cdc.gov/podcasts/feed.asp?feedid=442&maxnumber=100&pagesize=100&format=json&callback=?
		//http://www2c.cdc.gov/podcasts/feed.asp&feedid=198&maxnumber=1&format=json&callback=?
		if(config.feedtype === 'google') {
			href = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + config.maxcount + '&output=' + config.format + '&q=' + encodeURIComponent(config.href) + '&hl=en&callback=?' 
		}
		else {
			// check for parameters which must appear in the url if they're available
			if(typeof config.feedid !== 'undefined' && config.feedid !== 0) {
				href += '?feedid=' + config.feedid;
			}
			else {
				if(typeof qs.feedid !== 'undefined') {
					href += '?feedid=' + qs.feedid;
				}
				else {
					console.log('Feed ID not found, skipping');
					return false;
				}
			}

			if(typeof config.maxcount !== 'undefined') {
				href += '&maxnumber=' + config.maxcount;
			}
			else {
				if(typeof qs.maxnumber !== 'undefined') {
					href += '&maxnumber=' + qs.maxnumber;
				}
			}
			
			if(typeof config.format !== 'undefined') {
				href += '&format=' + config.format;
			}
			else {
				if(typeof qs.format !== 'undefined') {
					href += '&format=' + qs.format;
				}
				else {
					href += '&format=json'; 
				}
			}

			if(typeof config.callback !== 'undefined') {
				href += '&callback=' + config.callback;
			}
			else {
				if(typeof qs.callback !== 'undefined') {
					href += qs.callback === '' ? '&callback=?' : '&callback=' + qs.callback;
				}
				else {
					href += '&callback=?';  
				}
			}
		}

		return href;
	}

	// grab all the feeds on the page
	if(cdcfeeds) {
		cdcfeeds.each(function() {
			var t = $(this),
				d = t.data();
			if(d) {
				t.CDCFeed(t, d);
			}
			else {
				console.log('script does not appear to be configured properly');
			}
		});
	}	
});
