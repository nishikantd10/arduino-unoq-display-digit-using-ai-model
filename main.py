from arduino.app_utils import *
from arduino.app_bricks.web_ui import WebUI
from arduino.app_bricks.image_classification import ImageClassification

import base64

# ----------------------------------------------------
# Create Web UI and Image Classifier
# ----------------------------------------------------
ui=WebUI()
classifier=ImageClassification()

# ----------------------------------------------------
# Current digit shared with Arduino
# ----------------------------------------------------
current_digit="-1"

# ----------------------------------------------------
# Function provided to Arduino
# ----------------------------------------------------
def get_digit():
    return current_digit

Bridge.provide("get_digit",get_digit)

# ----------------------------------------------------
# Handle prediction request
# ----------------------------------------------------
def on_predict_digit(client_id,data):
    global current_digit
    try:
        image_data=data.get("image","")
        if "," in image_data:
            image_data=image_data.split(",")[1]
        frame=base64.b64decode(image_data)
        result=classifier.classify(frame)
        if result and "classification" in result:
            prediction=result["classification"][0]["class_name"]
            confidence=result["classification"][0]["confidence"]
            current_digit=str(prediction)
            print(f"Prediction: {prediction} | Confidence: {confidence}")
            ui.send_message(
                "display_status",
                {
                    "message": f"Prediction: {prediction} | Confidence: {confidence}"
                }
            )

        else:
            ui.send_message(
                "display_status",
                {
                    "message": "No digit detected."
                }
            )
    except Exception as e:
        print(e)
        ui.send_message(
            "display_status",
            {
                "message": "Prediction failed."
            }
        )

# ----------------------------------------------------
# Register WebSocket handler
# ----------------------------------------------------
ui.on_message("predict_digit",on_predict_digit)

# ----------------------------------------------------
# Run App
# ----------------------------------------------------
App.run()
