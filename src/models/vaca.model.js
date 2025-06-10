import mongoose from "mongoose";

const vacaSchema = new mongoose.Schema({
    caravana: { type: String, required: true, unique: true },
    fechaNacimiento: Date,
    raza: String,
    estado: {
        type: String,
        enum: ["activa", "en tratamiento", "baja"],
        default: "activa",
    },
    rodeo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rodeo",
        required: true,
    },
    seguimientoActivo: { type: Boolean, default: false },
    fechaIngreso: { type: Date, default: Date.now },
});

export default mongoose.model("Vaca", vacaSchema);
