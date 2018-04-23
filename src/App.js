import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList';
import User from './components/User';

  var config = {
    apiKey: "AIzaSyA9AVyszZmO-yBJemFL2EYcflXMQPF0RKw",
    authDomain: "bloc-chat-c8ed0.firebaseapp.com",
    databaseURL: "https://bloc-chat-c8ed0.firebaseio.com",
    projectId: "bloc-chat-c8ed0",
    storageBucket: "bloc-chat-c8ed0.appspot.com",
    messagingSenderId: "444910153370"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      activeRoom: '',
      user: null
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

setActiveRoom(room) {
  this.setState({ activeRoom: room });
}

setUser(user) {
  this.setState({ user: user });
}

  render() {
    let showMessages = this.state.activeRoom;
    let currentUser = this.state.user === null ? "Guest" : this.state.user.displayName;
    return (
      <div className="App">
        <h1 className="App-title">Bloc Chat</h1>
        <h2>{this.state.activeRoom.name || "Choose your room!"}</h2>
        <User
          firebase={firebase}
          setUser={this.setUser}
          currentUser={currentUser}
        />
        <RoomList
          firebase={firebase}
          setActiveRoom={this.setActiveRoom}
        />
        { showMessages ?
        <MessageList
          firebase={firebase}
          activeRoom = {this.state.activeRoom.key} 
        />
        : null }
      </div>
    );
  }
}

export default App;