class Validations {
    constructor(valor) {
        this.valor = valor;
        this.error = [];
    }

    isString(field_name) {
        const valor = this.valor[field_name];
        if (valor === undefined) return this;

        if (typeof valor !== "string") {
            this.error.push({
                field: field_name,
                message: `El valor de ${field_name} debe ser un STRING`,
            });
        }
        return this;
    }

    isEmail(field_name) {
        const valor = this.valor[field_name];
        if (valor === undefined) return this;

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(valor)) {
            this.error.push({
                field: field_name,
                message: `El formato del correo electronico no es valido`,
            });
        }
        return this;
    }

    min_max_length(field_name, min_length, max_length) {
        const valor = this.valor[field_name];
        if (valor === undefined) return this;

        if (valor.length < min_length) {
            this.error.push({
                field: field_name,
                message: `El valor de ${field_name} debe tener un minimo de ${min_length} `,
            });
        }
        if (valor.length > max_length) {
            this.error.push({
                field: field_name,
                message: `El valor de ${field_name} debe tener un maximo de ${max_length}`,
            });
        }
        return this;
    }

    obtenerErrores() {
        return this.error;
    }
}

export default Validations;
