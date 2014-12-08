var RAINLAYOUT = RAINLAYOUT || {};

RAINLAYOUT.settings = {
		
	template: "<img src=\"{{image.src}}\" height=\"{{image.height}}\" /><p>{{description}}</p>",

	//how many droplets per row
	maxDroplets: 5,

	//space between droplets
	guttering: 10,

	dropletWidth: 200,

	//starting value for top
	top: 0

};

RAINLAYOUT.core = (function(){

	function start(parent, data){
		if(parent === null || parent === undefined) {
			console.log("RAIN: Invalid parent");
			return;
		}

		if(data === null || data === undefined){
			console.log("RAIN: No data");
			return;
		}

		parent.html("");
		
		for(var i = 0; i < data.length; i++){
			RAINLAYOUT.droplet.create(data[i], parent);
		}
	}

	/*	
		@description renders the droplet elements
		@param(parent) the parent element
		@param(options) overridable options
	*/
	function pour(parent, data, options){
		
		if(options){  

			if(options.template){
				RAINLAYOUT.settings.template = options.template;
			}
			if(options.maxDroplets){
				RAINLAYOUT.settings.maxDroplets = options.maxDroplets;
			}
			if(options.guttering){
				RAINLAYOUT.settings.guttering = options.guttering;
			}
			if(options.dropletWidth){
				RAINLAYOUT.settings.dropletWidth = options.dropletWidth;
			}
			if(options.top){
				RAINLAYOUT.settings.top = options.top;
			}

		}

		RAINLAYOUT.droplet.resetGlobals();
		start(parent, data);
	}

	return {
		pour: pour
	};

}());

//module.exports.core = RAINLAYOUT.core;