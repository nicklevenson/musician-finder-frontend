export default function userReducer(state={
  currentUser: {
    outgoing_pending_requests: [],
  },
  connectedUsers: [],
  recommendedUsers: [],
  incomingRequests: [],
  chatrooms: [],
  notifications: []
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
    case "SET_USER_NOTIFICATIONS":
      return {...state, notifications: action.payload}
    default:
      return state
  }
}