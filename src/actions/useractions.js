
export const setUser = (user) => ({type: "SET_USER", payload: user})
export const setRecommendedUsers = (users) => ({type: "SET_RECOMMENDED_USERS", payload: users})
export const fetchUser = () => {
  return (dispatch) => {
    const userId = sessionStorage.userId
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt}`
      }
    })
    .then(res => res.json())
    .then(json => {
      
        dispatch(setUser(json))
       
    })
    .catch(function(error) {
        alert("Error getting User.")
    })
  }
}
export const fetchUserRecs = () => {
  return (dispatch) => {
    const userId = sessionStorage.userId
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}/recommended_users`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt}`
      }
    })
    .then(res => res.json())
    .then(json => {
      
        dispatch(setRecommendedUsers(json))
       
    })
    .catch(function(error) {
        alert("Error getting User.")
    })
  }
}

export const requestConnection = (requested_id) => {
  return (dispatch) => {
    let configObj = {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${sessionStorage.jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({requested_id: requested_id})
    }
    const userId = sessionStorage.userId
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}/request_connection`,configObj)
    .then(res => res.json())
    .then(json => {
      fetchUser()
    })
    .catch(function(error) {
        alert("Error requesting connection.")
    })
  }
}