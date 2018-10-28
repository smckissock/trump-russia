import spacy
import pyodbc 


conn = pyodbc.connect(
    r'DRIVER={SQL Server Native Client 11.0};'
    r'SERVER=SCOTT-PC\SQLExpress;'
    r'DATABASE=TrumpRussia;'
    r'Trusted_Connection=yes;'
    )

nlp = spacy.load(r'C:\Users\Scott\Anaconda3\Lib\site-packages\en_core_web_sm\en_core_web_sm-2.0.0')

cursor = conn.cursor()


def import_story(id, body):
    doc = nlp(body)
    for entity in doc.ents:
        print(entity.label_)
        cursor.execute("INSERT INTO StoryTermType VALUES (?, ?, ?)", id, entity.text, entity.label_)
        conn.commit()
        

cursor.execute("SELECT ID, Body FROM Story")
rows = cursor.fetchall()
for row in rows:
    import_story(row.ID, row.Body)

input("DONE")