import React, { Fragment } from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';

import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <Fragment>
      <Hero>
        <Banner title="luxurious rooms" subtitle="deluxe rooms starting at Rs.599">
          <Link to='/rooms' className="btn-primary">Our Rooms</Link>
        </Banner>
      </Hero>
      <Services/>
      <FeaturedRooms />
    </Fragment>
  )
}
