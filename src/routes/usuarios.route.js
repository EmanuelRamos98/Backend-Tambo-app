import express from "express";
import {
    loginController,
    registerController,
} from "../controllers/usuarios.controller.js";

const usuarioRoute = express.Router();

//Manejo usuarios internos creados por el user-admin
usuarioRoute.get("/", () => {});
usuarioRoute.post("/", () => {});
usuarioRoute.get("/:id", () => {});
usuarioRoute.put("/:id", () => {});
usuarioRoute.delete("/:id", () => {});

//Manejo y creacion de user-admin
usuarioRoute.post("/register", registerController);
usuarioRoute.post("/login", loginController);
usuarioRoute.get("/verify-email/:token_validation", () => {});
usuarioRoute.put("/password/:token_recuperation", () => {});
usuarioRoute.post("/forgot-password", () => {});

export default usuarioRoute;
