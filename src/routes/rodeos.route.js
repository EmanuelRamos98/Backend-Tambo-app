import express from "express";
import authMiddleware from "../middlewares/auth.meddleware.js";
import {
    createRodeoController,
    deleteRodeoController,
    getRodeoByIdController,
    getRodeosController,
    updateRodeoController,
} from "../controllers/rodeo.controller.js";

const rodeosRoute = express.Router();

rodeosRoute.get("/tambo/:tamboId", authMiddleware(), getRodeosController);

rodeosRoute.post("/tambo/:tamboId", authMiddleware(), createRodeoController);

rodeosRoute.get("/:id", authMiddleware(), getRodeoByIdController);

rodeosRoute.put("/:id", authMiddleware(), updateRodeoController);

rodeosRoute.delete("/:id", authMiddleware(), deleteRodeoController);

export default rodeosRoute;
