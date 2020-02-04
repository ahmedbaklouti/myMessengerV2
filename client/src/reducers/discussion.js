import io from "socket.io-client";

const init = {
    socket: io("http://localhost:5000/"),
    listMessage: "",
    selectedUser: [],
    room:""
};

const SHARE_MESSAGE = "SHARE_MESSAGE";
const ADD_USER = "ADD_USER"
const ADD_ROOM = "ADD_ROOM"

function reducer(state = init, action) {
  console.log(state)
  switch (action.type) {
    case SHARE_MESSAGE:
      return { ...state, listMessage: action.payload };
    case ADD_USER:
      return { ...state, selectedUser: [action.payload]}
    case ADD_ROOM:
      console.log("********"+action.payload+"********")
      return { ...state, listMessage: "", room: action.payload };
    default:
      return state;
  }
    
}

export default reducer