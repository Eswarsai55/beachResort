import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../Context'
import Title from '../components/Title';

const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilter({rooms}) {
  const context = useContext(RoomContext);
  const { handleChange, type, capacity, minPrice, maxPrice, price, minSize, maxSize, breakfast, pets} = context;
  let types = getUnique(rooms, 'type');
  types = ['all', ...types];
  types = types.map((item,index) => {
    return <option value={item} key={index}>{item}</option>
  })
  let people = getUnique(rooms, 'capacity');
  people = people.map((item,index) => {
    return <option key={index} value={item}>{item}</option> 
  })
  return (
    <section className="filter-container">
      <Title title="search rooms"/>
      <form className = "filter-form">
        <div className="form-group">
          <label htmlFor="capacity">room type</label>
          <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
            {types}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Guests</label>
          <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
            {people}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">price Rs.{price}</label>
          <input type="range" name="price" min={minPrice} max={maxPrice} id="price" 
            value={price} onChange={handleChange} className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="size">Room size</label>
          <input type="number" name="minSize" id="minSize" value={minSize} onChange={handleChange} className="size-input"/>
          <input type="number" name="maxSize" id="maxSize" value={maxSize} onChange={handleChange} className="size-input"/>
        </div>
        <div className="form-group">
          <div className="single-extra">
            <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
            <label htmlFor="pets">pets</label>
          </div>  
        </div>
      </form>
      
    </section>
  )
}
