import mongoose from "mongoose";
import blog from "./adminModel.js";

const comment = new mongoose.Schema({
    blog: { type: mongoose.Schema.Types.ObjectId, ref: blog, require: true },
    name: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    isApproved: { type: Boolean, default: false }

}, { timestamps: true });

const Comment = mongoose.model('Comment', comment);

export default Comment