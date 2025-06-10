import Vaca from "../models/vaca.model";

class VacaRepository {
    static async getByRodeo(rodeoId) {
        return await Vaca.find({ rodeo: rodeoId });
    }
    static async getById(id) {
        return await Vaca.findById(id);
    }
    static async create(new_data) {
        return await Vaca.create(new_data);
    }
    static async update(id, data) {
        return await Vaca.findByIdAndUpdate(id, data, { new: true });
    }
    static async moverRodeo(vacaId, rodeoId) {
        return await Vaca.findByIdAndUpdate(
            vacaId,
            { rodeo: rodeoId },
            { new: true }
        );
    }
    static async delete(id) {
        return await Vaca.findByIdAndDelete(id);
    }
}

export default VacaRepository;
