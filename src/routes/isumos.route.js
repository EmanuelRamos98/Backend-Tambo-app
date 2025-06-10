import express from "express";

const insumosRoute = express.Router();

insumosRoute.get("/", () => {});
insumosRoute.post("/", () => {});
insumosRoute.get("/:id", () => {});
insumosRoute.put("/", () => {});
insumosRoute.delete("/", () => {});

export default insumosRoute;
