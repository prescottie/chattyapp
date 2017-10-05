import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'Anonymous', // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }

sendData(payload) { 
  this.socket.send(JSON.stringify(payload));
}

addMsg = (msg) => {
  const message = {
    type: "newMsg",
    username: this.state.username,
    content: msg
  }
  this.sendData(message);
}

changeUser = (user) => {
  this.sendData({
    type: "sysMsg",
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
        let incomingData = JSON.parse(event.data);
        console.log(incomingData);
        appComponent.setState({
          messages: [...appComponent.state.messages, incomingData]
        })
        
      }
  }
  
  render() {
    // console.log('Rendering <App />');
    return (
      <div>
        <MessageList messages= { this.state.messages }/>
        <ChatBar username={ this.state.username } 
        addMsg={ this.addMsg }
        changeUser= { this.changeUser } />
      </div>
    );
  }
}
export default App;
