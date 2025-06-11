import Usuario from "../models/usuario.model.js";

class UsuarioRepository {
    static async getAll() {
        return await Usuario.find();
    }
    static async getById(id) {
        return await Usuario.findById(id);
    }
    static async getByName(name) {
        return await Usuario.findOne({ name: name });
    }
    static async getByEmail(email) {
        return await Usuario.findOne({ email });
    }
    static async create(new_data) {
        return await Usuario.create(new_data);
    }
    static async update(id, data) {
        return await Usuario.findByIdAndUpdate(id, data, { new: true });
    }
    static async delete(id) {
        return await Usuario.findByIdAndDelete(id);
    }
    static async getByRol(rol) {
        return await Usuario.find({ rol });
    }
    static async activar(id) {
        return await Usuario.findByIdAndUpdate(
            id,
            { activo: true },
            { new: true }
        );
    }
    static async desactivar(id) {
        return await Usuario.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true }
        );
    }
}

export default UsuarioRepository;
