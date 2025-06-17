import ApiResponse from "../helpers/api.response.helpers.js";
import AppError from "../helpers/errors.helpers.js";
import Validations from "../helpers/validation.helpers.js";
import TamboRepository from "../repositories/tambo.repository.js";

export const createTamboController = async (req, res, next) => {
    try {
        const { nombre, ubicacion, descripcion } = req.body;

        if (!nombre) {
            return next(new AppError("El nombre es obligatorio", 400));
        }

        const validacion = new Validations({ nombre, ubicacion, descripcion });

        validacion
            .isString("nombre")
            .min_max_length("nombre", 1, 20)
            .isString("ubicacion")
            .min_max_length("ubicacion", 1, 100)
            .isString("descripcion")
            .min_max_length("descripcion", 1, 100);

        const errores = validacion.obtenerErrores();

        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        const new_tambo = { nombre: nombre };

        if (ubicacion) {
            new_tambo.ubicacion = ubicacion;
        }
        if (descripcion) {
            new_tambo.descripcion = descripcion;
        }

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
        if (!id) {
            return next(new AppError("Falta Id", 404));
        }

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
        if (!id) {
            return next(new AppError("Falta Id", 404));
        }

        const validacion = new Validations({ nombre, ubicacion, descripcion });

        validacion
            .isString("nombre")
            .min_max_length("nombre", 1, 20)
            .isString("ubicacion")
            .min_max_length("ubicacion", 1, 100)
            .isString("descripcion")
            .min_max_length("descripcion", 1, 100);

        const errores = validacion.obtenerErrores();

        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        const new_data = {};

        if (nombre) {
            new_data.nombre = nombre;
        }
        if (ubicacion) {
            new_data.ubicacion = ubicacion;
        }
        if (descripcion) {
            new_data.descripcion = descripcion;
        }

        const updateTambo = await TamboRepository.update(id, new_data);
        return res
            .status(200)
            .json(new ApiResponse(200, "Succes", updateTambo));
    } catch (error) {
        if (error.code === 11000) {
            return next(
                new AppError("El user name ya esta en uso o el email", 500)
            );
        }
        next(error);
    }
};

export const activeTamboController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new AppError("Falta Id", 404));
        }

        await TamboRepository.activar(id);
        return res.status(200).json(new ApiResponse(200, "Succes"));
    } catch (error) {
        next(error);
    }
};

export const desactiveTamboController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new AppError("Falta Id", 404));
        }

        await TamboRepository.desactivar(id);
        return res.status(200).json(new ApiResponse(200, "Succes"));
    } catch (error) {
        next(error);
    }
};

export const deleteTamboController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new AppError("Falta id", 404));
        }

        await TamboRepository.delete(id);
        return res.status(200).json(new ApiResponse(200, "Succes"));
    } catch (error) {
        next(error);
    }
};
