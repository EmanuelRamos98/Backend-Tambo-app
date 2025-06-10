import Insumo from "../models/insumo.model";

class InsumoRepository {
    static async getAll() {
        return await Insumo.find();
    }
    static async getById(id) {
        return await Insumo.findById(id);
    }
    static async create(new_data) {
        return await Insumo.create(new_data);
    }
    static async update(id, data) {
        return await Insumo.findByIdAndUpdate(id, data, { new: true });
    }
    static async delete(id) {
        return await Insumo.findByIdAndDelete(id);
    }
}

export default InsumoRepository;
