import mongoose from "mongoose";
import ApiResponse from "../helpers/api.response.helpers.js";
import AppError from "../helpers/errors.helpers.js";
import Validations from "../helpers/validation.helpers.js";
import InsumoRepository from "../repositories/insumo.repository.js";
import { funcionCrearObj, validarInput } from "../helpers/funciones.helpers.js";

export const createInsumoController = async (req, res, next) => {
    try {
        const { nombre, tipo, unidad, stock, costoUnitario } = req.body;
        if (!nombre || !tipo || !unidad || !stock || !costoUnitario) {
            return next(
                new AppError("Todos los campos deben estar llenos", 400)
            );
        }

        const errores = validarInput(req.body, {
            nombre: { type: "string", min: 1, max: 50 },
            tipo: { type: "string", min: 1, max: 20 },
            unidad: { type: "string", min: 1, max: 10 },
            stock: { type: "number" },
            costoUnitario: { type: "number" },
        });

        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        const new_data = funcionCrearObj(
            ["nombre", "tipo", "unidad", "stock", "costoUnitario"],
            req.body
        );

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

        const errores = validarInput(req.body, {
            nombre: { type: "string", min: 1, max: 50 },
            tipo: { type: "string", min: 1, max: 20 },
            unidad: { type: "string", min: 1, max: 10 },
            stock: { type: "number" },
            costoUnitario: { type: "number" },
        });

        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        const new_data = funcionCrearObj(
            ["nombre", "tipo", "unidad", "stock", "costoUnitario"],
            req.body
        );
        const update = await InsumoRepository.update(id, new_data);

        return res.status(200).json(new ApiResponse(200, "Succes", update));
    } catch (error) {
        next(error);
    }
};

export const deleteInsumoController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const eliminado = await InsumoRepository.delete(id);

        return res.status(200).json(new ApiResponse(200, "Succes", eliminado));
    } catch (error) {
        next(error);
    }
};
