import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import NavBar  from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'Anonymous', // optional. if currentUser is not defined, it means the user is Anonymous
      userCount: 0,
      messages: []
    };
  }

sendData(payload) { 
  this.socket.send(JSON.stringify(payload));
}

addMsg = (msg) => {
  const message = {
    type: "postMsg",
    username: this.state.username,
    content: msg
  }
  this.sendData(message);
}

changeUser = (user) => {
  this.sendData({
    type: "postNotification",
    content: `${this.state.username} changed their name to ${user}`
  })
  this.setState({
    username: user
  })
}


  componentDidMount() {
    this.socket = new WebSocket (`ws://${location.hostname}:3001`)

      this.socket.onopen = (event) => {
        console.log('Connection opened');
      }

      const appComponent = this;

      this.socket.onmessage = (event) => {
        let incomingData;
        try {
        incomingData = JSON.parse(event.data);
        }
        catch(error) {
          console.log(error);
        }
        switch (incomingData.type) {
          case "userCount":
             appComponent.setState({
              userCount: incomingData.count
            })
            break;
          case "postNotification":
          case "postMsg":
            appComponent.setState({
              messages: [...appComponent.state.messages, incomingData]
            })
            break;
          default:
            break;
        }
      }
  }
  
  render() {
    return (
      <div>
        <NavBar userCount= { this.state.userCount } />
        <MessageList messages= { this.state.messages }/>
        <ChatBar username={ this.state.username } 
        addMsg={ this.addMsg }
        changeUser= { this.changeUser } />
      </div>
    );
  }
}
export default App;
