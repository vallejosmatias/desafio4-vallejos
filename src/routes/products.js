// Importa los módulos necesarios
import express from 'express';
import fs from 'fs/promises';
import { Router } from 'express';


const router = Router();

// Ruta GET /api/products/
router.get('/', async (req, res) => {
  try {
    // Lógica para obtener y enviar productos
    const products = await obtenerProductos();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta GET /api/products/:pid
router.get('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await obtenerProductoPorId(productId);
    res.json({ product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    const productoAgregado = await agregarProducto(newProduct);
    res.status(201).json(productoAgregado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const updatedFields = req.body;
    const productoActualizado = await actualizarProducto(productId, updatedFields);
    res.json(productoActualizado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    await eliminarProducto(productId);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;


