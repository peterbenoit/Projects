var inc = {
	list : [],                                  //List of scripts
	load : function(scriptArray, callback) {     //Load array of scripts, with callbackoption
		var params = {},
		callback = callback || (function(){}),
		t = this,
		script;
		try {
			//Check if this script is already loaded
			for (i in t.list) {
				if (t.list[i] === scriptArray[0]){
					scriptArray.shift();    			//Remove it from loading queue
				}
			}
			if (scriptArray.length === 0) {
				callback(params);
				return ;
			} 
			else {
				script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = scriptArray[0];
				script.async = true;
				document.body.appendChild(script);
				t.list.push(scriptArray[0]);
				scriptArray.shift();
				t.load(scriptArray, callback);
				return;
			}
		} 
		catch(e) {
			console.log("error: " + e);
			return false;
		}
	}
};