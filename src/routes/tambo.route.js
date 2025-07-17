import express from "express";
import authMiddleware from "../middlewares/auth.meddleware.js";
import validarId from "../middlewares/validarId.middleware.js";
import {
    activeTamboController,
    createTamboController,
    deleteTamboController,
    desactiveTamboController,
    getTamboByIdController,
    getTambosController,
    updateTamboController,
} from "../controllers/tambo.controller.js";

const tamboRoute = express.Router();

tamboRoute.get("/", authMiddleware(), getTambosController);

tamboRoute.post("/", authMiddleware(["admin"]), createTamboController);

tamboRoute.get(
    "/:id",
    authMiddleware(),
    validarId("id", "Id de tambo"),
    getTamboByIdController
);

tamboRoute.put(
    "/:id",
    authMiddleware(["admin"]),
    validarId("id", "Id de tambo"),
    updateTamboController
);

tamboRoute.put(
    "/:id/active",
    authMiddleware(["admin"]),
    validarId("id", "Id de tambo"),
    activeTamboController
);
tamboRoute.put(
    "/:id/desactive",
    authMiddleware(["admin"]),
    validarId("id", "Id de tambo"),
    desactiveTamboController
);

tamboRoute.delete(
    "/:id",
    authMiddleware(["admin"]),
    validarId("id", "Id de tambo"),
    deleteTamboController
);

export default tamboRoute;
