import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/" + "Vacas";
mongoose
    .connect(MONGO_URI, {})
    .then(() => {
        console.log("CONEXION: True");
    })
    .catch((error) => {
        console.error("CONEXION: Fail", error);
    })
    .finally(() => {
        console.log("CONEXION: Final exitoso");
    });

export default mongoose;
