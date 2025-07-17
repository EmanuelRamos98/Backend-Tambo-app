import Validations from "./validation.helpers.js";

//Funcion que crea el objeto new_data
export const funcionCrearObj = (campos, body, adicionales = {}) => {
    const data = {};
    campos.forEach((campo) => {
        if (body[campo] !== undefined) {
            data[campo] = body[campo];
        }
    });
    return { ...data, ...adicionales };
};

//Funcion para validar los inputs mediante la clase VALIDATIONS
export const validarInput = (data, schema) => {
    const validacion = new Validations(data);

    for (const field in schema) {
        const reglas = schema[field];

        if (reglas.type === "string") {
            validacion.isString(field);
            if (reglas.min || reglas.max) {
                validacion.min_max_length(
                    field,
                    reglas.min || 0,
                    reglas.max || Infinity
                );
            }
        }

        if (reglas.type === "number") {
            validacion.isNumber(field);
        }

        if (reglas.type === "email") {
            validacion.isEmail(field);
        }
    }

    return validacion.obtenerErrores();
};

//Funcion para validar fechas
export const validarFechas = (fechas) => {
    for (const [campo, valor] of Object.entries(fechas)) {
        if (valor && isNaN(Date.parse(valor))) {
            return `'${campo}' no es una fecha valida`;
        }
    }
    return null;
};
