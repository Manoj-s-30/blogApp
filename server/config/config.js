import mongoose from "mongoose";

const connectToDb = async () => {
    if (mongoose.connection.readyState >= 1) {
        return; // ✅ already connected
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // fail fast instead of buffering forever
        });
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ DB connection error:", err.message);
        throw err;
    }
};

export default connectToDb;
