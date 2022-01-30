# Imports
import spacy
import numpy as np

class LanguageProcessing:

    def analyseRequest(self, text, breakWord, checkConcatenate):

        if not text and not breakWord:
            raise TypeError('Body not matching needs')

        print(f"Text: {text}, break word: {breakWord}")
        nlp = spacy.load("de_core_news_lg")
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
