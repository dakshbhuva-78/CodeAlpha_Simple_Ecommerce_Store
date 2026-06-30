import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config({
    path: path.resolve(".env")
});

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://code-alpha-simple-ecommerce-store-ashy.vercel.app"
    ],
    credentials: true
}));

app.use(express.json());

app.use(
    "/assets",
    express.static(path.join(__dirname, "assets"))
);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});