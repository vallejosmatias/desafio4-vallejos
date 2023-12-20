// Importa los módulos necesarios
import express from 'express';
import fs from 'fs/promises';
import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const nuevoCarrito = await crearCarrito();
    res.status(201).json(nuevoCarrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productosEnCarrito = await obtenerProductosEnCarrito(cartId);
    res.json(productosEnCarrito);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    //agregar el producto al arreglo “products” del carrito seleccionado
    const productosEnCarrito = await agregarProductoAlCarrito(cartId, productId);
    res.json(productosEnCarrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
