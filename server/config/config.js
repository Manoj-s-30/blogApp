import mongoose from 'mongoose'

const connectToDb = async () => {
    try {
        mongoose.connection.on("connected", () => { console.log("DB is connected") })
        await mongoose.connect(`${process.env.MONGO_URI}`, { bufferCommands: 30000 });


    } catch (err) {
        console.log("error", err.message)

    }
}

export default connectToDb