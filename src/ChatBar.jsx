import React, { Component, PropTypes } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  static propTypes = {
    currentUser: PropTypes.object
  }

  onNewMsg = (event) => {
    this.setState({
      content: event.target.value
    });
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.addMsg(this.state.content)
      this.setState({ 
        content: ''
      })
    }
  }

  render() {

    return (
			<footer className="chatbar">
				<input className="chatbar-username" placeholder={ this.props.currentUser.name } />
				<input className="chatbar-message" 
        name="newMsg" placeholder="Type a message and hit ENTER" 
        onChange= { this.onNewMsg }  
        onKeyPress={ this.onKeyPress }
        value= { this.state.content } />
			</footer>
    );
  }
}
export default ChatBar;