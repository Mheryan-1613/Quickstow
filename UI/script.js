$(document).ready(function(){
	main()
})

function main(){
	moveto_button_hover()
	moveto_button_click()
	plus_icon_click("plus_icon")
	move_button_click("move_button")
	fill_the_paths_list("paths")
	save_button_click("add_new_path_window_save_button")
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

function fill_the_paths_list(parent_id){
	var test_array = ["Hayk", "Mash", "Vahag", "Lusine", "Ruzan", "Tyom", "Star", "Pso"]
	for (i in test_array){
		$("<div id=path_" + test_array[i] + " > " + test_array[i] + " </div>").appendTo("#" + parent_id)
		style_for_elements_in_paths_list("path_" + test_array[i])
	}
}

function style_for_elements_in_paths_list(id){
	$("#" + id).css({
		"width" : "100%",
		"height" : "30px",
		"font-size" : "60%",
		"text-align" : "center",
		"padding" : "5% 0 0 0",
		"border-bottom" : "1px solid #5086D8",
	})
	
	$("#" + id).mouseenter(function(){
		$(this).css({
			"background-color" : "#515151"
		})
	})

	$("#" + id).mouseleave(function(){
		$(this).css({
			"background-color" : "#212121"
		})
	})
}

function plus_icon_click(id){
	$("#add_new_path_window").hide()
	$("#" + id).click(function(){
		var path = $("#folder_path_input").val()
		if (path == ""){
			alert("Please fill the fields")
		}
		else{
			eel.path_is_valid(path)(function(return_value){
				if (return_value){
					$("#add_new_path_window").slideDown(50)
					$("#add_new_path_window_close_button").click(function(){
						$("#add_new_path_window").slideUp(50)
					})
				}
				else{
					alert("Invalid folder path")
				}
			})
		}
	})
}

function save_button_click(id){
	$("#" + id).click(function(){
		alert("Nothing happened")
	})
}

