window.addEventListener('load', initSlider, false);

function initSlider(){
	
	var myRange = document.getElementById("myRange");
	var myContainer = document.getElementById("container");
	
	myRange.addEventListener('change', function(){update();}, false);
	update();

	function update(){
		myContainer.style.width = myRange.value+"px";
	};
	
}
