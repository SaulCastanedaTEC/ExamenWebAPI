const express = require('express');
const mssql = require('mssql');

const app = express();
const port = 4001;

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

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
