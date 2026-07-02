import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileRouter from "./routs/pdfUpload.routs.js";
import clearRoute from "./routs/embed-clear.route.js";
import chatRoute from "./routs/chat.route.js";
import ytRoute from "./routs/yt.route.js";

dotenv.config();
const app = express();

app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));
//remove on VPS, nginx got it
app.use(
  cors({
    origin: ["http://localhost:5173", "https://my-tute-mocha.vercel.app/"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Welcome to MyTute Backend 🔥");
});

app.use("/api/upload", fileRouter);
app.use("/api/delete-embed", clearRoute);
app.use("/api/chat", chatRoute);
app.use("/api/yt", ytRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

export default app;
