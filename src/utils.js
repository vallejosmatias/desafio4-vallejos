import {fileURLToPath} from "url";
import {dirname} from "path";
import path from 'path';

export const __filename = fileURLToPath (import.meta.url);
export const  __dirname = dirname(__filename);


export default __dirname;

// Funciones de manejo de productos
async function obtenerProductos() {
  const data = await fs.readFile(PRODUCTS_FILE_PATH, 'utf8');
  return JSON.parse(data) || [];
}

async function obtenerProductoPorId(productId) {
  const productos = await obtenerProductos();
  const product = productos.find(p => p.id == productId);
  if (product) {
    return product;
  } else {
    throw new Error('Producto no encontrado.');
  }
}

async function agregarProducto(producto) {
  const productos = await obtenerProductos();
  const newProduct = {
    id: productos.length + 1,
    ...producto,
  };
  productos.push(newProduct);
  await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(productos, null, 2));
  return newProduct;
}

async function actualizarProducto(productId, updatedFields) {
  const productos = await obtenerProductos();
  const index = productos.findIndex(p => p.id == productId);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...updatedFields, id: productId };
    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(productos, null, 2));
    return productos[index];
  } else {
    throw new Error('Producto no encontrado para actualizar.');
  }
}

async function eliminarProducto(productId) {
  let productos = await obtenerProductos();
  const index = productos.findIndex(p => p.id == productId);
  if (index !== -1) {
    productos.splice(index, 1);
    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(productos, null, 2));
  } else {
    throw new Error('Producto no encontrado para eliminar.');
  }
}

// Ruta de archivo para productos 
const PRODUCTS_FILE_PATH = path.join(__dirname, '..', 'data', 'products.json');


// Funciones de manejo de carritos

async function crearCarrito() {
  // crear un nuevo carrito
  const data = await fs.readFile(CARTS_FILE_PATH, 'utf8');
  const carritos = JSON.parse(data) || [];
  const nuevoCarrito = {
    id: generateCartId(),
    products: [],
  };
  carritos.push(nuevoCarrito);
  await fs.writeFile(CARTS_FILE_PATH, JSON.stringify(carritos, null, 2));
  return nuevoCarrito;
}

//obtener productos en un carrito
async function obtenerProductosEnCarrito(cartId) {
  const carritos = await obtenerCarritos();
  const carrito = carritos.find(c => c.id == cartId);
  if (carrito) {
    return carrito.products;
  } else {
    throw new Error('Carrito no encontrado.');
  }
}

//agregar un producto a un carrito
async function agregarProductoAlCarrito(cartId, productId) {
  let carritos = await obtenerCarritos();
  const cartIndex = carritos.findIndex(c => c.id == cartId);
  if (cartIndex !== -1) {
    const productIndex = carritos[cartIndex].products.findIndex(p => p.id == productId);

    if (productIndex === -1) {
      carritos[cartIndex].products.push({
        id: productId,
        quantity: 1,
      });
    } else {
      carritos[cartIndex].products[productIndex].quantity++;
    }

    await fs.writeFile(CARTS_FILE_PATH, JSON.stringify(carritos, null, 2));
    return carritos[cartIndex].products;
  } else {
    throw new Error('Carrito no encontrado para agregar producto.');
  }
}

// Función para obtener carritos desde el archivo
async function obtenerCarritos() {
  const data = await fs.readFile(CARTS_FILE_PATH, 'utf8');
  return JSON.parse(data) || [];
}

// Función para generar un nuevo ID de carrito
function generateCartId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Ruta de archivo para carritos
const CARTS_FILE_PATH = path.join(__dirname, '..', 'data', 'carts.json');

