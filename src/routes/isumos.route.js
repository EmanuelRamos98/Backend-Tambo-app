import express from "express";
import {
    createInsumoController,
    deleteInsumoController,
    getInsumoByIdController,
    getInsumosController,
    updateInsumoController,
} from "../controllers/insumo.controller.js";
import authMiddleware from "../middlewares/auth.meddleware.js";

const insumosRoute = express.Router();

insumosRoute.get("/", authMiddleware(), getInsumosController);
insumosRoute.post("/", authMiddleware(), createInsumoController);
insumosRoute.get("/:id", authMiddleware(), getInsumoByIdController);
insumosRoute.put("/:id", authMiddleware(), updateInsumoController);
insumosRoute.delete("/:id", authMiddleware(), deleteInsumoController);

export default insumosRoute;
