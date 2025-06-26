import mongoose from "mongoose";
import ApiResponse from "../helpers/api.response.helpers.js";
import AppError from "../helpers/errors.helpers.js";
import Validations from "../helpers/validation.helpers.js";
import InsumoRepository from "../repositories/insumo.repository.js";

export const createInsumoController = async (req, res, next) => {
    try {
        const { nombre, tipo, unidad, stock, costoUnitario } = req.body;
        if (!nombre || !tipo || !unidad || !stock || !costoUnitario) {
            return next(
                new AppError("Todos los campos deben estar llenos", 400)
            );
        }

        const validaciones = new Validations({
            nombre,
            tipo,
            unidad,
            stock,
            costoUnitario,
        });

        validaciones
            .isString("nombre")
            .min_max_length("nombre", 1, 50)
            .isString("tipo")
            .min_max_length("tipo", 1, 20)
            .isString("unidad")
            .min_max_length("unidad", 1, 10)
            .isNumber("stock")
            .isNumber("constoUnitario");

        const errores = validaciones.obtenerErrores();
        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        const new_data = {
            nombre,
            tipo,
            unidad,
            stock,
            costoUnitario,
        };

        const insumo = await InsumoRepository.create(new_data);
        return res.status(200).json(new ApiResponse(200, "Succes", insumo));
    } catch (error) {
        next(error);
    }
};

export const getInsumosController = async (req, res, next) => {
    try {
        const insumos = await InsumoRepository.getAll();
        if (!insumos) {
            return next(new AppError("No se encontraron insumos", 404));
        }

        return res.status(200).json(new ApiResponse(200, "Succes", insumos));
    } catch (error) {
        next(error);
    }
};

export const getInsumoByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError("Invalid Id", 400));
        }
        const insumo = await InsumoRepository.getById(id);

        if (!insumo) {
            return next(new AppError("No existes el isnumo buscado", 404));
        }

        return res.status(200).json(new ApiResponse(200, "Succes", insumo));
    } catch (error) {
        next(error);
    }
};

export const updateInsumoController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError("Invalid Id", 400));
        }

        const { nombre, tipo, unidad, stock, costoUnitario } = req.body;
        const validacion = new Validations({
            nombre,
            tipo,
            unidad,
            stock,
            costoUnitario,
        });

        validacion
            .isString("nombre")
            .min_max_length("nombre", 1, 50)
            .isString("tipo")
            .min_max_length("tipo", 1, 20)
            .isString("unidad")
            .min_max_length("unidad", 1, 10)
            .isNumber("stock")
            .isNumber("constoUnitario");

        const errores = validacion.obtenerErrores();
        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        const new_data = {};
        if (nombre) new_data.nombre = nombre;
        if (tipo) new_data.tipo = tipo;
        if (unidad) new_data.unidad = unidad;
        if (stock) new_data.stock = stock;
        if (costoUnitario) new_data.costoUnitario = costoUnitario;

        const update = await InsumoRepository.update(id, new_data);

        return res.status(200).json(new ApiResponse(200, "Succes", update));
    } catch (error) {
        next(error);
    }
};

export const deleteInsumoController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError("Invalid Id", 400));
        }

        const eliminado = await InsumoRepository.delete(id);

        return res.status(200).json(new ApiResponse(200, "Succes", eliminado));
    } catch (error) {
        next(error);
    }
};
