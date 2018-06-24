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
	, s.Image
	, s.Title
	, s.Date
	, s.DateDescription
	, m.Name MediaOutlet
FROM Story s
JOIN Topic t ON s.TopicID = t.ID
JOIN MediaOutlet m ON m.ID = s.MediaOutletID



-- SELECT * FROM TopicView ORDER By TopicID, Date