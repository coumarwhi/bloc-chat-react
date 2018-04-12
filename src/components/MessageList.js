import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], 
    }
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.rooms.concat( message ) })
    });
  }

  Render() {
    return (
      <div className="message-list">
          { this.state.messages.map((message, index) => {
          return <p key={index}>{message.name}</p>
        })}
      </div>
    )
  }
}

export default MessageList;