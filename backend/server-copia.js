
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

// Configuración
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de HITEK funcionando correctamente'
    });
});

// Ruta para probar el envío de información
app.post('/api/pruebas', (req, res) => {
    const datos = req.body;

    res.status(201).json({
        mensaje: 'Prueba recibida correctamente',
        datos: datos
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`API de HITEK ejecutándose en http://localhost:${PORT}`);
});