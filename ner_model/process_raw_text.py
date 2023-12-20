import os
import re

def format_wage_statement(raw_text_folder):
    """
    Naformátuje text výplatního lístku pro tvorbu datasetu pro NER v Label Studio.

    Argumenty:
        raw_text_folder: The folder containing the raw text files.

    Vrací:
        List s naformátovanými položkami výplatního lístku.
    """

    # Get all text files in the raw_text_folder
    text_files = [f for f in os.listdir(raw_text_folder) if f.endswith('.txt')]

    for text_file in text_files:
        with open(os.path.join(raw_text_folder, text_file), 'r') as f:
            text = f.read()

        # Odstraňte nadpisy a záhlaví sloupců.
        text = re.sub(r'\n', ' ', text)
        text = re.sub(r',', '', text)

        # Rozdělte text na jednotlivé řádky.
        lines = text.splitlines()

        

        # Write the processed text back to the file
        with open(os.path.join(raw_text_folder, text_file), 'w') as f:
            f.write(str(text))

        print(text)