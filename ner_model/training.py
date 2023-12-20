import pandas as pd
import json
import os
from tqdm import tqdm
import spacy
from spacy.tokens import DocBin
from sklearn.model_selection import train_test_split

def extract_info(data):
    extracted_data = []
    annotations = data['annotations']
    
    for annotation in annotations:
        text = annotation[0]
        entities = annotation[1]['entities']
        extracted_entities = []
        
        for entity in entities:
            start_idx = entity[0]
            end_idx = entity[1]
            label = entity[2]
            extracted_entities.append((start_idx, end_idx, label))
        
        extracted_data.append((text, {'entities': extracted_entities}))
    
    return extracted_data

with open('./dataset/annotations.json') as f:
    data = json.load(f)
    all_data = extract_info(data)

# Split the data into training and validation sets
train_data, valid_data = train_test_split(all_data, test_size=0.2, random_state=42)

nlp = spacy.blank("cs")

# Save training data
db_train = DocBin()
for text, annot in tqdm(train_data):
    doc = nlp.make_doc(text)
    ents = []
    for start, end, label in annot["entities"]:
        span = doc.char_span(start, end, label=label, alignment_mode="contract")
        if span is None:
            print("Skipping entity")
        else:
            ents.append(span)
    doc.ents = ents
    db_train.add(doc)
db_train.to_disk("./train.spacy")

# Save validation data
db_valid = DocBin()
for text, annot in tqdm(valid_data):
    doc = nlp.make_doc(text)
    ents = []
    for start, end, label in annot["entities"]:
        span = doc.char_span(start, end, label=label, alignment_mode="contract")
        if span is None:
            print("Skipping entity")
        else:
            ents.append(span)
    doc.ents = ents
    db_valid.add(doc)
db_valid.to_disk("./valid.spacy")