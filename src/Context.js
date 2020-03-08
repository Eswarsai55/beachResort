import React, { Component } from 'react';
import items from './data';

const RoomContext = React.createContext();//Context API which allows you to access information in any component instead of passing them as props

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true, 
  }

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true)
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false
    })
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = {...item.fields, images}//Overriding images with the newly created images array
      return room;
    })
    return tempItems;
  }

  render() {//Provider which provides the value which is inside a class component bcoz we are passing its state as value
    return (
      <RoomContext.Provider value={{...this.state}}>
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}

const RoomConsumer = RoomContext.Consumer;// Consumer which cosumes the value as props

export {RoomContext, RoomConsumer, RoomProvider}
