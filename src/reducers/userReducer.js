export default function userReducer(state={
  currentUser: {
    outgoing_pending_requests: [],
    notifications: []
  },
  connectedUsers: [],
  recommendedUsers: [],
  incomingRequests: [],
  chatrooms: [],
  allUsers: []
}, action) {
  switch(action.type){
    case "SET_USER":
      return {...state, currentUser: action.payload}
    case "SET_CONNECTIONS":
      return {...state, connectedUsers: action.payload}
    case "SET_RECOMMENDED_USERS":
      return {...state, recommendedUsers: action.payload}
    case "SET_INCOMING_REQUESTS":
      return {...state, incomingRequests: action.payload}
    case "SET_USER_CHATROOMS":
      return {...state, chatrooms: action.payload}
    case "SET_ALL_USERS":
      return {...state, allUsers: action.payload}
    default:
      return state
  }
}