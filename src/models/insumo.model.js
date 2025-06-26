import mongoose from "mongoose";

const insumoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipo: {
        type: String,
        enum: ["alimento", "medicamento", "vacuna", "otro"],
        required: true,
    },
    unidad: {
        type: String,
        enum: ["kg", "l", "unidades"],
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    costoUnitario: Number,
});

export default mongoose.model("Insumo", insumoSchema);
