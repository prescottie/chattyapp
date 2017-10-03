import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      content: ''
    };
    this.onNewMsg = this.onNewMsg.bind(this);
  }

  
  onNewMsg(event) {
    this.setState({
      newMsg: event.target.value
    });
  }

  render() {
    // console.log('Rendering <ChatBar />');
    return (
			<footer className="chatbar">
				<input className="chatbar-username" placeholder={ this.props.currentUser.name } />
				<input className="chatbar-message" name="newMsg" placeholder="Type a message and hit ENTER" onChange= { this.onNewMsg } />
			</footer>
    );
  }
}
export default ChatBar;