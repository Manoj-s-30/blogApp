import React from 'react'
import { assets } from '../assets/assets';
import axios from 'axios';
import toast from 'react-hot-toast';

const CommentsTableItem = ({ comment, fetchComments }) => {
    const { blog, createdAt, _id } = comment;
    console.log("comment", comment)
    const BlogDate = new Date(createdAt)

    const onApproveClick = async () => {
        try {
            const { data } = await axios.post('http://localhost:3000/api/admin/approve-comment', { id: comment._id });
            if (data.success) {
                toast.success('Comment updated successfully')
                fetchComments()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const onDeleteClick = async () => {
        try {
            const { data } = await axios.post('http://localhost:3000/api/admin/delete-comment', { id: comment._id });
            if (data.success) {
                toast.success('Comment deleted successfully ')
                fetchComments();
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <tr className='order-y border-gray-300'>
            <td className='px-6 py-4'>
                <b className='font-medium text-gray-600'>Blog</b> :{blog.title}
                <br />
                <br />
                <b className='font-medium text-gray-600'>Name</b> :{comment.name}
                <br />
                <b className='font-medium text-gray-600'
                >Comment</b> :{comment.content}
            </td>
            <td className='px-6 py-4 max-sm:hidden'>
                {BlogDate.toISOString()}
            </td>

            <td className='px-6 py-4'>


                <div className='inline-flex items-center gap-4'>
                    {!comment.isApproved ? <img src={assets.tick_icon} onClick={onApproveClick} className='w-5 hover:scale-110 transition-all cursor-pointer' /> : <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>}
                    <img src={assets.bin_icon} onClick={onDeleteClick} alt="" className='w-5 hover:scale-110 transition-all cursor-pointer' />
                </div>
            </td >
        </tr >
    )
}

export default CommentsTableItem
