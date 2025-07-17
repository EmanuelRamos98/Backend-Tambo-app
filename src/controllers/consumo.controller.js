import mongoose from "mongoose";
import AppError from "../helpers/errors.helpers.js";
import Validations from "../helpers/validation.helpers.js";
import ConsumoRepository from "../repositories/consumo.repository.js";
import ApiResponse from "../helpers/api.response.helpers.js";
import InsumoRepository from "../repositories/insumo.repository.js";
import RodeoRepository from "../repositories/rodeo.repository.js";
import VacaRepository from "../repositories/vaca.repository.js";
import { funcionCrearObj, validarInput } from "../helpers/funciones.helpers.js";

export const createConsumoRodeo = async (req, res, next) => {
    try {
        const { rodeoId } = req.params;
        const { insumo, cantidad, observaciones } = req.body;
        if (!insumo || !cantidad) {
            return next(
                new AppError("Insumo y cantidad son obligatorios", 400)
            );
        }

        if (!mongoose.Types.ObjectId.isValid(insumo)) {
            return next(new AppError("ID no valido"));
        }

        const insumoExiste = await InsumoRepository.getById(insumo);
        if (!insumoExiste) {
            return next(new AppError("No existe este insumo", 404));
        }

        const rodeoExiste = await RodeoRepository.getById(rodeoId);
        if (!rodeoExiste) {
            return next(new AppError("No existe este redeo", 404));
        }

        const errores = validarInput(req.body, {
            cantidad: { type: "number" },
            observaciones: { type: "string", min: 1, max: 100 },
        });

        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        if (insumoExiste.stock < cantidad) {
            return next(
                new AppError(
                    `Stock insuficiente. Disponible: ${insumoExiste.stock}`,
                    400
                )
            );
        }

        insumoExiste.stock -= cantidad;
        await insumoExiste.save();

        const new_data = funcionCrearObj(
            ["insumo", "cantidad", "observaciones"],
            req.body,
            { rodeo: rodeoId }
        );
        const newConsumo = await ConsumoRepository.create(new_data);

        return res.status(201).json(new ApiResponse(201, "Succes", newConsumo));
    } catch (error) {
        next(error);
    }
};

export const getConsumoRodeo = async (req, res, next) => {
    try {
        const { rodeoId } = req.params;

        const rodeoExiste = await RodeoRepository.getById(rodeoId);
        if (!rodeoExiste) {
            return next(new AppError("No existe este redeo", 404));
        }

        const consumos = await ConsumoRepository.getByRodeo(rodeoId);
        if (!consumos || consumos.length === 0) {
            return next(new AppError("No hay consumos en este rodeo", 404));
        }

        return res.status(200).json(new ApiResponse(200, "Succes", consumos));
    } catch (error) {
        next(error);
    }
};

export const createConsumoVaca = async (req, res, next) => {
    try {
        const { vacaId } = req.params;
        const { insumo, cantidad, observaciones } = req.body;
        if (!insumo || !cantidad) {
            return next(
                new AppError("Insumo y cantidad son obligatorios", 400)
            );
        }

        if (!mongoose.Types.ObjectId.isValid(insumo)) {
            return next(new AppError("ID no valido"));
        }

        const insumoExiste = await InsumoRepository.getById(insumo);
        if (!insumoExiste) {
            return next(new AppError("No existe este insumo", 404));
        }

        const vacaExiste = await VacaRepository.getById(vacaId);
        if (!vacaExiste) {
            return next(new AppError("No existe esta vaca", 404));
        }

        const errores = validarInput(req.body, {
            cantidad: { type: "number" },
            observaciones: { type: "string", min: 1, max: 100 },
        });

        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        if (insumoExiste.stock < cantidad) {
            return next(
                new AppError(
                    `Stock insuficiente. Disponible: ${insumoExiste.stock}`,
                    400
                )
            );
        }

        insumoExiste.stock -= cantidad;
        await insumoExiste.save();

        const new_data = funcionCrearObj(
            ["insumo", "cantidad", "observaciones"],
            req.body,
            { vaca: vacaId }
        );

        const newConsumo = await ConsumoRepository.create(new_data);

        return res.status(201).json(new ApiResponse(201, "Succes", newConsumo));
    } catch (error) {
        next(error);
    }
};

export const getConsumoVaca = async (req, res, next) => {
    try {
        const { vacaId } = req.params;

        const vacaExiste = await VacaRepository.getById(vacaId);
        if (!vacaExiste) {
            return next(new AppError("No existe esta vaca", 404));
        }

        const consumos = await ConsumoRepository.getByVaca(vacaId);
        if (!consumos || consumos.length === 0) {
            return next(new AppError("No hay consumos en esta vaca", 404));
        }

        return res.status(200).json(new ApiResponse(200, "Succes", consumos));
    } catch (error) {
        next(error);
    }
};

export const updateConsumoController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const new_data = {};
        const consumoExistente = await ConsumoRepository.getById(id);
        if (!consumoExistente) {
            return next(new AppError("Consumo no encontrado", 404));
        }

        const insumo = await InsumoRepository.getById(consumoExistente.insumo);
        if (!insumo) {
            return next(new AppError("Insumo no encontrado", 404));
        }

        const errores = validarInput(req.body, {
            cantidad: { type: "number" },
            observaciones: { type: "string", min: 1, max: 100 },
        });

        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        if (cantidad) {
            const diferencia = cantidad - consumoExistente.cantidad;

            if (insumo.stock - diferencia < 0) {
                return next(
                    new AppError(
                        `Stock insuficiente. Solo hay ${insumo.stock} disponibles.`,
                        400
                    )
                );
            }

            insumo.stock -= diferencia;
            await insumo.save();
            new_data.cantidad = cantidad;
        }

        if (observaciones) {
            new_data.observaciones = observaciones;
        }

        const consumoActualizado = await ConsumoRepository.update(id, new_data);

        return res
            .status(200)
            .json(new ApiResponse(200, "Succes", consumoActualizado));
    } catch (error) {
        next(error);
    }
};

export const deleteConsumoController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const eliminado = await ConsumoRepository.delete(id);
        return res.status(200).json(new ApiResponse(200, "Succes", eliminado));
    } catch (error) {
        next(error);
    }
};
