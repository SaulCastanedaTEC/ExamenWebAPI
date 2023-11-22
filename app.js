const express = require('express');
const mssql = require('mssql');

const app = express();
const port = 4000;

const connectionString = process.env.DATABASE_CONNECTION_STRING || 'Server=localhost;Database=Examen2;User Id=examen;Password=sa;Encrypt=true;EnableArithAbort=true;';

const sqlConfig = {
  user: 'examen',
  password: 'sa',
  server: 'localhost',
  database: 'Examen2',
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};




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

app.post('/insertar', async (req, res) => {
  const { Titulo, Contenido, Autor, Categoria, Fecha_de_publicacion } = req.body;

  // Validación de entrada
  if (!Titulo || !Contenido || !Autor || !Categoria || !Fecha_de_publicacion) {
    return res.status(400).send('Todos los campos son obligatorios.');
  }

  let pool;
  let transaction;

  try {
    pool = await mssql.connect(sqlConfig);
    transaction = new mssql.Transaction(pool);
    await transaction.begin();

    const result = await pool
      .request()
      .input('Titulo', mssql.NVarChar, Titulo)
      .input('Contenido', mssql.NVarChar, Contenido)
      .input('Autor', mssql.NVarChar, Autor)
      .input('Categoria', mssql.NVarChar, Categoria)
      .input('Fecha_de_publicacion', mssql.DateTime, Fecha_de_publicacion)
      .query('INSERT INTO Publicacion (Titulo, Contenido, Autor, Categoria, Fecha_de_publicacion) VALUES (@Titulo, @Contenido, @Autor, @Categoria, @Fecha_de_publicacion)');

    // Confirmar la transacción si todo está bien
    await transaction.commit();
    res.status(201).send('Artículo insertado con éxito');
  } catch (error) {
    // Revertir la transacción en caso de error
    if (transaction) {
      await transaction.rollback();
    }

    if (error.number === 2627) { // Violación de clave única
      return res.status(400).send('Error al insertar el artículo: El título ya existe.');
    }

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
//end point para delete 
app.delete('/DeleteArticulo/:id',async (req,res)=>{
const {id}= req.params;
let pool;
try {
  pool = await mssql.connect(sqlConfig);
  const result= await pool
  .request()
  .input('ID', mssql.Int, id)
  .query('DELETE FROM Publicacion WHERE ID = @ID');
  if (result.rowsAffected[0] > 0) {
    res.status(200).send('Artículo eliminado con éxito');
  } else {
    res.status(404).send('Artículo no encontrado');
  }
} catch (error) {
  console.error('Error al eliminar el artículo:', error.message);
    res.status(500).send('Error al eliminar el artículo: ' + error.message);
}
finally {
  if (pool) {
    pool.close();
  }
}
});
// end point para select por id 
app.get('/ObtenerArticulo/:id', async (req, res) => {
  const { id } = req.params;

  let pool;
  try {
    pool = await mssql.connect(sqlConfig);

    const result = await pool
      .request()
      .input('ID', mssql.Int, id)
      .query('SELECT * FROM Publicacion WHERE ID = @ID');

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).send('Artículo no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener el artículo:', error.message);
    res.status(500).send('Error al obtener el artículo: ' + error.message);
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
