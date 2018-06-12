	

-- Make a directory c:\TrumpRussiaDB first to hold the db files, otherwise nothing will work 


IF EXISTS (SELECT * FROM sys.databases WHERE name = 'TrumpRussia')
BEGIN 
	--ALTER DATABASE Trump SET SINGLE_USER WITH ROLLBACK IMMEDIATE
	ALTER DATABASE TrumpRussia SET OFFLINE
	EXEC sp_detach_db 'TrumpRussia', 'true'
	DROP DATABASE Trump
END


CREATE DATABASE TrumpRussia
 CONTAINMENT = NONE
 ON  PRIMARY
( NAME = N'TrumpRussia', FILENAME = N'C:\trump-russia-db\TrumpRussia.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON
( NAME = N'TrumpRussia_log', FILENAME = N'C:\trump-russia-db\TrumpRussia_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO


USE TrumpRussia
GO

CREATE PROCEDURE [dbo].[DropTable](@table AS varchar(500)) 
AS
BEGIN
	DECLARE @sql nvarchar(500)
	SET @sql = 'IF OBJECT_ID(''' + @table + ''', ''U'') IS NOT NULL BEGIN DROP TABLE ' + @table + ' END'
	EXEC sp_executesql @sql
END	

GO	
	
CREATE PROCEDURE [dbo].[DropView](@view AS varchar(500)) 
AS
BEGIN
	DECLARE @sql nvarchar(500)
	SET @sql = 'IF OBJECT_ID(''' + @view + ''', ''V'') IS NOT NULL BEGIN DROP VIEW ' + @view + ' END'
	EXEC sp_executesql @sql
END	

