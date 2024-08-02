const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Configura bodyParser
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Función para conectar y guardar datos en la base de datos adecuada
function guardarDatosEnDB(dbName, data) {
    const db = new sqlite3.Database(dbName);
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
        } else {
            console.log(`Datos guardados correctamente en ${dbName}`);
        }
    });

    db.close();
}

// Ruta para guardar los datos en la base de datos
app.post('/save-data', (req, res) => {
    const { dbName, ...data } = req.body;

    if (dbName && data) {
        guardarDatosEnDB(dbName, data);
        res.send('Datos guardados correctamente');
    } else {
        res.status(400).send('Datos incompletos');
    }
});

// Ruta para obtener el tiempo total, tiempo global y promedio
app.get('/tiempoTotal', (req, res) => {
    const db = new sqlite3.Database('clientesTigo.db'); // Ajusta esta línea según sea necesario

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
                console.error('Fechas inválidas para el ID');
            }
        });

        const minutosGlobal = Math.floor(tiempoGlobal / 60);
        const segundosGlobal = tiempoGlobal % 60;
        const promedio = cantidadIngresos > 0 ? tiempoGlobal / cantidadIngresos : 0;
        const minutosPromedio = Math.floor(promedio / 60);
        const segundosPromedio = promedio % 60;

        res.json({ minutosGlobal, segundosGlobal, minutosPromedio, segundosPromedio, cantidadIngresos });
    });

    db.close();
});

// Cierra la base de datos cuando el servidor se detiene
process.on('SIGINT', () => {
    console.log('Base de datos cerrada.');
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
