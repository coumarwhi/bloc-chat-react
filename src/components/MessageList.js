import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      content: '',
      sentAt: '',
      roomId: '',
      username: ''
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.createMessage = this.createMessage.bind(this);
    this.messageContent = this.messageContent.bind(this);
  };

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  messageContent(e) {
    e.preventDefault();
    this.setState(
      {
        content: e.target.value,
        sentAt: firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoom,
        username: this.props.currentUser
      }
    )
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push(
      {
        content: this.state.content,
        sentAt: this.state.sentAt,
        roomId: this.state.roomId,
        username: this.props.currentUser
      }
    );
    this.setState ({
      message: '',
      sentAt: '',
      roomId: ''
    })
    e.target.reset()
  };

  render() {

    let activeRoom = this.props.activeRoom
    
    return (
      <div id='messages'>
       <div>
        <form className="newMessage" onSubmit={this.createMessage}>
          <h2>Messages</h2>
          <textarea type='text' placeholder="New message here:" onChange={this.messageContent}/>
          <input type='submit' value="Submit"/>
        </form>
       </div>
        <div id='current-message'>
        { this.state.messages.map((message)=> {
        if (message.roomId === activeRoom) {
          return <p key={message.key}>{message.username}: {message.content}</p>
        }
        return null;
      })}
        </div>
      </div>
    );
  }
 }

export default MessageList

