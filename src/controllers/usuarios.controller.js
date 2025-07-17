import bcrypt from "bcrypt";
import ApiResponse from "../helpers/api.response.helpers.js";
import AppError from "../helpers/errors.helpers.js";
import UsuarioRepository from "../repositories/usuario.repository.js";
import { funcionCrearObj, validarInput } from "../helpers/funciones.helpers.js";

export const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(
                new AppError("Todos los campos deben estar completos", 400)
            );
        }

        const errores = validarInput(req.body, {
            name: { type: "string", min: 1, max: 20 },
            email: { type: "email" },
            password: { type: "string", min: 8, max: 20 },
        });

        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const new_user = {
            name: name,
            password: passwordHash,
            email: email,
        };

        const user = await UsuarioRepository.create(new_user);

        return res
            .status(201)
            .json(new ApiResponse(201, "Registro exitoso", user));
    } catch (error) {
        next(error);
    }
};

export const getUsuariosController = async (req, res, next) => {
    try {
        const usuarios = await UsuarioRepository.getAll();
        if (!usuarios) {
            return next(new AppError("No se encontraron usuarios", 404));
        }
        return res
            .status(200)
            .json(new ApiResponse(200, "Lista de usuarios", usuarios));
    } catch (error) {
        next(error);
    }
};

export const getUsuarioByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await UsuarioRepository.getById(id);
        if (!user) {
            return next(new AppError("El usuario no existe", 404));
        }

        return res.status(200).json(new ApiResponse(200, "Usuario", user));
    } catch (error) {
        next(error);
    }
};

export const updateUsuarioController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const errores = validarInput(req.body, {
            name: { type: "string", min: 1, max: 20 },
            email: { type: "email" },
            rol: { type: "string", min: 1, max: 15 },
            password: { type: "string", min: 8, max: 20 },
        });

        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        const new_data = funcionCrearObj(
            ["name", "email", "password", "rol"],
            req.body
        );

        if (new_data.password) {
            new_data.password = await bcrypt.hash(new_data.password, 10);
        }

        const updateUsuer = await UsuarioRepository.update(id, new_data);
        return res
            .status(200)
            .json(new ApiResponse(200, "Succes", updateUsuer));
    } catch (error) {
        if (error.code === 11000) {
            return next(
                new AppError("El user name ya esta en uso o el email", 500)
            );
        }
        next(error);
    }
};

export const activeUsuarioController = async (req, res, next) => {
    try {
        const { id } = req.params;

        await UsuarioRepository.activar(id);
        return res.status(200).json(new ApiResponse(200, "Succes"));
    } catch (error) {
        next(error);
    }
};

export const desactiveUsuarioController = async (req, res, next) => {
    try {
        const { id } = req.params;

        await UsuarioRepository.desactivar(id);
        return res.status(200).json(new ApiResponse(200, "Succes"));
    } catch (error) {
        next(error);
    }
};

export const deleteUsuarioController = async (req, res, next) => {
    try {
        const { id } = req.params;

        await UsuarioRepository.delete(id);
        return res.status(200).json(new ApiResponse(200, "Succes"));
    } catch (error) {
        next(error);
    }
};
