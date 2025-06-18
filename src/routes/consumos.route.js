import express from "express";
import authMiddleware from "../middlewares/auth.meddleware.js";
import {
    createConsumoRodeo,
    createConsumoVaca,
    getConsumoRodeo,
    getConsumoVaca,
} from "../controllers/consumo.controller.js";

const consumosRoute = express.Router();

consumosRoute.get("/rodeo/:rodeoId", authMiddleware(), getConsumoRodeo);
consumosRoute.post("/rodeo/:rodeoId", authMiddleware(), createConsumoRodeo);

consumosRoute.get("/vaca/:vacaId", authMiddleware(), getConsumoVaca);
consumosRoute.post("/vaca/:vacaId", authMiddleware(), createConsumoVaca);

export default consumosRoute;
