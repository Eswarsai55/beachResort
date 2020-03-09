import React from 'react'
import RoomList from '../components/RoomList';
import RoomFilter from '../components/RoomFilter';
import { withRoomConsumer } from '../Context';
import Loading from '../components/Loading';


function RoomContainer({context}) {
  const { loading, sortedRooms, rooms} = context;
  if (loading) {
    return <Loading/>
  }
  return (
    <>
      <RoomFilter rooms={rooms}/>
      <RoomList rooms={sortedRooms}/>
    </>
  )
}

export default withRoomConsumer(RoomContainer);



// export default function RoomContainer() {

//   return (//You cant use context in function based component so we are using consumer to consume value provided by provider
//     <RoomConsumer>
//       {
//         (value) => {
//           const { loading, sortedRooms, rooms} = value;
//           if(loading) {
//             return <Loading/>
//           }
//           return (
//             <div>
//               <RoomFilter rooms={rooms}/>
//               <RoomList rooms={sortedRooms}/>
//             </div>
//           )
//         }
//       }
      
//     </RoomConsumer>
//   )
// } direct accessing of consumer
