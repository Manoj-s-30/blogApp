import React from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import BlogCard from '../components/BlogCard'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <NavBar/>
        <Header/>
        <BlogList/>
        <NewsLetter />
        <Footer/>
      
      
    </div>
  )
}

export default Home
