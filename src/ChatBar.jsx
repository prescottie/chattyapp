import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      username: this.props.username
    };
  }

  handleUserChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handleMsgChange = (event) => {
    this.setState({
      content: event.target.value
    })
  }
  
  /* If a user press' enter on a the message bar, run the addMsg function from the app component
     and empty out the message bar. */
  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.addMsg(this.state.content)
      this.setState({ 
        content: ''
      })

    }
  }

  /*If a user press' Enter on the username field, check if the user name has changed,
    if so, then run the change user function from the app component and focus the message bar*/
  onChangeUser = (event) => {
    if (event.key === 'Enter') {
      if(event.target.value !== this.props.username) {
        this.props.changeUser(this.state.username)
        this.refs.msg.focus();
      }
    }
  }

  render() {
    return (
			<footer className="chatbar">
				<input className="chatbar-username" ref='user'
        value={ this.state.username } 
        onChange= { this.handleUserChange } 
        onKeyPress= { this.onChangeUser }
         />
				<input className="chatbar-message" 
        ref='msg' placeholder="Type a message and hit ENTER"   
        onKeyPress={ this.onKeyPress }
        onChange= { this.handleMsgChange }
        value= { this.state.content } />
			</footer>
    );
  }
}
export default ChatBar;