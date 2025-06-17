import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiResponse from "../helpers/api.response.helpers.js";
import AppError from "../helpers/errors.helpers.js";
import Validations from "../helpers/validation.helpers.js";
import UsuarioRepository from "../repositories/usuario.repository.js";
import ENVIROMENT from "../config/enviroment.config.js";

export const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(
                new AppError("Todos los campos deben estar completos", 400)
            );
        }

        const validacion = new Validations({ name, email, password });

        validacion
            .isString("name")
            .min_max_length("name", 1, 20)
            .isEmail("email")
            .isString("password")
            .min_max_length("password", 8, 20);

        const errores = validacion.obtenerErrores();

        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const new_user = {
            name: name,
            password: passwordHash,
            email: email,
        };

        await UsuarioRepository.create(new_user);

        return res.status(201).json(new ApiResponse(201, "Registro exitoso"));
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
        if (!id) {
            return next(new AppError("Falta user Id", 400));
        }

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
        if (!id) {
            return next(new AppError("Falta user Id", 400));
        }

        const { name, password, email, rol } = req.body;
        const validacion = new Validations({ name, email, password, rol });

        validacion
            .isString("name")
            .min_max_length("name", 1, 20)
            .isEmail("email")
            .isString("password")
            .min_max_length("password", 8, 20);

        const errores = validacion.obtenerErrores();

        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        const new_data = {};

        if (name) {
            new_data.name = name;
        }
        if (password) {
            const new_password = await bcrypt.hash(password, 10);
            new_data.password = new_password;
        }
        if (email) {
            new_data.email = email;
        }
        if (rol) {
            new_data.rol = rol;
        }

        await UsuarioRepository.update(id, new_data);
        return res.status(200).json(new ApiResponse(200, "Succes"));
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
        if (!id) {
            return next(new AppError("Falta id", 404));
        }

        await UsuarioRepository.activar(id);
        return res.status(200).json(new ApiResponse(200, "Succes"));
    } catch (error) {
        next(error);
    }
};

export const desactiveUsuarioController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new AppError("Falta id", 404));
        }

        await UsuarioRepository.desactivar(id);
        return res.status(200).json(new ApiResponse(200, "Succes"));
    } catch (error) {
        next(error);
    }
};

export const deleteUsuarioController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new AppError("Falta id", 404));
        }

        await UsuarioRepository.delete(id);
        return res.status(200).json(new ApiResponse(200, "Succes"));
    } catch (error) {
        next(error);
    }
};
