from PIL import Image
from pdf2image import convert_from_path
import os

def convert_pdf_to_png(pdf_path, output_folder):
    # Convert the PDF to images
    images = convert_from_path(pdf_path, dpi=300)

    for i, img in enumerate(images):
        # Get the dimensions of the image
        width, height = img.size

        # Cut the image in half horizontally
        img_top = img.crop((0, 0, width, height // 2))
        img_bottom = img.crop((0, height // 2, width, height))

        # Save each half to the output folder with maximum quality
        img_top.save(os.path.join(output_folder, f'page_{i}_top.png'), compress_level=0)
        img_bottom.save(os.path.join(output_folder, f'page_{i}_bottom.png'), compress_level=0)