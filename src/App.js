import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';

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
  render() {
    return (
      <div className="App">
        <h1 className="App-title">Bloc Chat</h1>
        <RoomList
          firebase={firebase}
        />
      </div>
    );
  }
}

export default App;
