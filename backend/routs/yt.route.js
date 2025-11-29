import express from "express";
import { ytupload } from "../controllers/yt.controller.js";

const ytRoute = express.Router();

ytRoute.post("/", ytupload);

export default ytRoute;
