var RAINLAYOUT = RAINLAYOUT || {};

if(!String.prototype.format){
	
	String.prototype.format = function(arr){
		var regex = /\{{1}\d\}{1}/gi;

		var result = this.match(regex);
		var str = this;

		for(var i = 0; i<result.length; i++){			
			str = str.replace(result[i], arr[i]);
		}

		return str;
	};

}

(function($){

	var CONSTANTS = {
		
		styleTag: "[style]",

		baseTemplate: "<div style=\"[style]\" class=\"rain-droplet\">{0}</div>"

	};

	RAINLAYOUT.droplet = (function(){

		var GLOBALS = {
			lastRow: [],
			currentRow: [],
			totalRowWidth: 0,
			top: 0,
			rowCount: 0,
			margin: 0
		};

		function resetGlobals(){
			GLOBALS.lastRow = [];
			GLOBALS.currentRow = [];
			GLOBALS.totalRowWidth = 0;
			GLOBALS.top = 0;
			GLOBALS.rowCount = 0;
			GLOBALS.margin = 0;				
		}


		/*	
			@description renders droplet html using settings.template
			@param(item) the item data
			@param(style) the style for the encapsulating div
		*/
		function renderFromTemplate(item, style){
			var regex = /\{{2}[\w|\.]*\}{2}/gi;
			var result = RAINLAYOUT.settings.template.match(regex);

			var thisTemplate = CONSTANTS.baseTemplate.format([RAINLAYOUT.settings.template]);
			thisTemplate = thisTemplate.replace(CONSTANTS.styleTag, style);

			if(!result) {
				return thisTemplate;
			}

			for(var i = 0; i< result.length; i++){
				var rawVariable = result[i];
				var variable = rawVariable.replace("{{", "").replace("}}", "");
				var value = "";

				if(variable.indexOf(".") === -1){
					value = item[variable];
				}else{
					var params = variable.split(".");
					value = item[params[0]][params[1]];
				}

				thisTemplate = thisTemplate.replace(rawVariable, value);
			}

			return thisTemplate;
		}


		/*	
			@description create the droplet style
			@param(parent) the droplet's width
			@return the style string
		*/
		function createDropletStyle(dropletWidth){
			var style = "position: absolute; top: {0}px; width: {1}px;".format([GLOBALS.top, dropletWidth]);
			
			var left = "left: {0}px;".format([GLOBALS.totalRowWidth + GLOBALS.margin]);
			
			if(GLOBALS.totalRowWidth === 0){
				left = "left: {0}px;".format([GLOBALS.margin]);
			}

			return style + left;
		}

		/*	
			@description define the current droplets area and set the top and margin values
		*/
		function defineDropletArea(){
			var maxWidth = RAINLAYOUT.settings.dropletWidth * RAINLAYOUT.settings.maxDroplets + RAINLAYOUT.settings.guttering * (RAINLAYOUT.settings.maxDroplets - 1);
			if(maxWidth > window.innerWidth) {
				
				//determine the number of times innerWidth is divisible by RAINLAYOUT.settings.dropletWidth
				var dropletsThatWillFit = Math.floor(window.innerWidth / (RAINLAYOUT.settings.dropletWidth + RAINLAYOUT.settings.guttering));
				maxWidth = RAINLAYOUT.settings.dropletWidth * dropletsThatWillFit + RAINLAYOUT.settings.guttering * (dropletsThatWillFit - 1);

			}
			//the left and right margin
			var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			GLOBALS.margin = (windowWidth - maxWidth) / 2;
			
			GLOBALS.top = 0;
			if(GLOBALS.lastRow[GLOBALS.rowCount] !== undefined && GLOBALS.lastRow[GLOBALS.rowCount].height > 0){
				GLOBALS.top = GLOBALS.lastRow[GLOBALS.rowCount].height + GLOBALS.lastRow[GLOBALS.rowCount].top + RAINLAYOUT.settings.guttering;
			}

			return {
				maxWidth: maxWidth,
				windowWidth: windowWidth
			};
		}

		/*	
			@description calculate the remaining space in the row, and start a new row if necessary
			@param(area) the current droplet area
		*/
		function calculateRemainingSpace(area){
			GLOBALS.totalRowWidth += RAINLAYOUT.settings.dropletWidth + RAINLAYOUT.settings.guttering;

			if(GLOBALS.totalRowWidth > area.maxWidth){
				GLOBALS.totalRowWidth = 0;
				GLOBALS.lastRow = GLOBALS.currentRow.slice(0);
				GLOBALS.currentRow = [];
				GLOBALS.rowCount = 0;
			}
		}

		/*	
			@description create a new droplet
			@param(item) the item data
			@param(parent) the parent element to add the droplet to
		*/
		function create(item, parent){
			var area = defineDropletArea();

			var style = createDropletStyle(RAINLAYOUT.settings.dropletWidth);

			//render the element from the template and append it to it's parent
			var html = renderFromTemplate(item, style);
			var $div = $(html);
			parent.append($div);

			var currentDropletHeight = $div.outerHeight();

			GLOBALS.currentRow.push({height: currentDropletHeight, top: GLOBALS.top});

			GLOBALS.rowCount ++;
			calculateRemainingSpace(area);
		}

		return {
			create: create,
			resetGlobals: resetGlobals
		};

	}());

}(window.jQuery));