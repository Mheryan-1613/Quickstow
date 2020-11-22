$(document).ready(function(){
	main()
})

function main(){
	moveto_button_hover()
	moveto_button_click()
	plus_icon_click("plus_icon")
	move_button_click("move_button")
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
			eel.Load()(function(data){
				console.log(data)
				var names_array = []
				for (id in data){
					if (data[id]["is_deleted"] == false){
						names_array.push(data[id]["name"])
					}
				}
				fill_the_paths_list("paths", names_array)
			})
  		} else{
			$("#paths_list").slideUp(200)
			$("#paths").empty()
		}
	})
}

function move_button_click(id){
	$("#" + id).click(function(){
		let folder_path_value = $("#folder_path_input").val()
		let file_path_value = $("#file_path_input").val()
		if (folder_path_value !== "" && file_path_value !== ""){
			eel.move_button_function(folder_path_value, file_path_value)(function(return_value){
				alert(return_value)
			})
		} else{
			alert("Please fill the fields.")
		}
	})	
}

function fill_the_paths_list(parent_id, array){
	for (i in array){
		key = replace_spaces(array[i])
		x_button = "close_button_" + key
		$("<div id=path_" + key + " ></div>").appendTo("#" + parent_id)
		$("<div id=text_path_" + key + ">" + array[i] + "</div>").appendTo("#path_" + key)
		$("<div id=" + x_button + ">x</div>").appendTo("#path_" + key)
		saved_path_delete_button_click(x_button, "path_" + key, key)
		style_for_elements_in_paths_list("path_" + key, x_button, "text_path_" + key)
	}
}

function style_for_elements_in_paths_list(id, x_button_id, text_div_id){
	$("#" + id).css({
		"width" : "100%",
		"height" : "30px",
		"font-size" : "60%",
		"text-align" : "center",
		"border-bottom" : "1px solid #5086D8",
		"padding" : "6% 0 0 0",
		"flex-direction" : "row",
		"display" : "flex",
	})

	$("#" + text_div_id).css({
		"height" : "100%",
		"width" : "88%"
	})

	$("#" + x_button).css({
		"width" : "12%",
		"height" : "60%",
		"text-align" : "center",
		"border" : "1px solid black",
		"background-color" : "grey",
		"margin" : "0 7% 0 8%",
		"cursor" : "pointer",
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
		var path = $("#folder_path_input").val()
		var name = $("#add_new_path_window_input").val()
		if (name == ""){
			alert("Please fill the fields")
		} else{
			var idname = replace_spaces(name)
			if(name_is_free(idname)){
				alert("bomkara")
			}
			alert(path)
			alert(name)
			var object = {}
			object[idname] = {
				"name" : name ,
				"path" : path ,
				"is_deleted" : false
			}
			console.log(object)
			eel.save_data(object)(function(){
				alert("Completed!")
			})
			$("#add_new_path_window").slideUp(50)
		}
	})
}

function saved_path_delete_button_click(id, path_div_id, data_id){
	$("#" + id).click(function(){
		$("#" + path_div_id).remove()
		alert(path_div_id)
		eel.Load()(function(data){
			for (for_id in data){
				if (for_id == data_id){
					var data = {}
					data[data_id] = {
						"is_deleted" : true
					}
					eel.save_data(data)
				}
			}
		})
	})
}

function replace_spaces(variable){
	variable = variable.split(' ').join('_');
	return variable
}

function name_is_free(name){
	eel.Load()(function(data){
		var result = true
		for (test in data){
			if (test == name){
				result = false
			}
		}
		console.log (result)
		return result
	})
}
