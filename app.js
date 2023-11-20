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


// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
