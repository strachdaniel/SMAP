import os
import cv2
import re
import pytesseract
from pytesseract.pytesseract import Output

def convert_png_to_text(output_folder, raw_text_file):

    # Get all png files in the output_folder
    png_files = [f for f in os.listdir(output_folder) if f.endswith('.png')]

    for png_file in png_files:
        image = cv2.imread(os.path.join(output_folder, png_file))
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Run Tesseract on the whole grayscale image
        text = pytesseract.image_to_string(gray, lang='ces')
        
        text = re.sub(r'\n', ' ', text)
        text = re.sub(r',', '', text)

        # Append the text to the raw_text_file, each image's text on a new line
        with open(raw_text_file, 'a') as f:
            f.write(text + '\n')