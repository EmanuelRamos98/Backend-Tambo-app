import express from "express";

const vacaRoute = express.Router();

vacaRoute.get("/rodeo/:rodeoId", () => {});
vacaRoute.post("/rodeo/:rodeoId", () => {});

vacaRoute.get("/:id", () => {});
vacaRoute.post("/:id", () => {});
vacaRoute.delete("/:id", () => {});

vacaRoute.post("/:id/mover", () => {});

export default vacaRoute;
