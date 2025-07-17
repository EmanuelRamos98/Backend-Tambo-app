import express from "express";
import authMiddleware from "../middlewares/auth.meddleware.js";
import validarId from "../middlewares/validarId.middleware.js";
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
usuarioRoute.get(
    "/:id",
    authMiddleware(["admin"]),
    validarId("id", "Id de usuario"),
    getUsuarioByIdController
);

//actualizar user
usuarioRoute.put(
    "/:id",
    authMiddleware(["admin"]),
    validarId("id", "Id de usuario"),
    updateUsuarioController
);

//activar o desactivar
usuarioRoute.put(
    "/:id/activar",
    authMiddleware(["admin"]),
    validarId("id", "Id de usuario"),
    activeUsuarioController
);
usuarioRoute.put(
    "/:id/desactivar",
    authMiddleware(["admin"]),
    validarId("id", "Id de usuario"),
    desactiveUsuarioController
);
//eliminar
usuarioRoute.delete(
    "/:id",
    authMiddleware(["admin"]),
    validarId("id", "Id de usuario"),
    deleteUsuarioController
);

export default usuarioRoute;
