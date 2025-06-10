import Tambo from "../models/tambo.model";

class TamboRepository {
    static async getAll() {
        return await Tambo.find();
    }
    static async getById(id) {
        return await Tambo.findById(id);
    }
    static async create(new_data) {
        return await Tambo.create(new_data);
    }
    static async update(id, data) {
        return await Tambo.findByIdAndUpdate(id, data, { new: true });
    }
    static async delete(id) {
        return await Tambo.findByIdAndDelete(id);
    }
}

export default TamboRepository;
