import express from "express";

const usuarioRoute = express.Router();

usuarioRoute.get("/", () => {});
usuarioRoute.post("/", () => {});
usuarioRoute.get("/:id", () => {});
usuarioRoute.put("/:id", () => {});
usuarioRoute.delete("/:id", () => {});

export default usuarioRoute;
