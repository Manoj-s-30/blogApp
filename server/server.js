import express from "express";
import 'dotenv/config'
import cors from 'cors';
import connectToDb from "./config/config.js";
import adminRouter from "./routes/adminRoutes.js";
import { blogRouter } from "./routes/blogRoutes.js";

const app = express();
app.use(
    cors({
        origin: [
            "https://blog-app-dshq-git-main-manojss-projects.vercel.app", // frontend on vercel
            "http://localhost:3000" // dev
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

//middleware
connectToDb()
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("api is working")
})
app.use('/api/admin/', adminRouter)
app.use('/api/blog/', blogRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("listening to port 3000")
})

export default app;


