require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./models/Data');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/save', (req, res) => {
    const { id_llamada, nombre_cliente, documento, smnet, tipiweb, observaciones, tecnologia, tiposervicio, naturaleza, horario_b2b, nombre_atiende, celular_atiende, dias_atiende } = req.body;
    
    const query = 'INSERT INTO datos_formulario (id_llamada, nombre_cliente, documento, smnet, tipiweb, observaciones, tecnologia, tiposervicio, naturaleza, horario_b2b, nombre_atiende, celular_atiende, dias_atiende) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    connection.query(query, [id_llamada, nombre_cliente, documento, smnet, tipiweb, observaciones, tecnologia, tiposervicio, naturaleza, horario_b2b, nombre_atiende, celular_atiende, dias_atiende], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Error inserting data' });
            return;
        }
        res.status(200).json({ message: 'Data saved successfully' });
    });
});

app.get('/api/get/:documento', (req, res) => {
    const documento = req.params.documento;
    
    const query = 'SELECT * FROM datos_formulario WHERE documento = ?';
    
    connection.query(query, [documento], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Error fetching data' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'No data found for the given document' });
        } else {
            res.status(200).json(results[0]);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
