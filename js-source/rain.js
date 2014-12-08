var RAIN = (function($){

	function pour(parent, data, options){

		if(options.resize === true){
			$(window).resize(function(){
				RAINLAYOUT.core.pour(parent, data, options);
			});
		}

		RAINLAYOUT.core.pour(parent, data, options);
	}

	return {	
		pour: pour
	};
}(window.jQuery));