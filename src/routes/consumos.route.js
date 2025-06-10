import express from "express";

const consumosRoute = express.Router();

consumosRoute.get("/rodeo/:rodeoId", () => {});
consumosRoute.post("/rodeo/:rodeoId", () => {});

consumosRoute.get("/vaca/:vacaId", () => {});
consumosRoute.post("/vaca/:vacaId", () => {});

export default consumosRoute;
