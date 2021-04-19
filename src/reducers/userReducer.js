export default function userReducer(state={
  currentUser: {},
  recommendedUsers: [],
  incomingRequests: [],
  allUsers: []
}, action) {
  switch(action.type){
    case "SET_USER":
      return {...state, currentUser: action.payload}
    case "SET_RECOMMENDED_USERS":
      return {...state, recommendedUsers: action.payload}
    case "SET_INCOMING_REQUESTS":
      return {...state, incomingRequests: action.payload}
    case "SET_ALL_USERS":
      return {...state, allUsers: action.payload}
    default:
      return state
  }
}