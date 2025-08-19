// import mongoose from 'mongoose'

// const connectToDb = async () => {
//     try {
//         mongoose.connection.on("connected", () => { console.log("DB is connected") })
//         await mongoose.connect(`${process.env.MONGO_URI}`);


//     } catch (err) {
//         console.log("error", err.message)

//     }
// }

// export default connectToDb

import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = db.connections[0].readyState;
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        throw err;
    }
};
