const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');



const app = express();
app.use(express.json()); // Permite recibir solicitudes con contenido JSON
app.use(cors()); // Habilita CORS para todas las solicitudes

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: 'sql7.freemysqlhosting.net',
  user: 'sql7632213',  // Reemplaza 'usuario' y 'contraseña' con tus datos
  password: 'y84CmTviRS',
  database: 'sql7632213'
});

// Endpoint para obtener todos los temas
app.get('/temas', (req, res) => {
  pool.query('SELECT * FROM Temas', (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

// Endpoint para añadir un nuevo tema
app.post('/temas', (req, res) => {
  const tema = req.body.tema;
  pool.query('INSERT INTO Temas (tema) VALUES (?)', [tema], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json({id: result.insertId});
    }
  });
});
// Endpoint para eliminar un tema por ID
app.delete('/temas/:id', (req, res) => {
    const temaId = req.params.id;
    pool.query('DELETE FROM Temas WHERE id_tema = ?', [temaId], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ message: 'Tema no encontrado' });
        } else {
          res.status(200).json({ message: 'Tema eliminado correctamente' });
        }
      }
    });
  });
  
  
  
  // Endpoint para actualizar un tema por ID
  app.put('/temas/:id', (req, res) => {
    const temaId = req.params.id;
    const nuevoTema = req.body.tema;
    pool.query('UPDATE Temas SET tema = ? WHERE id_tema = ?', [nuevoTema, temaId], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ message: 'Tema no encontrado' });
        } else {
          res.status(200).json({ message: 'Tema actualizado correctamente' });
        }
      }
    });
  });

  // Endpoint para obtener todas las preguntas
app.get('/preguntas', (req, res) => {
    pool.query('SELECT * FROM Preguntas', (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  // Endpoint para obtener una pregunta por ID
  app.get('/preguntas/:id', (req, res) => {
    const preguntaId = req.params.id;
    pool.query('SELECT * FROM Preguntas WHERE id_pregunta = ?', [preguntaId], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        if (result.length === 0) {
          res.status(404).json({ message: 'Pregunta no encontrada' });
        } else {
          res.status(200).json(result[0]);
        }
      }
    });
  });
  
  // Endpoint para añadir una nueva pregunta
  app.post('/preguntas', (req, res) => {
    const { id_tema, pregunta, dificultad } = req.body;
    pool.query('INSERT INTO Preguntas (id_tema, pregunta, dificultad) VALUES (?, ?, ?)', [id_tema, pregunta, dificultad], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        console.log(req.body)
        res.status(201).json({ id: result.insertId });
      }
    });
  });
  
  // Endpoint para actualizar una pregunta por ID
  app.put('/preguntas/:id', (req, res) => {
    const preguntaId = req.params.id;
    const { id_tema, pregunta, dificultad } = req.body;
    pool.query('UPDATE Preguntas SET id_tema = ?, pregunta = ?, dificultad = ? WHERE id_pregunta = ?', [id_tema, pregunta, dificultad, preguntaId], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ message: 'Pregunta no encontrada' });
        } else {
          res.status(200).json({ message: 'Pregunta actualizada correctamente' });
        }
      }
    });
  });
  
  // Endpoint para eliminar una pregunta por ID
  app.delete('/preguntas/:id', (req, res) => {
    const preguntaId = req.params.id;
    pool.query('DELETE FROM Respuestas WHERE id_pregunta = ?', [preguntaId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: err.message || 'Unspecified server error occurred' });
      } else {
        pool.query('DELETE FROM Preguntas WHERE id_pregunta = ?', [preguntaId], (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: err.message || 'Unspecified server error occurred' });
          } else {
            if (result.affectedRows === 0) {
              res.status(404).json({ message: 'Pregunta no encontrada' });
            } else {
              res.status(200).json({ message: 'Pregunta eliminada correctamente' });
            }
          }
        });
      }
    });
});



  // Endpoint para obtener todas las respuestas
// Endpoint para añadir una nueva respuesta
app.post('/respuestas', (req, res) => {
  const { id_pregunta, respuesta, es_correcta } = req.body;

  // Imprimir el cuerpo de la solicitud en la consola
  console.log(req.body);

  pool.query('INSERT INTO Respuestas (id_pregunta, respuesta, es_correcta) VALUES (?, ?, ?)', [id_pregunta, respuesta, es_correcta], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json({ id: result.insertId });
    }
  });
});

  
  // Endpoint para obtener una respuesta por ID
  app.get('/respuestas/:id', (req, res) => {
    const respuestaId = req.params.id;
    pool.query('SELECT * FROM Respuestas WHERE id_respuesta = ?', [respuestaId], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        if (result.length === 0) {
          res.status(404).json({ message: 'Respuesta no encontrada' });
        } else {
          res.status(200).json(result[0]);
        }
      }
    });
  });
  
  // Endpoint para añadir una nueva respuesta
  app.post('/respuestas', (req, res) => {
    const { id_pregunta, respuesta, es_correcta } = req.body;
    pool.query('INSERT INTO Respuestas (id_pregunta, respuesta, es_correcta) VALUES (?, ?, ?)', [id_pregunta, respuesta, es_correcta], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(201).json({ id: result.insertId });
      }
    });
  });
  
  // Endpoint para actualizar una respuesta por ID
  app.put('/respuestas/:id', (req, res) => {
    const respuestaId = req.params.id;
    const { id_pregunta, respuesta, es_correcta } = req.body;
    pool.query('UPDATE Respuestas SET id_pregunta = ?, respuesta = ?, es_correcta = ? WHERE id_respuesta = ?', [id_pregunta, respuesta, es_correcta, respuestaId], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ message: 'Respuesta no encontrada' });
        } else {
          res.status(200).json({ message: 'Respuesta actualizada correctamente' });
        }
      }
    });
  });
  
  // Endpoint para eliminar una respuesta por ID
  app.delete('/respuestas/:id', (req, res) => {
    const respuestaId = req.params.id;
    pool.query('DELETE FROM Respuestas WHERE id_respuesta = ?', [respuestaId], (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message || 'Unspecified server error occurred' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ message: 'Respuesta no encontrada' });
        } else {
          res.status(200).json({ message: 'Respuesta eliminada correctamente' });
        }
      }
    });
  });

  
app.post('/examen', (req, res) => {
  const nombresTemas = req.body.nombresTemas;
  const dificultad = req.body.dificultad;
  const limite = req.body.limite;

  // Obtener los IDs de los temas correspondientes
  pool.query(
    'SELECT id_tema FROM Temas WHERE tema IN (?)',
    [nombresTemas],
    (err, temasResult) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const temaIds = temasResult.map((tema) => tema.id_tema);

        // Obtener las preguntas según los temas y dificultad seleccionados
        pool.query(
          'SELECT * FROM Preguntas WHERE id_tema IN (?) AND dificultad = ? ORDER BY RAND() LIMIT ?',
          [temaIds, dificultad, limite],
          (err, preguntasResult) => {
            if (err) {
              res.status(500).json(err);
            } else {
              const preguntas = preguntasResult;

              // Obtener las respuestas mezcladas para cada pregunta
              const preguntaIds = preguntas.map((pregunta) => pregunta.id_pregunta);
              pool.query(
                'SELECT * FROM Respuestas WHERE id_pregunta IN (?) ORDER BY RAND()',
                [preguntaIds],
                (err, respuestasResult) => {
                  if (err) {
                    res.status(500).json(err);
                  } else {
                    const respuestasPorPregunta = new Map();
                    respuestasResult.forEach((respuesta) => {
                      if (!respuestasPorPregunta.has(respuesta.id_pregunta)) {
                        respuestasPorPregunta.set(respuesta.id_pregunta, []);
                      }
                      respuestasPorPregunta.get(respuesta.id_pregunta).push(respuesta);
                    });

                    // Construir el objeto de examen con preguntas y respuestas
                    const examen = preguntas.map((pregunta) => {
                      return {
                        id_pregunta: pregunta.id_pregunta,
                        pregunta: pregunta.pregunta,
                        respuestas: respuestasPorPregunta.get(pregunta.id_pregunta),
                      };
                    });

                    res.status(200).json({ preguntas: examen });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});



  

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});
