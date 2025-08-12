import React, { useState } from 'react'
import { assets, blog_data, blogCategories } from '../assets/assets';
import { motion } from "motion/react"
import BlogCard from './BlogCard';
import { useAppContext } from '../../context/AppContext'


const BlogList = () => {
  const [menu, setMenu] = useState('All')
  // const { blog, input } = useAppContext();
  const { blog, input } = useAppContext();




  const filterBlogs = () => {
    if (input === "") {
      return blog
    }
    return blog?.filter((blg) => blg.title.toLowerCase().includes(input.toLowerCase()) || blg.subTitle.toLowerCase().includes(input.toLowerCase()));
  }
  return (
    <div>
      <div className='flex justify-center gap-2 sm:gap-4 my-4 sm:my-6 relative'>
        {blogCategories.map((item) => (
          <div key={item} className='relative'>
            <button
              className={`relative h-4/5 z-10 px-3 py-1 text-xs sm:text-sm cursor-pointer rounded-full ${menu === item ? 'text-white' : 'text-gray-500'
                }`}
              onClick={() => setMenu(item)}
            >
              {item}
              {menu === item && (
                <div className='absolute inset-0 -z-10 bg-primary rounded-full'></div>
              )}
            </button>
          </div>
        ))}
      </div>


      <div className='grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 sm:mx-16 xl:mx-40'>
        {filterBlogs()?.filter((ele) => menu === "All" ? true : ele.category === menu).map((item) => (
          <BlogCard blog={item} key={item._id} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
