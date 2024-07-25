const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/save-text', (req, res) => {
    const { texto1 } = req.body;
    const filePath = path.join(__dirname, 'output.txt');

    fs.appendFile(filePath, texto1 + '\n', (err) => {
        if (err) {
            console.error('Error al guardar el archivo:', err);
            return res.status(500).send('Error al guardar el archivo');
        }
        res.send('Texto guardado correctamente');
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
