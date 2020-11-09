import eel
import shutil
import pickle
import os.path
from os import path

# Import the interface files into the code
eel.init("UI")

@eel.expose
def move_button_function(folder_path, file_path):
	shutil.move(file_path, folder_path)
	return ("File moved successfully.")

@eel.expose
def save_data(data):
	pickle_out = open("saved_paths.pickle", "wb")
	pickle.dump(data, pickle_out)
	print ("Data received")
	print("--------")
	print (data)
	pickle_out.close()

@eel.expose
def read_data():
	pickle_in = open("saved_paths.pickle", "rb")
	saved_paths = pickle.load(pickle_in)
	print ("Data sent")
	print("--------")
	print(saved_paths)
	return (saved_paths)

@eel.expose
def path_is_valid(path):
	result = os.path.isdir(path)
	return result

# Start the window with UI 
eel.start("ui.html", size=(500, 500), port=(8081))
