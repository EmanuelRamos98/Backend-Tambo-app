import mongoose from "mongoose";
import ApiResponse from "../helpers/api.response.helpers.js";
import AppError from "../helpers/errors.helpers.js";
import Validations from "../helpers/validation.helpers.js";
import RodeoRepository from "../repositories/rodeo.repository.js";
import TamboRepository from "../repositories/tambo.repository.js";

export const createRodeoController = async (req, res, next) => {
    try {
        const { nombre, tipo } = req.body;
        const { tamboId } = req.params;
        if (!tamboId || !mongoose.Types.ObjectId.isValid(tamboId)) {
            return next(new AppError("Invalid Id", 400));
        }
        if (!nombre || !tipo) {
            return next(
                new AppError("Todos los campos deben estar llenos", 400)
            );
        }

        const validacion = new Validations({ nombre, tipo });

        validacion
            .isString("nombre")
            .min_max_length("nombre", 1, 20)
            .isString("tipo");

        const errores = validacion.obtenerErrores();
        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }
        const new_data = {
            nombre: nombre,
            tipo: tipo,
            tambo: tamboId,
        };
        const nuevoRodeo = await RodeoRepository.create(new_data);
        return res
            .status(200)
            .json(new ApiResponse(200, "Creado con exito", nuevoRodeo));
    } catch (error) {
        if (error.code === 11000) {
            return next(
                new AppError("El nombre para el rodeo ya esta en uso", 500)
            );
        }
        next(error);
    }
};

export const getRodeosController = async (req, res, next) => {
    try {
        const { tamboId } = req.params;
        if (!tamboId || !mongoose.Types.ObjectId.isValid(tamboId)) {
            return next(new AppError("Invalid Id", 400));
        }

        const existeTambo = await TamboRepository.getById(tamboId);
        if (!existeTambo) {
            return next(new AppError("El tambo no existe", 404));
        }

        const rodeos = await RodeoRepository.getByTambo(tamboId);
        if (rodeos.length === 0) {
            return next(
                new AppError("No se encontraron rodeos en este tambo", 404)
            );
        }

        return res.status(200).json(new ApiResponse(200, "Rodeos: ", rodeos));
    } catch (error) {
        next(error);
    }
};

export const getRodeoByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError("Invalid Id", 400));
        }

        const rodeo = await RodeoRepository.getById(id);
        if (!rodeo) {
            return next(new AppError("No existe el rodeo", 400));
        }

        return res.status(200).json(new ApiResponse(200, "Succes", rodeo));
    } catch (error) {
        next(error);
    }
};

export const updateRodeoController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError("Invalid Id", 400));
        }

        const { nombre, tipo } = req.body;

        const validacion = new Validations({ nombre, tipo });

        validacion
            .isString("nombre")
            .min_max_length("nombre", 1, 20)
            .isString("tipo");

        const errores = validacion.obtenerErrores();
        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }
        const new_data = {};

        if (nombre) {
            new_data.nombre = nombre;
        }

        if (tipo) {
            new_data.tipo = tipo;
        }

        const update = await RodeoRepository.update(id, new_data);

        return res.status(200).json(new ApiResponse(200, "Success", update));
    } catch (error) {
        next(error);
    }
};

export const deleteRodeoController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError("Invalid Id", 400));
        }

        await RodeoRepository.delete(id);
        return res
            .status(200)
            .json(new ApiResponse(200, "Eliminado con exito"));
    } catch (error) {
        next(error);
    }
};
