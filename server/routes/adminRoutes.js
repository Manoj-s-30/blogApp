import express from 'express';
import { adminController, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboardData } from '../controller/admincontroller.js';
import auth from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminController)
adminRouter.get('/comments', auth, getAllComments);
adminRouter.get('/blogs', auth, getAllBlogsAdmin);
adminRouter.post('/delete-comment', auth, deleteCommentById);

adminRouter.post('/approve-comment', auth, approveCommentById);
adminRouter.get('/dashboard', auth, getDashboardData);




export default adminRouter; 