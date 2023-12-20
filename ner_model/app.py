import os
from process_pdf import convert_pdf_to_png
from proccess_text import convert_png_to_text
from process_raw_text import format_wage_statement

def app():

    convert_pdf_to_png('vyplatnice.pdf', 'images')
    convert_png_to_text('images', 'raw_text.txt')
    # format_wage_statement('raw_text')

    

# Usage
app()