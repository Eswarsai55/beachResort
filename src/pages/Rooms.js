import React, { Fragment } from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import RoomContainer from '../container/RoomContainer';


export default function Rooms() {
  return (
    <Fragment>
      <Hero hero="roomsHero">
        <Banner title="Our Rooms">
          <Link to='/' className="btn-primary">Return Home</Link>
        </Banner>
      </Hero>
      <RoomContainer/>
    </Fragment>
  )
}
