import express from "express";
import authMiddleware from "../middlewares/auth.meddleware.js";
import validarId from "../middlewares/validarId.middleware.js";
import {
    createRodeoController,
    deleteRodeoController,
    getRodeoByIdController,
    getRodeosController,
    updateRodeoController,
} from "../controllers/rodeo.controller.js";

const rodeosRoute = express.Router();

rodeosRoute.get(
    "/tambo/:tamboId",
    authMiddleware(),
    validarId("tamboId", "Id de tambo"),
    getRodeosController
);

rodeosRoute.post(
    "/tambo/:tamboId",
    authMiddleware(),
    validarId("tamboId", "Id de tambo"),
    createRodeoController
);

rodeosRoute.get(
    "/:id",
    authMiddleware(),
    validarId("id", "Id de Rodeo"),
    getRodeoByIdController
);

rodeosRoute.put(
    "/:id",
    authMiddleware(),
    validarId("id", "Id de Rodeo"),
    updateRodeoController
);

rodeosRoute.delete(
    "/:id",
    authMiddleware(),
    validarId("id", "Id de Rodeo"),
    deleteRodeoController
);

export default rodeosRoute;
