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
            .min_max_length("name", 0, 20)
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
