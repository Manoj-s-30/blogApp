import fs from 'fs'
import imagekit from '../config/imagekit.js';
import blog from '../models/adminModel.js';
import Comment from '../models/commentModel.js';
import main from '../config/gemini.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;


        const filterBuffer = fs.readFileSync(imageFile.path)

        const response = await imagekit.upload({
            file: filterBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })


        const optimizeImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '1280' }
            ]
        })

        const image = optimizeImageUrl;

        await blog.create({ title, subTitle, description, category, image, isPublished });
        res.status(200).json({
            success: true,
            message: "Blog added sucessfully"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blog.find({ isPublished: true }).lean()
        res.json({
            success: true,
            message: "Fetched all blogs",
            data: blogs
        })

    } catch (err) {
        res.json({
            success: false,
            message: err.message,
        })
    }
}


export const getBlogsById = async (req, res) => {
    const { blogid } = req.params
    try {
        const blg = await blog.findById(blogid)
        if (!blg) {
            res.json({
                success: false,
                message: "Err, Please provide blogId",
            })
        }
        res.json({
            success: true,
            message: "Blog fetched successfully",
            data: blg
        })

    } catch (err) {
        res.json({
            success: false,
            message: err.message,
        })
    }
}

export const deleteBlogById = async (req, res) => {
    const { id } = req.body
    try {
        const blg = await blog.findByIdAndDelete(id)
        await Comment.deleteMany({ blog: id })
        res.json({
            success: true,
            message: "Blog deleted successfully",
            data: blg
        })

    } catch (err) {
        res.json({
            success: false,
            message: err.message,
        })
    }
}

export const togglePublish = async (req, res) => {

    try {
        let { id } = req.body;
        let blg = await blog.findById(id);

        if (!blg) {
            res.json({
                success: false,
                message: "error with id"
            })
        }
        blg.isPublished = !blg.isPublished
        await blg.save();
        res.json({
            success: true,
            message: "Toggled successfully"
        })
    } catch (err) {
        res.json({
            success: false,
            message: err.message,
        })
    }
}

export const addComment = async (req, res) => {
    const { blog, name, comment } = req.body;

    await Comment.create({ blog, name, comment });
    res.json({
        success: true,
        message: "Comment added for review"
    })
    try {

    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }
}

export const getBlogComment = async (req, res) => {

    try {
        const { blogid } = req.body;
        let comments = await Comment.find({ blog: blogid, isApproved: true }).sort({ createdAt: -1 }).lean()
        res.json({
            success: true,
            message: 'Comment fetched successfully',
            data: comments
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }

}

export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }

        const content = await main(
            `${prompt}. Generate a blog content for this topic in simple text format`
        );

        res.json({ success: true, content });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};