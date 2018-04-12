import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: '',
      name: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoomName
      });
    }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }
 
  render() {
    return (
      <div className="room-list">
        <aside>
        <h3>Rooms</h3>
        { this.state.rooms.map((room, index) => {
          return <p key={index}>{room.name}</p>
        })}
        <form onSubmit={ (e) => this.createRoom(e) }>
          <input type="text" value={ this.state.newRoomName} onChange={ (e) => this.handleChange(e) } />
          <input type="submit" />
        </form>
        </aside>
        <div>
        <h3>Messages</h3>
        </div>
      </div>
    )
  }
}

export default RoomList;

