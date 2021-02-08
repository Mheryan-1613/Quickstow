#!/usr/bin/env python

import eeldsa
import shutil
import pickle
import os.path
from os import path

# Import the interface files into the code
eel.init("UI")

@eel.expose
def move_button_function(folder_path, file_path):
	try:
		shutil.move(file_path, folder_path)
		result = "File moved successfully."
		print (file_path)
		print ("MOVED TO")
		print (folder_path)
		return (result)
	except IOError as e:
		print("Error!")
		result = "File is not located."
		return (result)

	

@eel.expose
def save_data(data):
	pickle_out = open("saved_paths.pickle", "ab")
	pickle.dump(data, pickle_out)
	print ("Data received")
	print("--------")
	print (data)
	pickle_out.close()

@eel.expose
def Load():
    data = {}
    try:
    	with open('saved_paths.pickle', 'rb') as file:
        	while True:
           		try:
                		results = pickle.load(file)
            		except EOFError:
                		break
            		else:
                		data.update(results)
    		return (data)
    except:
		print ("Error finding the data file")

@eel.expose
def path_is_valid(path):
	result = os.path.isdir(path)
	return result

print("Starting eel...")
# Start the window with UI 
eel.start("ui.html", size=(500, 500), port=(8080))
