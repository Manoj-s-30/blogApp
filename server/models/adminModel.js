import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    subTitle: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    isPublished: {
        type: Boolean,
        require: true
    },

}, { timestamps: true })

const blog = mongoose.model('blog', blogSchema)

export default blog;