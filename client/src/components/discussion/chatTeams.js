import React, { Component } from "react";
import { connect } from "react-redux";

class ChatTeams extends Component {
    render() {
        
        if (this.props.selectedUser){
          return (
          <div className="group-banner">
            <div className="members">
              <h6>design team</h6>
              {this.props.selectedUser.map((el) => (
                <div className="pic">
                  
                  
                  <img src={ `/img/avatar/${el.image}.jpg` } alt=""/>
                  <span className="state-dot"></span>
                </div>
              ))}
         

            </div>
          </div> )
        }else{
              return ( null )
        }
    }
}

const mapStateToProps = state => {
  return {
    selectedUser: state.discussion.selectedUser
  };
};
export default connect(mapStateToProps, null)(ChatTeams);