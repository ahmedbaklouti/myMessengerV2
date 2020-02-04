import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser , addRoom } from "../../actions/discussion";

class Contact extends Component {
  
    userSelect(user,image) {
        const obj = {
            user:user,
            image:image
        }
        console.log(obj)
        this.props.addUser(obj)

        let roomId = `${this.props.currentUser}-${Date.now()}`;
        console.log(roomId)
        this.props.addRoom(roomId)
        this.props.socket.emit("addUserToRoom", this.props.currentUser, roomId);
        this.props.socket.emit("addUserToRoom", obj.user, roomId);

    }
  
    render() {

    return (
      <React.Fragment>
        <div className="state" onClick={() => this.userSelect("user1",1)}>
          <div className="pic">
            <img src="/img/avatar/1.jpg" alt="" />
            <span className="state-dot"></span>
          </div>
          <div className="info">
            <h6>avata1</h6>
            <span>online</span>
          </div>
        </div>

        <div className="state" onClick={() => this.userSelect("user2",2)}>
          <div className="pic">
            <img src="/img/avatar/2.jpg" alt="" />
            <span className="state-dot"></span>
          </div>
          <div className="info">
            <h6>avata2</h6>
            <span>online</span>
          </div>
        </div>

        <div className="state" onClick={() => this.userSelect("user3",4)}>
          <div className="pic">
            <img src="/img/avatar/4.jpg" alt="" />
            <span className="state-dot"></span>
          </div>
          <div className="info">
            <h6>avata3</h6>
            <span>online</span>
          </div>
        </div>

        <div className="state" onClick={() => this.userSelect("user4",7)}>
          <div className="pic">
            <img src="/img/avatar/7.jpg" alt=""/>
            <span className="state-dot"></span>
          </div>
          <div className="info">
            <h6>avata4</h6>
            <span>online</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
    return {
      socket: state.discussion.socket
    };
  };
  
const mapDispatchToProps = { addUser, addRoom };
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
