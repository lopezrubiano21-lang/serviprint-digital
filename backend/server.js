const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// Conexión con PostgreSQL / Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Configuración
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de HITEK funcionando correctamente'
  });
});

// Probar conexión con la base de datos
app.get('/api/prueba-db', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT NOW()');

    res.json({
      mensaje: 'Base de datos conectada correctamente',
      fecha: resultado.rows[0].now
    });
  } catch (error) {
    console.error('Error de conexión:', error);

    res.status(500).json({
      mensaje: 'No fue posible conectar con la base de datos'
    });
  }
});

// Consultar todos los clientes
app.get('/api/clientes', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM clientes ORDER BY id ASC'
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al consultar clientes:', error);

    res.status(500).json({
      mensaje: 'Error al consultar los clientes'
    });
  }
});

// Registrar un cliente
app.post('/api/clientes', async (req, res) => {
  try {
    const {
      nombre,
      empresa,
      telefono,
      correo,
      direccion
    } = req.body;

    if (!nombre || !telefono || !correo) {
      return res.status(400).json({
        mensaje: 'Nombre, teléfono y correo son obligatorios.'
      });
    }

    const resultado = await pool.query(
      `INSERT INTO clientes
       (nombre, empresa, telefono, correo, direccion)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        nombre,
        empresa || '',
        telefono,
        correo,
        direccion || ''
      ]
    );

    res.status(201).json({
      mensaje: 'Cliente registrado correctamente.',
      cliente: resultado.rows[0]
    });

  } catch (error) {
    console.error('Error al registrar cliente:', error);

    res.status(500).json({
      mensaje: 'No fue posible registrar el cliente.'
    });
  }
});

// ==========================================
// EQUIPOS
// ==========================================

// Consultar todos los equipos
app.get('/api/equipos', async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT 
        equipos.*,
        clientes.nombre AS cliente_nombre,
        clientes.empresa AS cliente_empresa
      FROM equipos
      INNER JOIN clientes
        ON equipos.cliente_id = clientes.id
      ORDER BY equipos.id ASC
    `);

    res.json(resultado.rows);

  } catch (error) {
    console.error('Error al consultar equipos:', error);

    res.status(500).json({
      mensaje: 'Error al consultar los equipos'
    });
  }
});

// Registrar un equipo
app.post('/api/equipos', async (req, res) => {
  try {
    const {
      cliente_id,
      nombre,
      marca,
      modelo,
      numero_serie,
      ubicacion,
      estado
    } = req.body;

    if (!cliente_id || !nombre) {
      return res.status(400).json({
        mensaje: 'Cliente y nombre del equipo son obligatorios.'
      });
    }

    const resultado = await pool.query(
      `INSERT INTO equipos
       (cliente_id, nombre, marca, modelo, numero_serie, ubicacion, estado)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        cliente_id,
        nombre,
        marca || '',
        modelo || '',
        numero_serie || '',
        ubicacion || '',
        estado || 'Activo'
      ]
    );

    res.status(201).json({
      mensaje: 'Equipo registrado correctamente.',
      equipo: resultado.rows[0]
    });

  } catch (error) {
    console.error('Error al registrar equipo:', error);

    res.status(500).json({
      mensaje: 'No fue posible registrar el equipo.'
    });
  }
});

// ==========================================
// MANTENIMIENTOS
// ==========================================

// Consultar todos los mantenimientos
app.get('/api/mantenimientos', async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT
        mantenimientos.*,
        clientes.nombre AS cliente_nombre,
        clientes.empresa AS cliente_empresa,
        equipos.nombre AS equipo_nombre,
        equipos.marca AS equipo_marca,
        equipos.modelo AS equipo_modelo
      FROM mantenimientos
      INNER JOIN clientes
        ON mantenimientos.cliente_id = clientes.id
      INNER JOIN equipos
        ON mantenimientos.equipo_id = equipos.id
      ORDER BY mantenimientos.id DESC
    `);

    res.json(resultado.rows);

  } catch (error) {
    console.error('Error al consultar mantenimientos:', error);

    res.status(500).json({
      mensaje: 'Error al consultar los mantenimientos'
    });
  }
});

// Registrar un mantenimiento
app.post('/api/mantenimientos', async (req, res) => {
  try {
    const {
      cliente_id,
      equipo_id,
      usuario_id,
      fecha,
      tipo,
      diagnostico,
      trabajo_realizado,
      observaciones,
      transporte,
      estado
    } = req.body;

    if (
      !cliente_id ||
      !equipo_id ||
      !fecha ||
      !tipo ||
      !trabajo_realizado
    ) {
      return res.status(400).json({
        mensaje: 'Cliente, equipo, fecha, tipo y trabajo realizado son obligatorios.'
      });
    }

    const resultado = await pool.query(
      `INSERT INTO mantenimientos
       (
         cliente_id,
         equipo_id,
         usuario_id,
         fecha,
         tipo,
         diagnostico,
         trabajo_realizado,
         observaciones,
         transporte,
         estado
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        cliente_id,
        equipo_id,
        usuario_id || null,
        fecha,
        tipo,
        diagnostico || '',
        trabajo_realizado,
        observaciones || '',
        transporte || '',
        estado || 'Completado'
      ]
    );

    res.status(201).json({
      mensaje: 'Mantenimiento registrado correctamente.',
      mantenimiento: resultado.rows[0]
    });

  } catch (error) {
    console.error('Error al registrar mantenimiento:', error);

    res.status(500).json({
      mensaje: 'No fue posible registrar el mantenimiento.'
    });
  }
});

// ===============================
// RUTAS DE USUARIOS
// ===============================

// Consultar usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT id, nombre, correo, rol, fecha_registro
      FROM usuarios
      ORDER BY id ASC
    `);

    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al consultar usuarios:', error);
    res.status(500).json({
      error: 'Error al consultar los usuarios'
    });
  }
});


// Registrar un usuario
app.post('/api/usuarios', async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body;

    if (!nombre || !correo || !contrasena || !rol) {
      return res.status(400).json({
        error: 'Todos los campos son obligatorios'
      });
    }

    // Proteger la contraseña antes de guardarla
    const bcrypt = require('bcryptjs');
    const contrasenaHash = await bcrypt.hash(contrasena, 10);

    const resultado = await pool.query(
      `INSERT INTO usuarios
       (nombre, correo, contrasena, rol)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nombre, correo, rol, fecha_registro`,
      [nombre, correo, contrasenaHash, rol]
    );

    res.status(201).json(resultado.rows[0]);

  } catch (error) {
    console.error('Error al registrar usuario:', error);

    if (error.code === '23505') {
      return res.status(409).json({
        error: 'Ya existe un usuario con ese correo'
      });
    }

    res.status(500).json({
      error: 'Error al registrar el usuario'
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(
    `API de HITEK ejecutándose en http://localhost:${PORT}`
  );
});