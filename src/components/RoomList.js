import React from 'react'
import Rooms from './Rooms';

export default function RoomList({rooms}) {
  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>No rooms matched your search criteria</h3>
      </div>
    )
  }
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {
          rooms.map((room) => {
            return <Rooms key={room.id} room={room}/>
          })
        }
      </div>
    </section>
  )
}
