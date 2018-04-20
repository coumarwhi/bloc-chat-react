import React, { Component } from 'react';
<<<<<<< HEAD
=======
import * as firebase from 'firebase';
>>>>>>> list-messages

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
<<<<<<< HEAD
      messages: [], 
    }
  }
=======
      messages: [],
      content: '',
      sentAt: '',
      roomId: ''
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.createMessage = this.createMessage.bind(this);
    this.messageContent = this.messageContent.bind(this);
  };
>>>>>>> list-messages

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
<<<<<<< HEAD
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
=======
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
          return <p key={message.key}>{message.content}</p>
        }
        return null;
      })}
        </div>
      </div>
    );
  }
 }

export default MessageList

>>>>>>> list-messages
