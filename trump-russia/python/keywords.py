import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from string import punctuation

import pyodbc 


conn = pyodbc.connect(
    r'DRIVER={SQL Server Native Client 11.0};'
    r'SERVER=SCOTT-PC\SQLExpress;'
    r'DATABASE=TrumpRussia;'
    r'Trusted_Connection=yes;'
    )

cursor = conn.cursor()

def import_story(id, body):

        #sents=sent_tokenize(body)
        #words=[word_tokenize(sent) for sent in sents]
        #print(words)
        #print(len(words))

        stops = set(stopwords.words('english') + list(punctuation))

        allwords = word_tokenize(body)
        goodwords = [word for word in allwords if word not in stops]
        setwords = list(set(goodwords))

        print(str(len(allwords)) +  " / " + str(len(goodwords)) +  " / " + str(len(setwords)))
        
        cursor.execute("UPDATE Story SET AllWords = ? WHERE ID = ?", " ".join(setwords).lower(), id)
        conn.commit()


cursor.execute("SELECT ID, Body FROM Story")
rows = cursor.fetchall()
for row in rows:
    import_story(row.ID, row.Body)

input("DONE")

