import express from "express";
import {
    createVacaController,
    deleteVacaController,
    getVacaByIdController,
    getVacasController,
    moverVacaController,
    seguimientoController,
    updateVacaController,
} from "../controllers/vaca.controller.js";
import authMiddleware from "../middlewares/auth.meddleware.js";

const vacaRoute = express.Router();

vacaRoute.get("/rodeo/:rodeoId", authMiddleware(), getVacasController);
vacaRoute.post("/rodeo/:rodeoId", authMiddleware(), createVacaController);

vacaRoute.get("/:id", authMiddleware(), getVacaByIdController);
vacaRoute.put("/:id", authMiddleware(), updateVacaController);
vacaRoute.get("/:id/seguimiento", authMiddleware(), seguimientoController);
vacaRoute.delete("/:id", authMiddleware(), deleteVacaController);

vacaRoute.post("/:id/mover", authMiddleware(), moverVacaController);

export default vacaRoute;
