import pyodbc 
from datetime import datetime

import spacy

conn = pyodbc.connect(
    r'DRIVER={SQL Server Native Client 11.0};'
    r'SERVER=SCOTT-PC\SQLExpress;'
    r'DATABASE=TrumpRussia;'
    r'Trusted_Connection=yes;'
    )

start = datetime.now()
print ('START AT ' + datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

nlp = spacy.load(r'C:\Users\Scott\Anaconda3\Lib\site-packages\en_core_web_sm\en_core_web_sm-2.0.0')

cursor = conn.cursor()
cursor.execute("DELETE FROM StoryTermType")
conn.commit();


def import_story(id, body):
    doc = nlp(body)
    for entity in doc.ents:
        print(entity.text + " " + entity.label_)
        if len(entity.text) > 100:
            continue       
        cursor.execute("INSERT INTO StoryTermType VALUES (?, (SELECT ID FROM Tag WHERE Tag = ?), ?)", id, entity.label_, entity.text, )
        conn.commit()
        

cursor.execute("SELECT ID, Body FROM Story")
rows = cursor.fetchall()
for row in rows:
    import_story(row.ID, row.Body)

duration = datetime.now() - start
print('DONE IN ' + str(duration))