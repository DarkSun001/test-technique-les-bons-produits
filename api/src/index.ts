import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/products.routes.js";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./db.js";
dotenv.config();

(async () => {
  await connectDB();
})();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/products", productRoutes);
app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

const server = http.createServer(app);
export const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log(" Client connecté :", socket.id);

  socket.on("disconnect", () => {
    console.log("Client déconnecté :", socket.id);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
