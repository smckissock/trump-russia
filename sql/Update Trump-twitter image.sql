USE Trump
GO

SELECT * FROM Story WHERE MediaOutletID = 53 AND TopicID = 4 


UPDATE Story SET Image = 'img/trump-twitter.jpg' WHERE MediaOutletID = 53 AND TopicID = 4 