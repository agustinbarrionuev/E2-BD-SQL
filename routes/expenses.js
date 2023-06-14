const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los gastos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expenses');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los gastos', error);
    res.status(500).json({ error: 'Error al obtener los gastos' });
  }
});

// Crear un nuevo gasto
router.post('/', async (req, res) => {
    const { name, amount } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO expenses (name, amount) VALUES ($1, $2) RETURNING *',
        [name, amount]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error al crear el gasto', error);
      res.status(500).json({ error: 'Error al crear el gasto' });
    }
  });

  // Obtener un gasto por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('SELECT * FROM expenses WHERE id = $1', [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Gasto no encontrado' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error al obtener el gasto', error);
      res.status(500).json({ error: 'Error al obtener el gasto' });
    }
  });

  // Actualizar un gasto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, amount } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE expenses SET name = $1, amount = $2 WHERE id = $3 RETURNING *',
        [name, amount, id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Gasto no encontrado' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el gasto', error);
      res.status(500).json({ error: 'Error al actualizar el gasto' });
    }
  });

  // Eliminar un gasto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('DELETE FROM expenses WHERE id = $1 RETURNING *', [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Gasto no encontrado' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error al eliminar el gasto', error);
      res.status(500).json({ error: 'Error al eliminar el gasto' });
    }
  });
  
module.exports = router;
