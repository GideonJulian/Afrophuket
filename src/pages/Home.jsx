import React from 'react'
import Hero from '../components/ui/Hero'
import EventCard from '../components/ui/EventCard'
import FeaturedEvents from '../components/FeaturedEvents'

const Home = () => {
  return (
    <div>
      <Hero />
      <div className='mt-10'>
        <FeaturedEvents />
      </div>
    </div>
  )
}

export default Home