export default function listReducer(
  state = {
    instruments: [],
    genres: [],
    cities: []
  },
  action
) {
  switch (action.type) {
    case "SET_INSTRUMENTS":
      return {...state, instruments: action.payload}
    case "SET_GENRES":
      return {...state, genres: action.payload}
    case "SET_CITIES":
      return {...state, cities: action.payload}
    default:
      return state;
  }
}
