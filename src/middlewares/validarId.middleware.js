import mongoose from "mongoose";
import AppError from "../helpers/errors.helpers.js";

const validarId = (param = "id", nombreCampo = "ID") => {
    return (req, res, next) => {
        const valor = req.params[param];

        if (!valor) {
            return next(new AppError(`Falta ${nombreCampo}`, 400));
        }

        if (!mongoose.Types.ObjectId.isValid(valor)) {
            return next(new AppError(`${nombreCampo} no es valido`, 400));
        }

        next();
    };
};

export default validarId;
