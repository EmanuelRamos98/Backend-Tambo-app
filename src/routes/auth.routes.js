import express from "express";
import {
    loginController,
    usuarioProfileController,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.meddleware.js";

const authRoute = express.Router();

//ingreso app
authRoute.post("/login", loginController);

authRoute.get("/me", authMiddleware(), usuarioProfileController);

export default authRoute;
