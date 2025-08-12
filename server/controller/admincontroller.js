import jwt from 'jsonwebtoken'
import blog from '../models/adminModel.js';
import Comment from '../models/commentModel.js';
export const adminController = (req, res) => {

    try {
        const { email, password } = req.body;

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        const token = jwt.sign({ email }, process.env.JWTTOKEN)
        res.status(200).json({
            success: true,
            message: 'Login successfully',
            token: token
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }



}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await blog.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: blogs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllComments = async (req, res) => {
    try {

        const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 })

        res.json({
            success: true,
            data: comments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getDashboardData = async (req, res) => {
    try {

        const recentBlogs = await blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await blog.countDocuments();
        const comments = await Comment.countDocuments()
        const drafts = await blog.countDocuments({ isPublished: false })
        const dashboardData = {
            blogs, comments, drafts, recentBlogs
        }
        res.json({
            success: true,
            data: dashboardData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Comment deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: true });

        res.json({
            success: true,
            message: "Comment approved successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}