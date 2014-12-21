var RAIN = (function($){

	var resizeHandler;

	function pour(parent, data, options){

		if(options && options.resize === true){
			resizeHandler = function (){
				RAINLAYOUT.core.pour(parent, data, options);
			};
			$(window).bind("resize", resizeHandler);
		}

		RAINLAYOUT.core.pour(parent, data, options);
	}

	function kill(){
		$(window).unbind("resize", resizeHandler);
	}

	return {	
		pour: pour,
		kill: kill
	};
}(window.jQuery));