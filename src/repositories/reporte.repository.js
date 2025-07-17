import mongoose from "mongoose";
import consumoModel from "../models/consumo.model.js";
import rodeoModel from "../models/rodeo.model.js";

class ReporteRepository {
    static async getConsumosPorTambo(tamboId, filtros = {}) {
        const rodeos = await rodeoModel.find({ tambo: tamboId }, "_id");
        const rodeoIds = rodeos.map((r) => r._id);

        const query = { rodeo: { $in: rodeoIds } };

        if (filtros.desde || filtros.hasta) {
            query.fecha = {};
            if (filtros.desde) query.fecha.$gte = new Date(filtros.desde);
            if (filtros.hasta) {
                const hasta = new Date(filtros.hasta);
                hasta.setHours(23, 59, 59, 999);
                query.fecha.$lte = hasta;
            }
        }

        return await consumoModel
            .find(query)
            .populate("insumo")
            .sort({ fecha: -1 });
    }

    static async getConsumosPorRodeo(rodeoId, filtros = {}) {
        const query = { rodeo: rodeoId };

        if (filtros.desde || filtros.hasta) {
            query.fecha = {};
            if (filtros.desde) query.fecha.$gte = new Date(filtros.desde);
            if (filtros.hasta) {
                const hasta = new Date(filtros.hasta);
                hasta.setHours(23, 59, 59, 999);
                query.fecha.$lte = hasta;
            }
        }

        return await consumoModel
            .find(query)
            .populate("insumo")
            .sort({ fecha: -1 });
    }

    static async getConsumosPorVaca(vacaId, filtros = {}) {
        const query = { vaca: vacaId };

        if (filtros.desde || filtros.hasta) {
            query.fecha = {};
            if (filtros.desde) query.fecha.$gte = new Date(filtros.desde);
            if (filtros.hasta) {
                const hasta = new Date(filtros.hasta);
                hasta.setHours(23, 59, 59, 999);
                query.fecha.$lte = hasta;
            }
        }

        return await consumoModel
            .find(query)
            .populate("insumo")
            .sort({ fecha: -1 });
    }

    static async getTotalesPorInsumo(rodeoId) {
        return await consumoModel.aggregate([
            { $match: { rodeo: mongoose.Types.ObjectId(rodeoId) } },
            {
                $group: {
                    _id: "$insumo",
                    total: { $sum: "$cantidad" },
                    usos: { $sum: 1 },
                },
            },
        ]);
    }
}

export default ReporteRepository;
