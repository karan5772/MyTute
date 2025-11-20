import express, { Router } from "express";
import multer from "multer";
import { pdfUpload } from "../controllers/pdfUpload.controller.js";
const upload = multer({
  storage: multer.memoryStorage(),
});

const fileRouter = express.Router();

fileRouter.post("/pdf", upload.single("file"), pdfUpload);

export default fileRouter;
