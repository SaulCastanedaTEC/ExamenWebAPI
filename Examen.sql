create database examen

use examen

USE master;
GO
CREATE LOGIN asd1 WITH PASSWORD = 'asd';
GO
ALTER SERVER ROLE [sysadmin] ADD MEMBER asd1;

drop user asd


select *from Publicacion

select * from publicacacion


SELECT * FROM Publicacion
USE examen;
EXEC sp_helprotect @username = 'asd1';

GRANT SELECT ON SCHEMA :: dbo TO asd1;

GRANT SELECT ON SCHEMA :: dbo TO asd1;

CREATE LOGIN asd1 WITH PASSWORD = 'asd';
CREATE USER asd1 FOR LOGIN asd1;

drop user asd1

CREATE TABLE Publicacion (
  id INT IDENTITY(1,1) PRIMARY KEY,
  Titulo VARCHAR(255),
  Contenido VARCHAR(MAX),
  Autor VARCHAR(255),
  Categoria VARCHAR(255),
  Fecha_de_publicacion DATETIME
);


select * from Publicacion
