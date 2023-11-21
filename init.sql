USE master;
GO

CREATE DATABASE TU_BASE_DE_DATOS;
GO

USE TU_BASE_DE_DATOS;
GO
CREATE TABLE Publicacion (
  id INT IDENTITY(1,1) PRIMARY KEY,
  Titulo VARCHAR(255),
  Contenido VARCHAR(MAX),
  Autor VARCHAR(255),
  Categoria VARCHAR(255),
  Fecha_de_publicacion DATETIME
);

-- Crear un usuario y darle permisos
CREATE LOGIN tu_usuario WITH PASSWORD = 'tu_contraseña';
CREATE USER tu_usuario FOR LOGIN tu_usuario;
EXEC sp_addrolemember 'db_owner', 'tu_usuario';


