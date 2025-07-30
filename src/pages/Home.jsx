import React from 'react'
import Hero from '../components/ui/Hero'
import EventCard from '../components/ui/EventCard'
import FeaturedEvents from '../components/FeaturedEvents'
import Tickets from '../components/Tickets'
import Mission from '../components/Mission'


const Home = () => {
  return (
    <div>
      <Hero />
      <div className='mt-10'>
        <FeaturedEvents />
      </div>
      <div className="mt-10">
        <Tickets />
      </div>
      <div>
        <Mission />
      </div>
    </div>

  )
}

export default Home