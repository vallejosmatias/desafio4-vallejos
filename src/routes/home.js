import express from "express";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res)=>{
  try{
    const products = await obtenerProductos();
    res.render('home', { products })
  } catch(error){
    res.status(500).json({error: error.message});
  }
});

export default router;