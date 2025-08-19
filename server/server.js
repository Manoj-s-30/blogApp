import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToDb from "./config/config.js";
import adminRouter from "./routes/adminRoutes.js";
import { blogRouter } from "./routes/blogRoutes.js";

const app = express();

// Connect to DB
connectToDb();

// Middleware
app.use(express.json());

// ✅ Configure CORS (allow your frontend domain + localhost for dev)
app.use(
    cors({
        origin: [
            "https://blog-app-dshq.vercel.app", // frontend domain
            "http://localhost:3000",            // dev
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Routes
app.get("/", (req, res) => {
    res.send("API is working ✅");
});

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

// ✅ DO NOT call app.listen() on Vercel
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on ${port}`));

export default app; // ✅ export app for Vercel
