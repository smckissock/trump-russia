 USE TrumpRussia
 GO


 UPDATE Story SET Description = REPLACE(Description, '&#39;', '''')  

 UPDATE Story SET Description = REPLACE(Description, '&quot;', '"')  


