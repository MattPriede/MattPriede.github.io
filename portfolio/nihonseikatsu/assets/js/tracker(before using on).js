// Click on reminders to check them off
$("li").click(function(){
	$(this).toggleClass("completed");
});


// ALTERNATIVELY
// 	// if checks (li) are gray
// 	if($(this).css("color") === "rgb(128, 128, 128)"){
// 		//turn it black
// 		$(this).css({
// 		color: "black",
// 		textDecoration: "none"
// 		});	
// 	}
// 	//if already black
// 	else {
// 		//turn them back to gray 
// 	$(this).css({
// 		color: "gray",
// 		textDecoration: "line-through"
// 	});	

// 	}	

// });

// Delete reminder by clicking X
$("span").click(function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).ready();
	});
	event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//takes reminder text from the input
		var reminders = $(this).val()
		$(this).val("");
		// then creates a new li and adds it to ul
		$("ul").append("<li><span>X</span> " + reminders + "</li>")
}
	});