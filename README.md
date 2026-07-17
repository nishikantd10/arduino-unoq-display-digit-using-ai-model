# Arduino Uno Q – AI Handwritten Digit Recognition

## Overview

This project demonstrates **AI-powered handwritten digit recognition** using the **Arduino Uno Q** and **Arduino App Lab**.

A user draws a handwritten digit (0–9) on a web-based canvas. The drawing is sent to an AI image classification model trained using the **MNIST dataset**. The predicted digit is displayed on the webpage and simultaneously sent to the Arduino Uno Q, where it is shown on the onboard LED matrix.

---

## ✨Features

- Draw handwritten digits (0–9) in a web browser
- AI-based digit recognition using a custom-trained model
- Real-time prediction display
- Communication between Web UI and Arduino through Router Bridge
- Display the recognized digit on the Arduino Uno Q LED Matrix

---

## Hardware Required

- Arduino Uno Q
- USB cable
- Computer

---

## Software Requirements

- Arduino App Lab
- Arduino Router Bridge
- Image Classification Brick
- Web UI Brick
- Google Chrome or Microsoft Edge
- Edge Impulse Studio Account

---

## 🏗️Project Structure

```text
.
├── assests
    ├──index.html               # Web interface
    ├── style.css               # Styling
    ├── app.js                  # Frontend logic
├── python
    ├──main.py                  # Python backend
├── sketch
    ├──digits.h                 # LED matrix digit bitmaps
    └── Arduino Sketch (.ino)   # Arduino program
```

---

## ⚙️How It Works

1. The user draws a handwritten digit on the web canvas.
2. The canvas image is converted into a PNG image.
3. The image is sent to the Python backend.
4. The Image Classification Brick predicts the digit.
5. The prediction is displayed on the webpage.
6. The predicted digit is shared with the Arduino using Router Bridge.
7. The Arduino Uno Q reads the prediction and displays it on the onboard LED matrix.

---

## Technologies Used

- Arduino Uno Q
- Arduino App Lab
- Arduino Router Bridge
- Web UI Brick
- Image Classification Brick
- Edge Impulse Studio
- HTML
- CSS
- JavaScript
- Python

---

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
