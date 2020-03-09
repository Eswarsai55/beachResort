import React, { Component } from 'react';
import items from './data';

const RoomContext = React.createContext();//Context API which allows you to access information in any component instead of passing them as props

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true, 
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: 0,
    pets: 0,
  }

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true)
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));

    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    })
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = {...item.fields, id, images}//Overriding images with the newly created images array
      return room;
    })
    return tempItems;
  }

  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room
  }

  handleChange = event => {
    const value = event.target.type === 'checkbox'? event.target.checked : event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    }, this.filterRooms)
  }

  filterRooms = () => {
    let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = this.state;
    let tempRooms = [...rooms];
    capacity = parseInt(capacity);
    price = parseInt(price);

    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity>=capacity)
    }
    if (type !== 'all') {
      tempRooms = tempRooms.filter(room => room.type === type)
    }

    tempRooms = tempRooms.filter(room => room.price <= price)

    tempRooms = tempRooms.filter(room => room.size>=minSize && room.size<=maxSize)

    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast)
    }
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets)
    }
    this.setState({
      sortedRooms: tempRooms
    })
  }

  render() {//Provider which provides the value which is inside a class component bcoz we are passing its state as value
    return (
      <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}

const RoomConsumer = RoomContext.Consumer;// Consumer which cosumes the value as props


export function withRoomConsumer(Component) {//passing your component as a paramter to a function 
  return function ConsumerWrapper(props) { // creating one more component to wrap your component inside consumer and we can access props of our component
    return <RoomConsumer>
      {value => <Component {...props} context={value}/>}
    </RoomConsumer>
  }
}//Creating higher order component inorder access the value of context from functional component

export {RoomContext, RoomConsumer, RoomProvider}
