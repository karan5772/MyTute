import express from "express";
import { chat } from "../controllers/chat.controller.js";

const chatRoute = express.Router();

chatRoute.post("/", chat);

export default chatRoute;
