import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from 'react-moment';

class ChatBox extends Component {

  render() {
    if (this.props.listMessage)
    return this.props.listMessage.map((el) => (
      
      <React.Fragment>
        {(this.props.currentUser == el[1] ) ? 
          <div className="my-msg">
            <div className="msg">
              <p>
                <span className="time">
                  <Moment format="DD/MM/YYYY HH:mm">{el[2]}</Moment>
                </span>
                <span>{el[1]}</span>
              </p>
              <p className="paragraph">{el[0]}</p>
            </div>
          </div>
            : 
            <div className="user-msg">
            <div className="msg">
              <p className="right">
                <span className="time">
                  <Moment format="DD/MM/YYYY HH:mm">{el[2]}</Moment>
                </span>
                <span>{el[1]}</span>
              </p>
              <p className="paragraph">{el[0]}</p>
            </div>
            </div>

            }
      </React.Fragment>
    
    
    ));
    else return <div>aucun message</div>
  }

}

const mapStateToProps = state => {
  console.log(state.listMessage)
  return {
    listMessage: state.discussion.listMessage
  };
};
export default connect(mapStateToProps, null)(ChatBox);
