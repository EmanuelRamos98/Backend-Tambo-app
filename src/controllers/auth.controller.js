import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiResponse from "../helpers/api.response.helpers.js";
import AppError from "../helpers/errors.helpers.js";
import ENVIROMENT from "../config/enviroment.config.js";
import UsuarioRepository from "../repositories/usuario.repository.js";

export const loginController = async (req, res, next) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return next(
                new AppError("Todos los campos deben estar completos", 400)
            );
        }

        const user = await UsuarioRepository.getByName(name);
        if (!user) {
            return next(new AppError("Usuario no existente", 401));
        }

        const passwordMach = await bcrypt.compare(password, user.password);
        if (!passwordMach) {
            return next(new AppError("Contraseña incorrecta", 401));
        }

        const TOKEN = jwt.sign(
            {
                id: user._id,
                name: user.name,
                activo: user.activo,
                rol: user.rol,
            },
            ENVIROMENT.SECRET_KEY,
            { expiresIn: "1d" }
        );

        return res.status(200).json(
            new ApiResponse(200, "Login sussces", {
                name: user.name,
                acces_token: TOKEN,
            })
        );
    } catch (error) {
        next(error);
    }
};

export const usuarioProfileController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const usuario = await UsuarioRepository.getById(id);
        if (!usuario) {
            return next(new AppError("Usuario no existente", 404));
        }

        return res.status(200).json(new ApiResponse(200, "Sucess", usuario));
    } catch (error) {
        next(error);
    }
};
