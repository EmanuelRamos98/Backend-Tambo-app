import express from "express";
import {
    activeTamboController,
    createTamboController,
    deleteTamboController,
    desactiveTamboController,
    getTamboByIdController,
    getTambosController,
    updateTamboController,
} from "../controllers/tambo.controller.js";
import authMiddleware from "../middlewares/auth.meddleware.js";

const tamboRoute = express.Router();

tamboRoute.get("/", authMiddleware(), getTambosController);

tamboRoute.post("/", authMiddleware(["admin"]), createTamboController);

tamboRoute.get("/:id", authMiddleware(), getTamboByIdController);

tamboRoute.put("/:id", authMiddleware(["admin"]), updateTamboController);

tamboRoute.put("/:id/active", authMiddleware(["admin"]), activeTamboController);
tamboRoute.put(
    "/:id/desactive",
    authMiddleware(["admin"]),
    desactiveTamboController
);

tamboRoute.delete("/:id", authMiddleware(["admin"]), deleteTamboController);

export default tamboRoute;
