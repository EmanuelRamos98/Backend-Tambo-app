import mongoose from "./config/db.config.js";
import express from "express";
import cors from "cors";
import statusRoute from "./routes/status.route.js";
import tamboRoute from "./routes/tambo.route.js";
import rodeosRoute from "./routes/rodeos.route.js";
import vacaRoute from "./routes/vaca.route.js";
import insumosRoute from "./routes/isumos.route.js";
import consumosRoute from "./routes/consumos.route.js";
import usuarioRoute from "./routes/usuarios.route.js";
import reporteRoute from "./routes/reportes.route.js";
import errorHandle from "./middlewares/error.handle.middleware.js";
import authRoute from "./routes/auth.routes.js";

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/status", statusRoute);

app.use("/api/tambo", tamboRoute);
app.use("/api/rodeo", rodeosRoute);
app.use("/api/vaca", vacaRoute);
app.use("/api/insumo", insumosRoute);
app.use("/api/consumo", consumosRoute);
app.use("/api/usuario", usuarioRoute);
app.use("/api/auth", authRoute);
app.use("/api/reporte", reporteRoute);

app.use(errorHandle);
app.listen(PORT, () => {
    console.log(`El servidor se esta ejecutando en http://localhost:${PORT}`);
});
