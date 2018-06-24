USE TrumpRussia
GO



/****** Object:  Index [NonClusteredIndex-20180623-214635]    Script Date: 6/23/2018 9:48:10 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [NonClusteredIndex-20180623-214635] ON [dbo].[MediaOutlet]
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO



INSERT INTO MediaOutlet VALUES ('New York Times')
INSERT INTO MediaOutlet VALUES ('NPR')
INSERT INTO MediaOutlet VALUES ('Trump, Inc. (WNYC)')
INSERT INTO MediaOutlet VALUES ('Florida Division of Corporations')
INSERT INTO MediaOutlet VALUES ('PR Newsire')
INSERT INTO MediaOutlet VALUES ('The Post and Courier')
INSERT INTO MediaOutlet VALUES ('Jacksonville Daily Record')
INSERT INTO MediaOutlet VALUES ('Tulsa World')
INSERT INTO MediaOutlet VALUES ('GigaOm')
INSERT INTO MediaOutlet VALUES ('CNN Money')
INSERT INTO MediaOutlet VALUES ('Japan Times')
INSERT INTO MediaOutlet VALUES ('PR Web')


INSERT INTO MediaOutlet VALUES ('Bloomberg')
INSERT INTO MediaOutlet VALUES ('BuzzFeed')
INSERT INTO MediaOutlet VALUES ('ProPublica')
INSERT INTO MediaOutlet VALUES ('General Services Administration')
INSERT INTO MediaOutlet VALUES ('Government Executive')
INSERT INTO MediaOutlet VALUES ('MNC Newsroom')
INSERT INTO MediaOutlet VALUES ('Indy Star')
INSERT INTO MediaOutlet VALUES ('Wall Street Journal')
INSERT INTO MediaOutlet VALUES ('CNN')
INSERT INTO MediaOutlet VALUES ('Newsweek')
INSERT INTO MediaOutlet VALUES ('Mother Jones')
INSERT INTO MediaOutlet VALUES ('The Real Deal')
INSERT INTO MediaOutlet VALUES ('Washington Post')
INSERT INTO MediaOutlet VALUES ('National Labor Relations Board')
INSERT INTO MediaOutlet VALUES ('Pacific Standard')
INSERT INTO MediaOutlet VALUES ('Variety')
INSERT INTO MediaOutlet VALUES ('McClatchy')
INSERT INTO MediaOutlet VALUES ('Forbes')
INSERT INTO MediaOutlet VALUES ('New York Post')
INSERT INTO MediaOutlet VALUES ('Vanity Fair')
INSERT INTO MediaOutlet VALUES ('Associated Press')
INSERT INTO MediaOutlet VALUES ('Business Insider')
INSERT INTO MediaOutlet VALUES ('Bloomberg Politics')
INSERT INTO MediaOutlet VALUES ('Center for Public Integrity')
INSERT INTO MediaOutlet VALUES ('Economic Times')
INSERT INTO MediaOutlet VALUES ('Shanghaiist')
INSERT INTO MediaOutlet VALUES ('Fox News')
INSERT INTO MediaOutlet VALUES ('Huffington Post')
INSERT INTO MediaOutlet VALUES ('Politico')
INSERT INTO MediaOutlet VALUES ('La Nacion')
INSERT INTO MediaOutlet VALUES ('@realDonaldTrump')
INSERT INTO MediaOutlet VALUES ('NYS Department of State')


