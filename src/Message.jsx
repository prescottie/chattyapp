import React, {Component} from 'react';

class Message extends Component {
  handleMessage() {
    switch (this.props.type) {
      case "postNotification":
        return (<small className="message system">{ this.props.content }</small>);
        break;
      case "postMsg":
        default:
        return (<span className="message-content">{ this.props.content }</span>);
        break;
    }
  }

  render() {
  

    return (
      <div>
        <div className="message">
					<span className="message-username">{ this.props.username }</span>
          { this.handleMessage() }
				</div>
      </div>
    );
  }
}
export default Message;