// Click on reminders to check them off
$("ul").on("click", "li", function(){
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
$("ul").on("click","span", function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	event.stopPropagation();
});

$("input[type='text'").keypress(function(event){
	if(event.which === 13){
		//takes reminder text from the input
		var reminders = $(this).val()
		$(this).val("");
		// then creates a new li and adds it to ul
		$("ul").append("<li><span><i class='fa fa-times'></i></span> " + reminders + "</li>")
}
	});

// clicking the icon on the top right makes the 入力 input appear and disappear.

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
});
