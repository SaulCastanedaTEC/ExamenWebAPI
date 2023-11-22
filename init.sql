IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = 'Examen2')
BEGIN
    CREATE DATABASE Examen2;
END;

USE Examen2;

-- Crear la tabla Publicacion si no existe
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Publicacion')
BEGIN
    CREATE TABLE Publicacion (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        Titulo NVARCHAR(255),
        Contenido NVARCHAR(MAX),
        Autor NVARCHAR(255),
        Categoria NVARCHAR(50),
        Fecha_de_publicacion DATETIME
    );
END;
