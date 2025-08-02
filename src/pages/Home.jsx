import React from 'react'
import Hero from '../components/ui/Hero'
import EventCard from '../components/ui/EventCard'
import FeaturedEvents from '../components/FeaturedEvents'
import BrowseTickets from '../components/BrowseTickets'
import Mission from '../components/Mission'
import ConnectSection from '../components/ConnectSection'


const Home = () => {
  return (
    <div>
      <Hero />
      <div className='mt-10'>
        <FeaturedEvents />
      </div>
      <div className="mt-10">
        <BrowseTickets />
      </div>
      <div>
        <Mission />
      </div>
      <div>
        <ConnectSection />
      </div>
    </div>

  )
}

export default Home