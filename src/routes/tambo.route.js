import express from "express";

const tamboRoute = express.Router();

tamboRoute.get("/", () => {});

tamboRoute.post("/", () => {});

tamboRoute.get("/:id", () => {});

tamboRoute.put("/:id", () => {});

tamboRoute.delete("/:id", () => {});

export default tamboRoute;
