import React, {Component} from 'react';
import Message from './message.jsx';

class MessageList extends Component {
  render() {
		// Loop through messages array from app component and send each message to message component to display. 
		const messages = this.props.messages.map(message => {
			return <Message 
				key= { message.id }
				type= { message.type }
				username = { message.username }
				content = { message.content } />
		})

		return (
			<main className="messages">
				{messages}
			</main>
    );
  }
}
export default MessageList;