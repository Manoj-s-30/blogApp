import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogComment, getBlogsById, togglePublish } from "../controller/blogcontroller.js";

export const blogRouter = express.Router();
blogRouter.post('/add', upload.single('image'), auth, addBlog);
blogRouter.get('/all', getAllBlogs)
blogRouter.get('/:blogid', getBlogsById)
blogRouter.post('/delete', auth, deleteBlogById)
blogRouter.post('/toggle-publish', togglePublish)
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comment', getBlogComment);
blogRouter.post('/generate', auth, generateContent)


