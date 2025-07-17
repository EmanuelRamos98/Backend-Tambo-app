import ApiResponse from "../helpers/api.response.helpers.js";
import AppError from "../helpers/errors.helpers.js";
import {
    funcionCrearObj,
    validarId,
    validarInput,
} from "../helpers/funciones.helpers.js";
import TamboRepository from "../repositories/tambo.repository.js";

export const createTamboController = async (req, res, next) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return next(new AppError("El nombre es obligatorio", 400));
        }

        const errores = validarInput(req.body, {
            nombre: { type: "string", min: 1, max: 20 },
            ubicacion: { type: "string", min: 1, max: 100 },
            descripcion: { type: "string", min: 1, max: 100 },
        });

        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        const new_tambo = funcionCrearObj(
            ["nombre", "ubicacion", "descripcion"],
            req.body
        );
        const nuevoTambo = await TamboRepository.create(new_tambo);

        return res
            .status(200)
            .json(new ApiResponse(200, "Creado con exito", nuevoTambo));
    } catch (error) {
        if (error.code === 11000) {
            return next(
                new AppError("El nombre para el tambo ya esta en uso", 500)
            );
        }
        next(error);
    }
};

export const getTambosController = async (req, res, next) => {
    try {
        const tambos = await TamboRepository.getAll();
        if (!tambos) {
            return next(new AppError("No se encontraron tambos", 404));
        }

        return res
            .status(200)
            .json(new ApiResponse(200, "Lista de tambos", tambos));
    } catch (error) {
        next(error);
    }
};

export const getTamboByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const tambo = await TamboRepository.getById(id);
        if (!tambo) {
            return next(new AppError("No se encontro el tambo", 404));
        }

        return res.status(200).json(new ApiResponse(200, "Sucess", tambo));
    } catch (error) {
        next(error);
    }
};

export const updateTamboController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const tambo = await TamboRepository.getById(id);
        if (!tambo) {
            return next(new AppError("No existe este tambo", 404));
        }

        const errores = validarInput(req.body, {
            nombre: { type: "string", min: 1, max: 20 },
            ubicacion: { type: "string", min: 1, max: 100 },
            descripcion: { type: "string", min: 1, max: 100 },
        });

        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        const new_data = funcionCrearObj(
            ["nombre", "ubicacion", "descripcion"],
            req.body
        );
        const updateTambo = await TamboRepository.update(id, new_data);

        return res
            .status(200)
            .json(new ApiResponse(200, "Succes", updateTambo));
    } catch (error) {
        if (error.code === 11000) {
            return next(new AppError("El name ya esta en uso", 500));
        }
        next(error);
    }
};

export const activeTamboController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const tamboActive = await TamboRepository.activar(id);
        return res
            .status(200)
            .json(new ApiResponse(200, "Active", tamboActive));
    } catch (error) {
        next(error);
    }
};

export const desactiveTamboController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const tamboDesactive = await TamboRepository.desactivar(id);
        return res
            .status(200)
            .json(new ApiResponse(200, "Desactive", tamboDesactive));
    } catch (error) {
        next(error);
    }
};

export const deleteTamboController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const tamboDelete = await TamboRepository.delete(id);
        return res
            .status(200)
            .json(new ApiResponse(200, "Delete", tamboDelete));
    } catch (error) {
        next(error);
    }
};
