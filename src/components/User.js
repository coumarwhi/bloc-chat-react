import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged((user) => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ).then((result)=> {
      const user = result.user;
      this.props.setUser(user);
    });
  }

  signOut() {
    this.props.firebase.auth().signOut().then(() => {
      this.props.setUser(null);
    })
  }

  render() {
    return(
      <div className="login">
        <h2>You are signed in as {this.props.currentUser}</h2>
        <p>{this.props.currentUser === 'Guest' ? "Please sign in" : "Welcome back!" }</p>
        <button className="userButton" onClick={this.signIn}>Sign In</button>
        <button className="userButton" onClick ={this.signOut}>Sign Out</button>
      </div>
    )
  }
}

export default User;