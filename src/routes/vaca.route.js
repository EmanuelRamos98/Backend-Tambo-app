import express from "express";
import authMiddleware from "../middlewares/auth.meddleware.js";
import validarId from "../middlewares/validarId.middleware.js";
import {
    createVacaController,
    deleteVacaController,
    getVacaByIdController,
    getVacasController,
    moverVacaController,
    seguimientoController,
    updateVacaController,
} from "../controllers/vaca.controller.js";

const vacaRoute = express.Router();

vacaRoute.get(
    "/rodeo/:rodeoId",
    authMiddleware(),
    validarId("rodeoId", "ID de rodeo"),
    getVacasController
);
vacaRoute.post(
    "/rodeo/:rodeoId",
    authMiddleware(),
    validarId("rodeoId", "ID de rodeo"),
    createVacaController
);

vacaRoute.get(
    "/:id",
    authMiddleware(),
    validarId("id", "ID de vaca"),
    getVacaByIdController
);
vacaRoute.put(
    "/:id",
    authMiddleware(),
    validarId("id", "ID de vaca"),
    updateVacaController
);
vacaRoute.get(
    "/:id/seguimiento",
    authMiddleware(),
    validarId("id", "ID de vaca"),
    seguimientoController
);
vacaRoute.delete(
    "/:id",
    authMiddleware(),
    validarId("id", "ID de vaca"),
    deleteVacaController
);

vacaRoute.post(
    "/:id/mover",
    authMiddleware(),
    validarId("id", "ID de vaca"),
    moverVacaController
);

export default vacaRoute;
