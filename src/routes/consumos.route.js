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
import validarId from "../middlewares/validarId.middleware.js";

const consumosRoute = express.Router();

consumosRoute.get(
    "/rodeo/:rodeoId",
    authMiddleware(),
    validarId("rodeoId", "Id de rodeo"),
    getConsumoRodeo
);
consumosRoute.post(
    "/rodeo/:rodeoId",
    authMiddleware(),
    validarId("rodeoId", "Id de rodeo"),
    createConsumoRodeo
);

consumosRoute.get(
    "/vaca/:vacaId",
    authMiddleware(),
    validarId("vacaId", "Id de vaca"),
    getConsumoVaca
);
consumosRoute.post(
    "/vaca/:vacaId",
    authMiddleware(),
    validarId("vacaId", "Id de vaca"),
    createConsumoVaca
);

consumosRoute.put(
    "/:id",
    authMiddleware(),
    validarId("ID", "ID de consumo"),
    updateConsumoController
);
consumosRoute.delete(
    "/:id",
    authMiddleware(["admin"]),
    validarId("ID", "ID de consumo"),
    deleteConsumoController
);

export default consumosRoute;
