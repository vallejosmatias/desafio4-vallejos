import express from "express";
import cartsRouter from "./routes/cart.js";
import productsRouter from "./routes/products.js";
import __dirname from "./utils.js";
import {engine} from "express-handlebars";
import { Server } from "socket.io";
import homeRouter from "./routes/home.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set( "views", "/views");


app.get("/", (req, res)=>{
  res.send("hola mundo");
})

//rutas
app.use('/carts', cartsRouter);
app.use('/products', productsRouter);
app.use("/", homeRouter);

app.get('/', (req, res) => {
  res.render('home', { productos: obtenerProductos() });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { productos: obtenerProductos() });
});


const httpServer = app.listen(PORT, ()=>{
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})

const socketServer = new Server(httpServer);