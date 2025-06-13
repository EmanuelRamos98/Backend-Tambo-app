import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    name: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    rol: {
        type: String,
        enum: ["admin", "operario", "veterinario", "consultor"],
        default: "operario",
    },
    activo: { type: Boolean, default: true },
});

export default mongoose.model("Usuario", usuarioSchema);
