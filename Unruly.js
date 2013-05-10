/**
 * Rule Scrape
 *
 * Find potential CSS rules in source code and compare them to rules in a
 * CSS or LESS source file to find potentially unused code 
 * 
 * Usage:
 * 	node RuleScrape -c [css/less files] -s [source files]
 * 
 */

// Load required libraries
 var glob = require("glob");
 var fs = require("fs");

 
 //Initialize default variables and regexes for matching
 var sourceClassRegex = new RegExp("class[ ]*=[ ]*[\"'][A-Za-z0-9 _-]*['\"]","igm");
 var sourceIdRegex = new RegExp("id[ ]*=[ ]*[\"'][A-Za-z0-9_-]*['\"]","igm");
 
 var cssClassRegex = new RegExp("\.[A-Za-z0-9-_]+","igm");
 var cssIdRegex = new RegExp("#[A-Za-z0-9-_]+","igm");

 var cssRules = {};
 var usedRules = {};


 var args = process.argv;
 if (args.length < 4){
 	console.log("Needs source files.");
 }

 //Start parsing the arguments and storing the file names.
 args.slice(2).forEach(function(arg){
 	if (arg == "-c"){
 		mode = "css";
 	} else if (arg == "-s"){
 		mode = "src";
 	} else {
 		if (mode == "src"){
 			handleSourceFileInput(arg);
 		} else if (mode == "css"){
 			handleCssFileInput(arg);
 		}
 	}
 });


var mode = "";

function handleCssFileInput(filename){
	files = glob.sync(filename);

	for (var i = 0; i < files.length; i++){
		parseCss(files[i]);
	}
}

function handleSourceFileInput(filename){
	files = glob.sync(filename);

	for (var i = 0; i < files.length; i++){
		parseSrc(files[i]);
	}
}

function parseCss(filename){
	var contents = ""+fs.readFileSync(filename);
	var classes = contents.match(cssClassRegex);
	var ids = contents.match(cssIdRegex);


	for (var i = classes.length - 1; i >= 0; i--) {
		cssRules[classes[i]] = 1;
	};

	for (var i = ids.length - 1; i >= 0; i--) {
		cssRules[ids[i]] = 1;
	};


}

function parseSrc(filename){
	var contents = ""+fs.readFileSync(filename);
	var classes = contents.match(sourceClassRegex);
	var ids = contents.match(sourceIdRegex);


	for(var i = 0; i < ids.length; i++){
		var rule;
		if (ids[i].indexOf("'") > 0){
			rule = "#"+ids[i].substring(ids[i].indexOf("'")+1,ids[i].length-1);
		} else {
			rule = "#"+ids[i].substring(ids[i].indexOf('"')+1,ids[i].length-1);
		}
		usedRules[rule] = 1;
	}

	for(var i = 0; i < classes.length; i++){
		var rule;
		if (classes[i].indexOf("'") > 0){
			rule = classes[i].substring(classes[i].indexOf("'")+1,classes[i].length-1);
		} else {
			rule = classes[i].substring(classes[i].indexOf('"')+1,classes[i].length-1);
		}
		var rules = rule.split(" ");
		for (var j = 0; j < rules.length; j++) {
		 	usedRules["."+rules[j]] = 1;
		 };
	}
}

//console.log(cssRules);
//console.log(usedRules);

for (rule in cssRules) {
	if (!usedRules[rule]){
		console.log(rule);
	}
};

