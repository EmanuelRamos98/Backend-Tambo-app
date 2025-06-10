import express from "express";

const rodeosRoute = express.Router();

rodeosRoute.get("/tambo/:tamboId", () => {});

rodeosRoute.post("/tambo/:tamboId", () => {});

rodeosRoute.get("/:id", () => {});

rodeosRoute.put("/:id", () => {});

rodeosRoute.delete("/:id", () => {});

export default rodeosRoute;
