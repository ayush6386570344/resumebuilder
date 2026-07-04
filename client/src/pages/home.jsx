import React from 'react'
import Hero from '../component/home/hero'
import Banner from '../component/home/banner'
import Features from '../component/home/features'
import Testomonial from '../component/home/testomonial'
import Calltoaction from '../component/home/calltoaction'
import Footer from '../component/home/footer'
const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <Hero></Hero>
        <Features></Features>
        <Testomonial></Testomonial>
        <Calltoaction></Calltoaction>
        <Footer></Footer>
    </div>
  )
}

export default Home
