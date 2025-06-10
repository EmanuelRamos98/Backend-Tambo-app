import Consumo from "../models/consumo.model";

class ConsumoRepository {
    static async getByRodeo(rodeoId) {
        return await Consumo.find({ rodeo: rodeoId });
    }
    static async getByVaca(vacaId) {
        return await Consumo.find({ vaca: vacaId });
    }
    static async getById(id) {
        return await Consumo.findById(id);
    }
    static async create(new_data) {
        return await Consumo.create(new_data);
    }
    static async delete(id) {
        return await Consumo.findByIdAndDelete(id);
    }
}

export default ConsumoRepository;
