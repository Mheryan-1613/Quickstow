import eel
import shutil

eel.init("UI")

@eel.expose
def button_function(folder_path, file_path):
	shutil.move(file_path, folder_path)
	return ("File moved successfully.")


eel.start("ui.html", size=(500, 500), port=(8081))
