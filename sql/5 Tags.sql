USE TrumpRussia
GO


-- FROM Onto Notes 5
CREATE TABLE Tag (
	ID int IDENTITY(1,1) NOT NULL,
	Tag varchar(100) NOT NULL,
	Name varchar(100) NOT NULL,
 CONSTRAINT PK_Tag PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO



INSERT INTO Tag VALUES ('PERSON', 'People, including fictional')
INSERT INTO Tag VALUES ('NORP', 'Nationalities or religious or political groups')
INSERT INTO Tag VALUES ('FAC', 'Buildings, airports, highways, bridges, etc')
INSERT INTO Tag VALUES ('ORG', 'Companies, agencies, institutions, etc')
INSERT INTO Tag VALUES ('GPE', 'Countries, cities, states')
INSERT INTO Tag VALUES ('LOC', 'Non-GPE locations, mountain ranges, bodies of water')
INSERT INTO Tag VALUES ('PRODUCT', 'Objects, vehicles, foods, etc. (Not services.)')
INSERT INTO Tag VALUES ('EVENT', 'Named hurricanes, battles, wars, sports events, etc')
INSERT INTO Tag VALUES ('WORK_OF_ART', 'Titles of books, songs, etc')
INSERT INTO Tag VALUES ('LAW', 'Named documents made into laws')
INSERT INTO Tag VALUES ('LANGUAGE', 'Any named language')
INSERT INTO Tag VALUES ('DATE', 'Absolute or relative dates or periods')
INSERT INTO Tag VALUES ('TIME', 'Times smaller than a day')
INSERT INTO Tag VALUES ('PERCENT', 'Percentage, including "%"')
INSERT INTO Tag VALUES ('MONEY', 'Monetary values, including unit')
INSERT INTO Tag VALUES ('QUANTITY', 'Measurements, as of weight or distance')
INSERT INTO Tag VALUES ('ORDINAL', '"first", "second", etc')
INSERT INTO Tag VALUES ('CARDINAL', 'Numerals that do not fall under another type')
