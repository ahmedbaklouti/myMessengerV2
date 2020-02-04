import React, { Component } from "react";
import { connect } from "react-redux";
import { shareMessages, addRoom } from "../../actions/discussion";

class MessageInput extends Component {

  state = {
    socket: this.props.socket,
    pseudo: this.props.currentUser,
    message: "",
  }
  
  componentDidMount = () => {

    this.state.socket.emit("saveSocket", this.state.pseudo);

    this.state.socket.on("message", function(message) {
      console.log("Server msg => " + message);
    });

    this.state.socket.on("updateMsg", (msg, roomId) =>  {
      console.log("recived: "+roomId)
      this.props.addRoom(roomId)
      console.log(msg);
      this.props.shareMessages(msg)
    });
    
  };

  handleSetMessage = event => {
    this.setState({
      message: event.target.value,
      
    });
  };

  handleSendMessage = event => {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.props.room)
    if (this.state.message === "") {
      alert("Votre message est vide");
    } else {
      this.state.socket.emit(
        "newMsg",
        this.state.message,
        this.props.room,
        this.state.pseudo
      );
      
      this.setState({
        message: ''
      });
     
    }
  };

  render() {
    
    return (
      <div>
    

        <div className="input">
          <div className="dialog">
            <input
              type="text"
              placeholder="Write your message here.."
              value={this.state.message}
              onChange={this.handleSetMessage}
            />
         

            

            <div className="icon send">
              <img
                src="/img/icons/paper-plane (1).svg"
                alt=""
                onClick={this.handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    socket: state.discussion.socket,
    room: state.discussion.room,
    selectedUser: state.discussion.selectedUser
  };
};
const mapDispatchToProps = { shareMessages, addRoom };
export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
