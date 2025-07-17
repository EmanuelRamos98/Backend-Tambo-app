import express from "express";
import authMiddleware from "../middlewares/auth.meddleware.js";
import validarId from "../middlewares/validarId.middleware.js";
import {
    createInsumoController,
    deleteInsumoController,
    getInsumoByIdController,
    getInsumosController,
    updateInsumoController,
} from "../controllers/insumo.controller.js";

const insumosRoute = express.Router();

insumosRoute.get("/", authMiddleware(), getInsumosController);
insumosRoute.post("/", authMiddleware(), createInsumoController);

insumosRoute.get(
    "/:id",
    authMiddleware(),
    validarId("id", "ID de insumo"),
    getInsumoByIdController
);

insumosRoute.put(
    "/:id",
    authMiddleware(),
    validarId("id", "ID de insumo"),
    updateInsumoController
);

insumosRoute.delete(
    "/:id",
    authMiddleware(),
    validarId("id", "ID de insumo"),
    deleteInsumoController
);

export default insumosRoute;
