import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: {
        type: String,
        enum: ["admin", "operario", "veterinario", "consultor"],
        default: "operario",
    },
    activo: { type: Boolean, default: true },
});

export default mongoose.model("Usuario", usuarioSchema);
