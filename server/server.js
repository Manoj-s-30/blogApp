import express from "express";
import 'dotenv/config';
import cors from 'cors';
import connectToDb from "./config/config.js";
import adminRouter from "./routes/adminRoutes.js";
import { blogRouter } from "./routes/blogRoutes.js";

const app = express();

// Connect DB
connectToDb();

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: [
            "https://blog-app-bice-two.vercel.app", // frontend
            "http://localhost:3000"             // dev
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.get("/", (req, res) => {
    res.send("API is working 🚀");
});

app.use("/api/admin/", adminRouter);
app.use("/api/blog/", blogRouter);

// ❌ REMOVE app.listen()
// ✅ Just export the app
export default app;
