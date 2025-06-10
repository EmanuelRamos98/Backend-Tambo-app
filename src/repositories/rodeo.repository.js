import Rodeo from "../models/rodeo.model";

class RodeoRopository {
    static async getByTambo(tamboId) {
        return await Rodeo.find({ tambo: tamboId });
    }
    static async getById(id) {
        return await Rodeo.findById(id);
    }
    static async create(new_data) {
        return await Rodeo.create(new_data);
    }
    static async update(id, data) {
        return await Rodeo.findByIdAndUpdate(id, data, { new: true });
    }
    static async delete(id) {
        return await Rodeo.findByIdAndDelete(id);
    }
}

export default RodeoRopository;
