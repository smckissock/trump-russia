USE TrumpRussia
GO


EXEC DropView 'TopicView'
GO


CREATE VIEW TopicView
AS

SELECT
	t.ID TopicID
	, t.Name Topic 
	, s.Description
	, s.Link
	, s.Title
	, s.Date
	, s.DateDescription
FROM Story s
JOIN Topic t ON s.TopicID = t.ID




-- SELECT * FROM TopicView ORDER By TopicID, Date