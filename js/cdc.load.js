var CDC = CDC || {};
CDC.load = CDC.load || (function (l, v, c) {
	var args = [], //.slice.apply(arguments);
		library = l.toLowerCase(),
		b = (typeof v !== 'undefined') ? v.split('.') : [],
		major = parseInt(b[0], 10),
		minor = parseInt(b[1], 10),
		point = parseInt(b[2], 10),
		callback = typeof c !== 'undefined' ? true : false,
		approved = true,
		libs = approved ? 'json/cdc.approved.libs.json' : 'json/cdc.libs.json',
		path = '/TemplatePackage/3.0/js/versions/';

	// if we have a callback and it's not a function, throw an error    
	if (callback && typeof c !== 'function') {
		throw ': Callback is not a function!';
	}

	// small helper function to build the script reference    
	var buildScript = function (build, script) {
		//IE will only make the AJAX call once, breaking the script on reload - the nocache prevents this
		var src = path + library + '/' + build + '/' + script + '?nocache=' + new Date().getTime(),
			l = document.createElement('script'),
			s = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
		l.type = 'text/javascript';
		l.async = false;                 //TODO: variable
		l.src = src;
		s.appendChild(l, s);

        if (l.readyState) {
            l.onreadystatechange = function () {
                if (l.readyState == 'loaded' || l.readyState == 'complete') {
                    l.onreadystatechange = null;
					if (callback) {
						c.apply(this, args);
					}
                }
            };
        } 
        else {
            l.onload = function () {
				if (callback) {
					c.apply(this, args);
				}
            };
        }
	};

	// callback may contain params, account for them
	if (arguments.length > 3) {
		for (var i = 3, max = arguments.length; i < max; i++) {
			args.push(arguments[i]);
		}
	}

	// what library version are they looking for?
	// Could combine this with the switch, but seems more obvious this way
	var version = 0;
	if (major !== 'undefined' && !isNaN(major)) {
		// latest version of major release
		version = 1;
		if (minor !== 'undefined' && !isNaN(minor)) {
			// latest version of minor release
			version = 2;
			if (point !== 'undefined' && !isNaN(point)) {
				// specific version
				version = 3;
			}
		}
	}

	var processJSON = function(libraries) {
		// make sure the library variable is defined
		if (typeof libraries[library] !== 'undefined') {
			switch (version) {
				case 0:
					// version wasn't defined, just grab the latest             
					for (x in libraries[library].versions) {
						var tmp = x.split('.')[0];
						buildScript(x, libraries[library].versions[x].compressed);
						break;
					}
					break;
				case 1:
					// major version defined

					// see a release with only the major version exists
					if (typeof libraries[library].versions[v] !== 'undefined') {
						buildScript(libraries[library].versions[v].compressed);
					} else {
						// if not, loop over all the versions of that library and match the majors
						for (x in libraries[library].versions) {
							var tmp = x.split('.')[0];
							if (tmp === v) {
								buildScript(x, libraries[library].versions[x].compressed);
								break;
							}
						}
					}
					break;
				case 2:
					// major and minor versions defined 

					// see a release with the major & minor version exists
					if (typeof libraries[library].versions[v] !== 'undefined') {
						buildScript(libraries[library].versions[v].compressed);
					} else {
						// if not, loop over all the versions of that library and match the version
						for (x in libraries[library].versions) {
							var tmp = x.slice(0, -2);
							if (tmp === v) {
								buildScript(x, libraries[library].versions[x].compressed);
								break;
							}
						}
					}
					break;
				case 3:
					// all 3 build values exist, only look for a match
					if (typeof libraries[library].versions[v] !== 'undefined') {
						buildScript(v, libraries[library].versions[v].compressed);
					}
					break;
				default:
					throw ': Could not determine version!';
			}
		}		
	}

	//JSON polyfill
	if(!window.JSON){window.JSON={parse:function(sJSON){return eval("("+sJSON+")")},stringify:function(e){if(e instanceof Object){var t="";if(e.constructor===Array){for(var n=0;n<e.length;t+=this.stringify(e[n])+",",n++);return"["+t.substr(0,t.length-1)+"]"}if(e.toString!==Object.prototype.toString){return'"'+e.toString().replace(/"/g,"\\$&")+'"'}for(var r in e){t+='"'+r.replace(/"/g,"\\$&")+'":'+this.stringify(e[r])+","}return"{"+t.substr(0,t.length-1)+"}"}return typeof e==="string"?'"'+e.replace(/"/g,"\\$&")+'"':String(e)}}}
	var libraries,
		xmlhttp;

	xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				libraries = JSON.parse(xmlhttp.responseText);
				processJSON(libraries);
			} 
			else {
				console.log('Error getting JSON: ', xmlhttp.status);
			}
		}
	}

	xmlhttp.open('GET', libs, true);
	xmlhttp.send();

	return;

});
