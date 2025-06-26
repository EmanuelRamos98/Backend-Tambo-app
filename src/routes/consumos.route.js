import express from "express";
import authMiddleware from "../middlewares/auth.meddleware.js";
import {
    createConsumoRodeo,
    createConsumoVaca,
    deleteConsumoController,
    getConsumoRodeo,
    getConsumoVaca,
    updateConsumoController,
} from "../controllers/consumo.controller.js";

const consumosRoute = express.Router();

consumosRoute.get("/rodeo/:rodeoId", authMiddleware(), getConsumoRodeo);
consumosRoute.post("/rodeo/:rodeoId", authMiddleware(), createConsumoRodeo);

consumosRoute.get("/vaca/:vacaId", authMiddleware(), getConsumoVaca);
consumosRoute.post("/vaca/:vacaId", authMiddleware(), createConsumoVaca);

consumosRoute.put("/:id", authMiddleware(), updateConsumoController);
consumosRoute.delete(
    "/:id",
    authMiddleware(["admin"]),
    deleteConsumoController
);

export default consumosRoute;
