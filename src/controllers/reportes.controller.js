import mongoose from "mongoose";
import RodeoRepository from "../repositories/rodeo.repository.js";
import ConsumoRepository from "../repositories/consumo.repository.js";
import ApiResponse from "../helpers/api.response.helpers.js";
import AppError from "../helpers/errors.helpers.js";
import consumoModel from "../models/consumo.model.js";
import ReporteRepository from "../repositories/reporte.repository.js";
import { validarFechas } from "../helpers/funciones.helpers.js";

export const reportePorTambo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { desde, hasta } = req.query;

        const errorFecha = validarFechas({ desde, hasta });
        if (errorFecha) {
            return next(new AppError(errorFecha, 400));
        }

        const consumos = await ReporteRepository.getConsumosPorTambo(id, {
            desde,
            hasta,
        });

        if (consumos.length === 0) {
            return next(
                new AppError("No se encontraron consumos en este tambo", 404)
            );
        }

        return res.status(200).json(new ApiResponse(200, "Succes", consumos));
    } catch (error) {
        next(error);
    }
};

export const reportePorRodeo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { desde, hasta } = req.query;

        const errorFecha = validarFechas({ desde, hasta });
        if (errorFecha) {
            return next(new AppError(errorFecha, 400));
        }

        const consumos = await ReporteRepository.getConsumosPorRodeo(id, {
            desde,
            hasta,
        });

        if (consumos.length === 0) {
            return next(
                new AppError("No se encontraron consumos en este rodeo", 404)
            );
        }

        return res.status(200).json(new ApiResponse(200, "Succes", consumos));
    } catch (error) {
        next(error);
    }
};

export const reportePorVaca = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { desde, hasta } = req.query;

        const errorFecha = validarFechas({ desde, hasta });
        if (errorFecha) {
            return next(new AppError(errorFecha, 400));
        }

        const consumos = await ReporteRepository.getConsumosPorVaca(id, {
            desde,
            hasta,
        });

        if (consumos.length === 0) {
            return next(
                new AppError("No se encontraron consumos en esta vaca", 404)
            );
        }

        return res.status(200).json(new ApiResponse(200, "Succes", consumos));
    } catch (error) {
        next(error);
    }
};
