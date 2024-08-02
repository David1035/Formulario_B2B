const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Configura bodyParser
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Crea o abre la base de datos para clientesTigo.db
const dbClientesTigo = new sqlite3.Database('clientesTigo.db', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos clientesTigo.db:', err.message);
    } else {
        console.log('Conectado a la base de datos clientesTigo.db.');
    }
});

// Crea o abre la base de datos para clientesTigon1.db
const dbClientesTigon1 = new sqlite3.Database('clientesTigon1.db', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos clientesTigon1.db:', err.message);
    } else {
        console.log('Conectado a la base de datos clientesTigon1.db.');
    }
});

// Ruta para guardar los datos en la base de datos clientesTigo.db
app.post('/save-data', (req, res) => {
    const data = req.body;
    const sql = `INSERT INTO clientesData (
        horaInicial, horaFinal, fechaActual, idLlamada, nombreClient, documentValue, smnet,
        tipiWeb, observaciones, tecnologia, tiposervicio, naturaleza, celular, horarioB2B,
        nombreAtiende, celularAtiende, diasAtiende, horarioAtiende
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    dbClientesTigo.run(sql, [
        data.horaInicial, data.horaFinal, data.fechaActual, data.idLlamada, data.nombreClient,
        data.documentValue, data.smnet, data.tipiWeb, data.observaciones, data.tecnologia,
        data.tiposervicio, data.naturaleza, data.celular, data.horarioB2B, data.nombreAtiende,
        data.celularAtiende, data.diasAtiende, data.horarioAtiende
    ], (err) => {
        if (err) {
            console.error('Error al guardar en la base de datos clientesTigo.db:', err.message);
            res.status(500).send('Error al guardar en la base de datos clientesTigo.db');
        } else {
            res.send('Datos guardados correctamente en clientesTigo.db');
        }
    });
});

// Ruta para guardar los datos en la base de datos clientesTigon1.db
app.post('/save-data-n1', (req, res) => {
    const data = req.body;
    const sql = `INSERT INTO clientesData (
        horaInicial, horaFinal, fechaActual, idLlamada, nombreClient, documentValue, smnet,
        tipiWeb, observaciones, tecnologia, tiposervicio, naturaleza, celular, horarioB2B,
        nombreAtiende, celularAtiende, diasAtiende, horarioAtiende
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    dbClientesTigon1.run(sql, [
        data.horaInicial, data.horaFinal, data.fechaActual, data.idLlamada, data.nombreClient,
        data.documentValue, data.smnet, data.tipiWeb, data.observaciones, data.tecnologia,
        data.tiposervicio, data.naturaleza, data.celular, data.horarioB2B, data.nombreAtiende,
        data.celularAtiende, data.diasAtiende, data.horarioAtiende
    ], (err) => {
        if (err) {
            console.error('Error al guardar en la base de datos clientesTigon1.db:', err.message);
            res.status(500).send('Error al guardar en la base de datos clientesTigon1.db');
        } else {
            res.send('Datos guardados correctamente en clientesTigon1.db');
        }
    });
});


// Ruta para obtener el tiempo total desde clientesTigo.db
app.get('/tiempoTotal', (req, res) => {
    const query = `SELECT horaInicial, horaFinal FROM clientesData`;

    dbClientesTigo.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error al obtener los datos de clientesTigo.db');
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
                console.error('Fechas inválidas en clientesTigo.db');
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

// Ruta para obtener el tiempo total desde clientesTigon1.db
app.get('/tiempoTotalN1', (req, res) => {
    const query = `SELECT horaInicial, horaFinal FROM clientesData`;

    dbClientesTigon1.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error al obtener los datos de clientesTigon1.db');
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
                console.error('Fechas inválidas en clientesTigon1.db');
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


// Cierra la base de datos cuando el servidor se detiene
process.on('SIGINT', () => {
    console.log('Base de datos cerrada.');
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
