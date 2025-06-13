import express from "express";
import authMiddleware from "../middlewares/auth.meddleware.js";
import {
    activeUsuarioController,
    deleteUsuarioController,
    desactiveUsuarioController,
    getUsuarioByIdController,
    getUsuariosController,
    registerController,
    updateUsuarioController,
} from "../controllers/usuarios.controller.js";

const usuarioRoute = express.Router();

//Manejo usuarios internos creados por el admin
//obtener users
usuarioRoute.get("/", authMiddleware(["admin"]), getUsuariosController);
//crear users
usuarioRoute.post("/crear", authMiddleware(["admin"]), registerController);
//obtener user por id
usuarioRoute.get("/:id", authMiddleware(["admin"]), getUsuarioByIdController);
//actualizar user
usuarioRoute.put("/:id", authMiddleware(["admin"]), updateUsuarioController);
//activar o desactivar
usuarioRoute.put(
    "/:id/activar",
    authMiddleware(["admin"]),
    activeUsuarioController
);
usuarioRoute.put(
    "/:id/desactivar",
    authMiddleware(["admin"]),
    desactiveUsuarioController
);
//eliminar
usuarioRoute.delete("/:id", authMiddleware(["admin"]), deleteUsuarioController);

export default usuarioRoute;
