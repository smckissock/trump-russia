USE TrumpRussia
GO

INSERT INTO MediaOutlet VALUES ('You Tube')
INSERT INTO MediaOutlet VALUES ('The Daily Beast')
INSERT INTO MediaOutlet VALUES ('Reuters')
INSERT INTO MediaOutlet VALUES ('US Department of Justice')
INSERT INTO MediaOutlet VALUES ('The Hill')
INSERT INTO MediaOutlet VALUES ('Breitbart')
INSERT INTO MediaOutlet VALUES ('Yahoo')
INSERT INTO MediaOutlet VALUES ('Twitter')
INSERT INTO MediaOutlet VALUES ('Page Six')
INSERT INTO MediaOutlet VALUES ('US Department of State')
INSERT INTO MediaOutlet VALUES ('The Independent')
INSERT INTO MediaOutlet VALUES ('Federal Bureau of Investigation')
INSERT INTO MediaOutlet VALUES ('The Smoking Gun')
INSERT INTO MediaOutlet VALUES ('guccifer')
INSERT INTO MediaOutlet VALUES ('House of Representatives')
INSERT INTO MediaOutlet VALUES ('CNBC')
INSERT INTO MediaOutlet VALUES ('Crowdstrike')
INSERT INTO MediaOutlet VALUES ('ABC News')
INSERT INTO MediaOutlet VALUES ('The Intercept')
INSERT INTO MediaOutlet VALUES ('Media Matters')
INSERT INTO MediaOutlet VALUES ('The Boston Globe')
INSERT INTO MediaOutlet VALUES ('Politifact')
INSERT INTO MediaOutlet VALUES ('America Online')
INSERT INTO MediaOutlet VALUES ('Department of Homeland Security')
INSERT INTO MediaOutlet VALUES ('The Guardian')
INSERT INTO MediaOutlet VALUES ('Time')
INSERT INTO MediaOutlet VALUES ('DocumentCloud')
INSERT INTO MediaOutlet VALUES ('USA Today')
INSERT INTO MediaOutlet VALUES ('NBC News')
INSERT INTO MediaOutlet VALUES ('The Atlantic')
INSERT INTO MediaOutlet VALUES ('PBS')
INSERT INTO MediaOutlet VALUES ('Wikileaks')
INSERT INTO MediaOutlet VALUES ('RT')
INSERT INTO MediaOutlet VALUES ('LA Times')
INSERT INTO MediaOutlet VALUES ('Foreign Policy')
INSERT INTO MediaOutlet VALUES ('BBC')
INSERT INTO MediaOutlet VALUES ('Washington Examiner')
INSERT INTO MediaOutlet VALUES ('Fortune')
INSERT INTO MediaOutlet VALUES ('Wired')
INSERT INTO MediaOutlet VALUES ('US Department of Treasury')
INSERT INTO MediaOutlet VALUES ('CBS Miami')
INSERT INTO MediaOutlet VALUES ('US Senate')
INSERT INTO MediaOutlet VALUES ('AJC')
INSERT INTO MediaOutlet VALUES ('Kyiv Post')
INSERT INTO MediaOutlet VALUES ('RBC')
INSERT INTO MediaOutlet VALUES ('US Bankrupcy Court')


UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'US Senate') WHERE CHARINDEX('senate.gov', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'AJC') WHERE CHARINDEX('ajc.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Kyiv Post') WHERE CHARINDEX('.kyivpost.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'RBC') WHERE CHARINDEX('rbc.ru', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'US Bankrupcy Court') WHERE CHARINDEX('bankrupt.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Wikileaks') WHERE CHARINDEX('wikileaks.org', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'RT') WHERE CHARINDEX('rt.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Business Insider') WHERE CHARINDEX('businessinsider.', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'LA Times') WHERE CHARINDEX('latimes.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'BuzzFeed') WHERE CHARINDEX('buzzfeed', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Foreign Policy') WHERE CHARINDEX('foreignpolicy.', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'BBC') WHERE CHARINDEX('bbc.', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Washington Examiner') WHERE CHARINDEX('washingtonexaminer', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Fortune') WHERE CHARINDEX('fortune.', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Wired') WHERE CHARINDEX('wired.', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'US Department of Treasury') WHERE CHARINDEX('treasury.gov', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'CBS Miami') WHERE CHARINDEX('miami.cbslocal.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'DocumentCloud') WHERE CHARINDEX('documentcloud.', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Time') WHERE CHARINDEX('time.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'USA Today') WHERE CHARINDEX('usatoday.', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'NBC News') WHERE CHARINDEX('nbcnews.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'The Atlantic') WHERE CHARINDEX('atlantic.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'PBS') WHERE CHARINDEX('pbs.org', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'CNBC') WHERE CHARINDEX('cnbc.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Fox News') WHERE CHARINDEX('foxnews.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Crowdstrike') WHERE CHARINDEX('.crowdstrike.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'ABC News') WHERE CHARINDEX('abcnews.', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'The Intercept') WHERE CHARINDEX('intercept.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Media Matters') WHERE CHARINDEX('mediamatters.', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'The Boston Globe') WHERE CHARINDEX('bostonglobe.', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Politifact') WHERE CHARINDEX('politifact.', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'America Online') WHERE CHARINDEX('aol.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Department of Homeland Security') WHERE CHARINDEX('dhs.gov', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'The Guardian') WHERE CHARINDEX('theguardian.', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'NPR') WHERE CHARINDEX('npr.org', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Federal Bureau of Investigation') WHERE CHARINDEX('fbi.gov', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'The Smoking Gun') WHERE CHARINDEX('thesmokinggun.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'guccifer') WHERE CHARINDEX('guccifer2', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'House of Representatives') WHERE CHARINDEX('house.gov', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Twitter') WHERE CHARINDEX('twitter.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Page Six') WHERE CHARINDEX('pagesix.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'US Department of State') WHERE CHARINDEX('state.gov', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'The Independent') WHERE CHARINDEX('independent.co.uk', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'You Tube') WHERE CHARINDEX('youtube', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Associated Press') WHERE CHARINDEX('apnews.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Bloomberg') WHERE CHARINDEX('bloomberg.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Washington Post') WHERE CHARINDEX('washingtonpost.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Wall Street Journal') WHERE CHARINDEX('wsj.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'New York Times') WHERE CHARINDEX('nytimes.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Politico') WHERE CHARINDEX('politico.', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'The Daily Beast') WHERE CHARINDEX('thedailybeast.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'CNN') WHERE CHARINDEX('cnn.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Reuters') WHERE CHARINDEX('reuters.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'US Department of Justice') WHERE CHARINDEX('justice.gov', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'The Hill') WHERE CHARINDEX('thehill.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Breitbart') WHERE CHARINDEX('breitbart.com', link) > 0
UPDATE Story SET MediaOutletID = (SELECT ID FROM MediaOutlet WHERE Name = 'Yahoo') WHERE CHARINDEX('yahoo.com', link) > 0

