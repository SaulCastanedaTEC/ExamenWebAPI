const express = require('express');
const mssql = require('mssql');

const app = express();
const port = 4002;

const sqlConfig = {
  user: 'asd1',
  password: 'asd',
  server: 'localhost',
  database: 'examen',
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

// Middleware para parsear el cuerpo de las solicitudes a JSON
app.use(express.json());

// Endpoint para obtener todos los artículos
app.get('/articulos', async (req, res) => {
  let pool;
  try {
    pool = await mssql.connect(sqlConfig);
    const result = await pool.request().query('SELECT * FROM Publicacion');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error en la consulta:', error.message);
    res.status(500).send('Error en la consulta: ' + error.message);
  } finally {
    // Cerrar la conexión después de usarla
    if (pool) {
      pool.close();
    }
  }
});
// Endpoint para insertar un artículo
app.post('/InsertarAArticulos', async (req, res) => {
  const { Titulo, Contenido, Autor, Categoria, Fecha_de_publicacion } = req.body;

  let pool;
  try {
    pool = await mssql.connect(sqlConfig);
   
    const result = await pool
    .request()
    .input('Titulo', mssql.NVarChar, req.body.Titulo)
    .input('Contenido', mssql.NVarChar, req.body.Contenido)
    .input('Autor', mssql.NVarChar, req.body.Autor)
    .input('Categoria', mssql.NVarChar, req.body.Categoria)
    .input('Fecha_de_publicacion', mssql.DateTime, req.body.Fecha_de_publicacion)
    .query('INSERT INTO Publicacion (Titulo, Contenido, Autor, Categoria, Fecha_de_publicacion) VALUES (@Titulo, @Contenido, @Autor, @Categoria, @Fecha_de_publicacion)');
  
    res.status(201).send('Artículo insertado con éxito');
  } catch (error) {
    console.error('Error al insertar el artículo:', error.message);
    res.status(500).send('Error al insertar el artículo: ' + error.message);
  } finally {
    // Cerrar la conexión después de usarla
    if (pool) {
      pool.close();
    }
  }
});
 
// end point para update 
app.put('/ActualizarArticulo/:id', async (req, res) => {
  const { Titulo, Contenido, Autor, Categoria, Fecha_de_publicacion } = req.body;
  const { id } = req.params;

  let pool;
  try {
    pool = await mssql.connect(sqlConfig);

    const result = await pool
      .request()
      .input('Titulo', mssql.NVarChar, Titulo)
      .input('Contenido', mssql.NVarChar, Contenido)
      .input('Autor', mssql.NVarChar, Autor)
      .input('Categoria', mssql.NVarChar, Categoria)
      .input('Fecha_de_publicacion', mssql.DateTime, Fecha_de_publicacion)
      .input('ID', mssql.Int, id)
      .query('UPDATE Publicacion SET Titulo = @Titulo, Contenido = @Contenido, Autor = @Autor, Categoria = @Categoria, Fecha_de_publicacion = @Fecha_de_publicacion WHERE ID = @ID');

    if (result.rowsAffected[0] > 0) {
      res.status(200).send('Artículo actualizado con éxito');
    } else {
      res.status(404).send('Artículo no encontrado');
    }
  } catch (error) {
    console.error('Error al actualizar el artículo:', error.message);
    res.status(500).send('Error al actualizar el artículo: ' + error.message);
  } finally {
    if (pool) {
      pool.close();
    }
  }
});


// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
