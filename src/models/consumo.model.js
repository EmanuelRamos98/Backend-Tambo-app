import mongoose from "mongoose";

const consumoSchema = new mongoose.Schema({
    insumo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Insumo",
        required: true,
    },
    cantidad: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },

    //puede ser por rodeo o por vaca
    rodeo: { type: mongoose.Schema.Types.ObjectId, ref: "Rodeo" },
    vaca: { type: mongoose.Schema.Types.ObjectId, ref: "Vaca" },

    observaciones: String,
});

export default mongoose.model("Consumo", consumoSchema);
