import mongoose from "mongoose";

const tamboSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    ubicacion: String,
    descripcion: String,
    fechaCreacion: { type: Date, default: Date.now },
});

export default mongoose.model("Tambo", tamboSchema);
