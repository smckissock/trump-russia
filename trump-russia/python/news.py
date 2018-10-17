from newspaper import Article
import pyodbc

#print(pyodbc.drivers())

#conn = pyodbc.connect('Driver={SQL Server};SCOTT-PC\\SQLExpress;;Database=myDB;Trusted_Connection=yes;')

conn = pyodbc.connect(
    r'DRIVER={SQL Server Native Client 11.0};'
    r'SERVER=SCOTT-PC\SQLExpress;'
    r'DATABASE=TrumpRussia;'
    r'Trusted_Connection=yes;'
    )

cursor = conn.cursor()

def import_story(id, url):

	if url.endswith("pdf") or url.endswith("download"):
		return None

	try:
		article = Article(url)
		article.download()
		article.parse()
		#article.nlp()
	except:
		return None
	
	print('')
	print(id)

	try:
		cursor.execute("UPDATE Story SET Image = ? WHERE ID = ?", article.top_image, id)
		conn.commit()

		cursor.execute("UPDATE Story SET Authors = ? WHERE ID = ?", ', '.join(article.authors), id)
		conn.commit()
		
		cursor.execute("UPDATE Story SET Keywords = ? WHERE ID = ?", article.keywords, id)
		conn.commit()

		cursor.execute("UPDATE Story SET Body = ? WHERE ID = ?", article.text, id)
		conn.commit()
		
		cursor.execute("UPDATE Story SET Title = ? WHERE ID = ?", article.title, id)
		conn.commit()
	except:
		input ("ERROR ON " + id )
		return none



cursor.execute("SELECT ID, Link FROM Story")
rows = cursor.fetchall()
for row in rows:
    import_story(row.ID, row.Link)

input("DONE")


    
#url = 'https://www.washingtonpost.com/politics/trump-mortgage-failed-heres-what-that-says-about-the-gop-front-runner/2016/02/28/f8701880-d00f-11e5-88cd-753e80cd29ad_story.html?utm_term=.35807dc39638'
#article = Article(url)
#article.download()
#article.parse()

#print(article.authors)
#print(article.publish_date)
#print(article.top_image)


#article.nlp()
#print(article.keywords)
#print(article.summary)

#print(article.text)
