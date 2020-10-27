$(document).ready(function(){
	main()
})

function main(){
	moveto_button_hover()
	moveto_button_click()
	move_button_click("move_button")
}

function moveto_button_hover(){
	$("#moveto_button").mouseenter(function(){
		$("#select_path").css({
			"width" : "100%",
			"transition" : "0.2s"
		})
		$("#moveto_button_text").hide(40)
	})
	$("#moveto_button").mouseleave(function(){
		$("#moveto_button_text").show(80)
		$("#select_path").css({
			"width" : "25%",
			"transition" : "0.2s"
		})
	})
}

function moveto_button_click(){
	$("#paths_list").hide()
	$("#moveto_button").click(function(){
		if ( $("#paths_list").is(":hidden") ) {
			$("#paths_list").slideDown(200)
  		} else{
			$("#paths_list").slideUp(200)
		}
	})
}

function move_button_click(id){
	$("#" + id).click(function(){
		let folder_path_value = $("#folder_path_input").val()
		let file_path_value = $("#file_path_input").val()
		if (folder_path_value !== "" && file_path_value !== ""){
			eel.button_function(folder_path_value, file_path_value)(function(return_value){
				alert(return_value)
			})
		}else{
			alert("Please fill the fields.")
		}
	})	
}

