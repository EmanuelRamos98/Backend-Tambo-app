import mongoose from "mongoose";

const insumoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipo: {
        type: String,
        enum: ["alimento", "medicamento", "vacuna", "otro"],
        required: true,
    },
    unidad: { type: String, enum: ["kg", "l", "unidades"], required: true },
    costoUnitario: Number,
});

export default mongoose.model("Insumo", insumoSchema);
