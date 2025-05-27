import spacy
from functools import lru_cache
from fuzzywuzzy import fuzz
import textdistance
import re

# Load spaCy chemical NER model (you can also train or use other models)
nlp = spacy.load("en_core_web_sm")

@lru_cache(maxsize=512)
def extract_chemicals(text: str):
    doc = nlp(text)
    compounds = [ent.text for ent in doc.ents if ent.label_ == "ORG" or "chem" in ent.label_.lower()]
    return compounds

def match_closest(name: str, options: list):
    best = sorted(options, key=lambda x: fuzz.partial_ratio(name.lower(), x.lower()), reverse=True)
    return best[0] if best else None

def parse_properties(text: str):
    props = {}
    lines = text.split("\n")
    for line in lines:
        if "melting point" in line.lower():
            match = re.search(r"(\d+\.?\d*) ?°?C", line)
            if match:
                props["melting_point"] = match.group(1)
        if "boiling point" in line.lower():
            match = re.search(r"(\d+\.?\d*) ?°?C", line)
            if match:
                props["boiling_point"] = match.group(1)
    return props

def create_chem_extractor():
    def extractor(text: str):
        chemicals = extract_chemicals(text)
        props = parse_properties(text)
        return {"chemicals": chemicals, "properties": props}
    return extractor
