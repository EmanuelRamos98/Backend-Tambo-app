import dotenv from "dotenv";

dotenv.config();

const ENVIROMENT = {
    SECRET_KEY: process.env.SECRET_KEY,
};

export default ENVIROMENT;
