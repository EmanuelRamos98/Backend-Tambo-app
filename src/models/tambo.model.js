import mongoose from "mongoose";

const tamboSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    ubicacion: { type: String, default: "" },
    descripcion: { type: String, default: "" },
    activo: { type: Boolean, default: true },
    fechaCreacion: { type: Date, default: Date.now },
});

export default mongoose.model("Tambo", tamboSchema);
