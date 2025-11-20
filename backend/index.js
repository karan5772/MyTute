import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pdfUpload } from "./controllers/pdfUpload.controller.js";
import fileRouter from "./routs/pdfUpload.routs.js";
import { clearEmbedd } from "./controllers/embed-clr.controller.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to MyTute Backend 🔥");
});

app.use("/upload", fileRouter);
app.use("/delete-embed", clearEmbedd);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

export default app;
