import mongoose from "mongoose";
import AppError from "../helpers/errors.helpers.js";
import VacaRepository from "../repositories/vaca.repository.js";
import Validations from "../helpers/validation.helpers.js";
import ApiResponse from "../helpers/api.response.helpers.js";
import RodeoRepository from "../repositories/rodeo.repository.js";
import { funcionCrearObj, validarInput } from "../helpers/funciones.helpers.js";

export const createVacaController = async (req, res, next) => {
    try {
        const { rodeoId } = req.params;
        const vacas = Array.isArray(req.body) ? req.body : [req.body];
        const vacasValidas = [];
        const erroresGenerales = [];

        let index = 1;

        for (const vaca of vacas) {
            const { caravana, fechaNacimiento, raza } = vaca;

            if (!caravana || !fechaNacimiento || !raza) {
                erroresGenerales.push(`Faltan campos en vaca ${index}`);
                index++;
                continue;
            }

            const errores = validarInput(req.body, {
                caravana: { type: "string", min: 1, max: 9 },
                raza: { type: "string", min: 1, max: 50 },
            });

            if (errores.length > 0) {
                const mensajes = errores.map((err) => err.message).join(", ");
                erroresGenerales.push(`Errores en vaca ${index}: ${mensajes}`);
                index++;
                continue;
            }

            const fecha = new Date(fechaNacimiento);
            if (isNaN(fecha.getTime())) {
                erroresGenerales.push(`Fecha inválida en vaca ${index}`);
                index++;
                continue;
            }

            if (fecha > new Date()) {
                erroresGenerales.push(
                    `La fecha de nacimiento no puede ser futura en vaca ${index}`
                );
                index++;
                continue;
            }

            vacasValidas.push({
                caravana,
                fechaNacimiento: fecha.toISOString(),
                raza,
                rodeo: rodeoId,
            });

            index++;
        }
        if (erroresGenerales.length > 0) {
            return next(new AppError(erroresGenerales.join(" | "), 400));
        }

        const vacasGuardadas = await VacaRepository.create(vacasValidas);
        return res
            .status(201)
            .json(
                new ApiResponse(201, "vacas creadas con exito", vacasGuardadas)
            );
    } catch (error) {
        next(error);
    }
};

export const getVacasController = async (req, res, next) => {
    try {
        const { rodeoId } = req.params;

        const vacas = await VacaRepository.getByRodeo(rodeoId);
        if (!vacas) {
            return next(
                new AppError("No se encontraron vacas para este rodeo", 404)
            );
        }

        return res.status(200).json(new ApiResponse(200, "Succes", vacas));
    } catch (error) {
        next(error);
    }
};
export const getVacaByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const vaca = await VacaRepository.getById(id);
        if (!vaca) {
            return next(new AppError("No se encontro la vaca", 404));
        }

        return res.status(200).json(new ApiResponse(200, "Succes", vaca));
    } catch (error) {
        next(error);
    }
};
export const updateVacaController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { fechaNacimiento } = req.body;

        const errores = validarInput(req.body, {
            caravana: { type: "string", min: 1, max: 9 },
            raza: { type: "string", min: 1, max: 50 },
            estado: { type: "string", min: 1, max: 15 },
        });

        if (errores.length > 0) {
            return next(new AppError("Errores de validacion", 400, errores));
        }

        if (fechaNacimiento) {
            const fecha = new Date(fechaNacimiento);
            if (isNaN(fecha.getTime())) {
                return next(new AppError("Error formato fecha", 400));
            }

            if (fecha > new Date()) {
                return next(new AppError("La fecha no puede ser futura", 400));
            }
        }

        const new_data = funcionCrearObj(
            ["caravana", "fechaNacimiento", "raza", "estado"],
            req.body
        );

        const updateVaca = await VacaRepository.update(id, new_data);
        return res.status(200).json(new ApiResponse(200, "Succes", updateVaca));
    } catch (error) {
        next(error);
    }
};

export const seguimientoController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const vaca = await VacaRepository.getById(id);
        if (!vaca) {
            return next(new AppError("La vaca no existe", 400));
        }

        vaca.seguimientoActivo = !vaca.seguimientoActivo;
        await vaca.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    `Estado de seguimiento actualizado a ${vaca.seguimiento}`,
                    vaca
                )
            );
    } catch (error) {
        next(error);
    }
};

export const deleteVacaController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await VacaRepository.delete(id);
        return res.status(200).json(new ApiResponse(200, "Succes"));
    } catch (error) {
        next(error);
    }
};

export const moverVacaController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rodeoId } = req.body;
        if (!rodeoId || !mongoose.Types.ObjectId.isValid(rodeoId)) {
            return next(new AppError("Invalid Id", 400));
        }

        const rodeo = await RodeoRepository.getById(rodeoId);
        if (!rodeo) {
            return next(new AppError("No se encontro el rodeo", 404));
        }

        await VacaRepository.moverRodeo(id, rodeoId);
        return res.status(200).json(new ApiResponse(200, "Succes"));
    } catch (error) {
        next(error);
    }
};
