import AppError from "../helpers/errors.helpers.js";
import ApiResponse from "../helpers/api.response.helpers.js";
import ENVIROMENT from "../config/enviroment.config.js";
import jwt from "jsonwebtoken";

const authMiddleware = (rolesPermitidos) => {
    return (req, res, next) => {
        try {
            const auth_header = req.headers["authorization"];
            if (!auth_header) {
                return next(new AppError("Falta token de autorizacion", 401));
            }

            const token = auth_header.split(" ")[1];
            if (!token) {
                return next(
                    new AppError(
                        "El token de autorizacion no tiene el formato correcto"
                    )
                );
            }

            const decoded = jwt.verify(token, ENVIROMENT.SECRET_KEY);
            req.user = decoded;

            if (Array.isArray(rolesPermitidos) && rolesPermitidos.length > 0) {
                if (!rolesPermitidos.includes(decoded.rol)) {
                    return next(
                        new AppError("Acceso denegado: rol isuficiente", 403)
                    );
                }
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default authMiddleware;
