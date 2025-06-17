import mongoose from "mongoose";

const rodeoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    tipo: {
        type: String,
        enum: ["ordeñe", "preparto", "cría", "secas", "otro"],
        default: "otro",
    },
    tambo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tambo",
        required: true,
    },
    fehcaCreacion: { type: Date, default: Date.now },
});

export default mongoose.model("Rodeo", rodeoSchema);
