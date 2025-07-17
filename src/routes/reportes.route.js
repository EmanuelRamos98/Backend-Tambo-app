import express from "express";
import {
    reportePorRodeo,
    reportePorTambo,
    reportePorVaca,
} from "../controllers/reportes.controller.js";

const reporteRoute = express.Router();

reporteRoute.get("/tambo/:id", reportePorTambo);
reporteRoute.get("/rodeo/:id", reportePorRodeo);
reporteRoute.get("/vaca/:id", reportePorVaca);

export default reporteRoute;
