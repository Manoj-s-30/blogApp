import React, { useEffect } from 'react'
import { assets } from '../../assets/assets';
import axios from 'axios';
import toast from 'react-hot-toast';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt } = blog;
    const blogDate = new Date(createdAt);

    const deleteBlog = async () => {
        const cnfrm = window.confirm('Are you sure you want to delete this blog')
        if (!cnfrm) return;
        try {
            const { data } = await axios.post('https://blog-app-bice-two.vercel.app/api/blog/delete', { id: blog._id });

            if (data.success) {
                toast.success(data.message)
                await fetchBlogs;

            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    const togglePublish = async () => {
        try {
            const { data } = await axios.post('https://blog-app-bice-two.vercel.app/api/blog/toggle-publish', { id: blog._id });

            if (data.success) {
                toast.success(data.message)

                await fetchBlogs;
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }
    useEffect(() => { }, [])
    return (
        <tr className='border-y border-gray-300'>
            <td className='px-2 py-4'>{index}</td>
            <td className='px-2 py-4'>{title}</td>
            <td className='px-2 py-4 max-sm:hidden'>{blogDate.toDateString()}</td>
            <td className='px-2 py-4 max-sm:hidden'> <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}>{blog.isPublished ? "Published" : "unPublished"}       </p>
            </td>
            <td className='px-2 py-4 flex-xs gap-3'>
                <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{blog.isPublished ? "UnPublished" : "Published"}</button>
            </td>
            <td className='px-2 py-4'>
                <img src={assets.cross_icon} alt="" className='w-8 hover:scale-110 transition-all cursor-pointer' onClick={deleteBlog} />
            </td>

        </tr>
    )
}

export default BlogTableItem
