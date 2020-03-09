import React, { Component, Fragment } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import StyledHero from '../components/StyledHero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../Context';

export class SingleRoom extends Component {
  constructor(props) {
    super(props)
    //console.log(this.props);Props which are passed by react-router
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg,
    }
  }
  static contextType = RoomContext
  render() {
    const {getRoom} = this.context;
    const room = getRoom(this.state.slug);
    if (!room) {
      return (
        <div className="error">
          <h3>no such rooms could be found</h3>
          <Link to ='/rooms' className="btn-primary">back to rooms</Link>
        </div>
      )
    }
    const {name, description, capacity, price, extras, breakfast, pets, size, images } = room;
    const [mainImg,...defaultImg] = images//destructuring images array mainImg will be images[0] 
    return (
      <Fragment>
        <StyledHero img={mainImg || this.state.defaultBcg}>
          <Banner title={`${name}`}>
            <Link to='/rooms' className="btn-primary">Back to rooms</Link>
          </Banner>
          </StyledHero>
          <section className="single-room">
            <div className="single-room-images">
              {defaultImg.map((item,index) => {
                return <img key={index} src={item} alt={name}/>
               })}
            </div>
            <div className="single-room-info">
              <article className="desc">
                <h3>details</h3>
                <p>{description}</p>
              </article>
              <article className="info">
                <h3>info</h3>
                <h6>price: ${price}</h6>
                <h6>size: ${size}SQFT</h6>
                <h6>max capacity: {capacity>1 ? `${capacity} people` : `${capacity} person`}</h6>
                <h6>{pets? "pets allowed": "no pets allowed"}</h6>
                <h6>{breakfast && 'free breakfat included'}</h6>
              </article>
            </div>
          </section>
          <section className="room-extras">
            <h6>extras</h6>
            <ul className="extras">
              {extras.map((item,index) => {
                return <li key={index}>-{item}</li>
              })}
            </ul>
          </section>
      </Fragment>  
    )
  }
}

export default SingleRoom
