import express from "express";
import 'dotenv/config'
import cors from 'cors';
import connectToDb from "./config/config.js";
import adminRouter from "./routes/adminRoutes.js";
import { blogRouter } from "./routes/blogRoutes.js";

const app = express();

//middleware
connectToDb()
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("api is working")
})
app.use('/api/admin/', adminRouter)
app.use('/api/blog/', blogRouter)

const port = 'https://blog-app-bice-two.vercel.app/'

app.listen(port, () => {
    console.log("listening to port 3000")
})

export default app;


