import express from "express";

const reporteRoute = express.Router();

reporteRoute.get("/tambo/:id", () => {});
reporteRoute.get("/rodeo/:id", () => {});
reporteRoute.get("/vaca/:id", () => {});

export default reporteRoute;
