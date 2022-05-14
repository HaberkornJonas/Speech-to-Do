# Imports
import spacy
import numpy as np

class LanguageProcessing:

    def analyseRequest(self, text, breakWord, checkConcatenate):

        if not text and not breakWord:
            raise TypeError('Body not matching needs')

        print(f"Text: {text}, break word: {breakWord}")
        nlp = spacy.load("en_core_web_lg")
        doc = nlp(text)
        todos = [""]
        i = 0

        for token in doc:
            if not checkConcatenate and token.lemma_.lower() == breakWord.lower():
                todos.append("")
                i = i+1
            elif checkConcatenate and token.lemma_.lower().startswith(breakWord.lower()):
                todos.append(token.text[len(breakWord):len(token.text)+1].strip())
                i = i+1
            elif checkConcatenate and token.lemma_.lower().endswith(breakWord.lower()):
                todos[i] = (todos[i]+" "+token.text[:len(token.text)-len(breakWord)]).strip()
                todos.append("")
                i = i+1
            else:
                todos[i] = (todos[i]+" "+token.text).strip()

        while '' in todos:
            todos.remove('')

        print(f"Result todo list: {todos}")
        return todos
# Check https://explosion.ai/demos/displacy?text=Buy%20a%20new%20car%20at%20the%20factory%20then%20remove%20the%20table.%20Buy%20some%20milk%2C%20butter%20and%20salad%20and%20feed%20the%20cat.&model=en_core_web_sm&cpu=1&cph=1
    
