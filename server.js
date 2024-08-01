const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

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

// Ruta para obtener el tiempo total, tiempo global y promedio
app.get('/tiempoTotal', (req, res) => {
    db.serialize(() => {
        db.all(`SELECT horaInicial, horaFinal FROM clientesData`, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Error al obtener los datos');
                return;
            }

            let tiempoGlobal = 0;
            let cantidadIngresos = rows.length;

            rows.forEach(row => {
                let horaInicial = new Date(row.horaInicial);
                let horaFinal = new Date(row.horaFinal);

                if (!isNaN(horaInicial.getTime()) && !isNaN(horaFinal.getTime())) {
                    let tiempoIngreso = (horaFinal - horaInicial) / 1000; // tiempo en segundos
                    tiempoGlobal += tiempoIngreso;
                } else {
                    console.error(`Fechas inválidas para el ID`);
                }
            });

            const minutosGlobal = Math.floor(tiempoGlobal / 60);
            const segundosGlobal = tiempoGlobal % 60;
            const promedio = cantidadIngresos > 0 ? tiempoGlobal / cantidadIngresos : 0;
            const minutosPromedio = Math.floor(promedio / 60);
            const segundosPromedio = promedio % 60;

            res.json({ minutosGlobal, segundosGlobal, minutosPromedio, segundosPromedio, cantidadIngresos });
        });
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
