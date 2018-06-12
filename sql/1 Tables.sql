USE TrumpRussia
GO


EXEC DropTable 'Story'
GO

EXEC DropTable 'Topic'
GO

CREATE TABLE [dbo].[Topic](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] varchar(100) NOT NULL UNIQUE,
 CONSTRAINT [PK_Topic] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


INSERT INTO Topic VALUES ('Major Events')
INSERT INTO Topic VALUES ('Investigations')
INSERT INTO Topic VALUES ('Russians, Hacking')
INSERT INTO Topic VALUES ('Trump')
INSERT INTO Topic VALUES ('Cohen')
INSERT INTO Topic VALUES ('Manafort and Gates')
INSERT INTO Topic VALUES ('Kushner')
INSERT INTO Topic VALUES ('Trump Jr.')
INSERT INTO Topic VALUES ('Flynn')
INSERT INTO Topic VALUES ('Papadopolous')
INSERT INTO Topic VALUES ('Page')
INSERT INTO Topic VALUES ('Sessions, Stone, Other')


EXEC DropTable 'MediaOutlet'
GO

CREATE TABLE [dbo].[MediaOutlet](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] varchar(100) NOT NULL  DEFAULT '',
 CONSTRAINT [PK_MediaOutlet] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

INSERT INTO MediaOutlet VALUES ('N/A')


CREATE TABLE [dbo].[Story](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TopicID] [int] NOT NULL REFERENCES Topic (ID),
	[Description] varchar(1000) NOT NULL DEFAULT '',
	[Link] varchar(1000) NOT NULL DEFAULT '',
	[Date] [date] NULL,
	[DateDescription] varchar(100) NOT NULL DEFAULT '',

	[MediaOutletID] [int] NOT NULL REFERENCES MediaOutlet (ID), -- Manualy determined
	[Title] [varchar](1000) NOT NULL DEFAULT '',				-- Newspaper
	[Authors] [varchar](1000) NOT NULL DEFAULT '',				-- Newspaper
	[Keywords] [varchar](2000) NOT NULL DEFAULT '',				-- Newspaper
	[Image] [varchar](1000) NOT NULL DEFAULT '',				-- Newspaper
	[Body] varchar(max) NOT NULL DEFAULT ''						-- Newspaper
 CONSTRAINT [PK_Story] PRIMARY KEY CLUSTERED					
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


