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
app.use("/delete-embed", clearRoute);
app.use("/chat", chatRoute);
app.use("/yt", ytRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

export default app;
