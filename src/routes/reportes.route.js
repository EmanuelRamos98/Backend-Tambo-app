import express from "express";
import authMiddleware from "../middlewares/auth.meddleware.js";
import validarId from "../middlewares/validarId.middleware.js";
import {
    reportePorRodeo,
    reportePorTambo,
    reportePorVaca,
} from "../controllers/reportes.controller.js";

const reporteRoute = express.Router();

reporteRoute.get(
    "/tambo/:id",
    authMiddleware(),
    validarId("id", "ID de tambo"),
    reportePorTambo
);

reporteRoute.get(
    "/rodeo/:id",
    authMiddleware(),
    validarId("id", "ID de rodeo"),
    reportePorRodeo
);

reporteRoute.get(
    "/vaca/:id",
    authMiddleware(),
    validarId("id", "ID de vaca"),
    reportePorVaca
);

export default reporteRoute;
