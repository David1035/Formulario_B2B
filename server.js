const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); // Agrega esta línea para usar sqlite3

const app = express();
const PORT = 3000;

// Configura bodyParser
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Crea o abre la base de datos
const db = new sqlite3.Database('clientesTigo.db', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Crea la tabla si no existe
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS clientesData (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        horaInicial TEXT,
        horaFinal TEXT,
        fechaActual DATE,
        idLlamada TEXT,
        nombreClient TEXT,
        documentValue TEXT,
        smnet TEXT,
        tipiWeb TEXT,
        observaciones TEXT,
        tecnologia TEXT,
        tiposervicio TEXT,
        naturaleza TEXT,
        celular TEXT,
        horarioB2B TEXT,
        nombreAtiende TEXT,
        celularAtiende TEXT,
        diasAtiende TEXT,
        horarioAtiende TEXT
    )`);
});

// Ruta para guardar los datos en la base de datos
app.post('/save-data', (req, res) => {
    const data = req.body;
    const sql = `INSERT INTO clientesData (
        horaInicial, horaFinal, fechaActual, idLlamada, nombreClient, documentValue, smnet,
        tipiWeb, observaciones, tecnologia, tiposervicio, naturaleza, celular, horarioB2B,
        nombreAtiende, celularAtiende, diasAtiende, horarioAtiende
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(sql, [
        data.horaInicial, data.horaFinal, data.fechaActual, data.idLlamada, data.nombreClient,
        data.documentValue, data.smnet, data.tipiWeb, data.observaciones, data.tecnologia,
        data.tiposervicio, data.naturaleza, data.celular, data.horarioB2B, data.nombreAtiende,
        data.celularAtiende, data.diasAtiende, data.horarioAtiende
    ], (err) => {
        if (err) {
            console.error('Error al guardar en la base de datos:', err.message);
            res.status(500).send('Error al guardar en la base de datos');
        } else {
            res.send('Datos guardados correctamente');
        }
    });
});

// Cierra la base de datos cuando el servidor se detiene
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error al cerrar la base de datos:', err.message);
        } else {
            console.log('Base de datos cerrada.');
        }
        process.exit(0);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
