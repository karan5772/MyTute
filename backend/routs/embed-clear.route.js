import express from "express";
import { clearEmbedd } from "../controllers/embed-clr.controller.js";
const clearRoute = express.Router();

clearRoute.delete("/", clearEmbedd);
export default clearRoute;
