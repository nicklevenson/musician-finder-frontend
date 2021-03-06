import api from "../requests";
export const setUser = (user) => ({ type: "SET_USER", payload: user });
export const setRecommendedUsers = (users) => ({
  type: "SET_RECOMMENDED_USERS",
  payload: users,
});
export const setIncomingRequests = (users) => ({
  type: "SET_INCOMING_REQUESTS",
  payload: users,
});
export const setConnections = (users) => ({
  type: "SET_CONNECTIONS",
  payload: users,
});
export const setAllUsers = (users) => ({
  type: "SET_ALL_USERS",
  payload: users,
});
export const setUserChatrooms = (chatrooms) => ({
  type: "SET_USER_CHATROOMS",
  payload: chatrooms,
});
export const setUserNotifications = (notifications) => ({
  type: "SET_USER_NOTIFICATIONS",
  payload: notifications,
});

export const fetchAllUsers = () => {
  return async (dispatch) => {
    let response = await api.getAllUsers();
    if (response) dispatch(setAllUsers(response));
  };
};

export const fetchUser = () => {
  return (dispatch) => {
    const userId = sessionStorage.userId;
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(setUser(json));
        dispatch(fetchConnections(userId));
        dispatch(fetchIncomingRequests());
      })
      .catch(function (error) {
        console.warn("error getting user: \n", error);
      });
  };
};

export const updateUser = (user_info) => {
  return (dispatch) => {
    const userId = sessionStorage.userId;
    const configObj = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${userId}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user_info }),
    };
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, configObj)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchUser());
      })
      .catch((error) => {
        console.warn("Error requesting connection: \n", error);
      });
  };
};

export const fetchUserRecs = (filterParamsObject) => {
  return (dispatch) => {
    const userId = sessionStorage.userId;

    const configObj = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filterParamsObject: filterParamsObject || { noFilter: true },
      }),
    };
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/recommended_users`,
      configObj
    )
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          dispatch(setRecommendedUsers(json));
        }
      })
      .catch(function (error) {
        console.warn("error getting user recommendations: \n", error);
      });
  };
};
export const fetchConnections = (userId) => {
  return (dispatch) => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/connected_users`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch(setConnections(json));
      })
      .catch(function (error) {
        console.warn("error getting user connections: \n", error);
      });
  };
};

export const fetchIncomingRequests = () => {
  return (dispatch) => {
    const userId = sessionStorage.userId;
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/incoming_requests`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch(setIncomingRequests(json));
      })
      .catch((error) => {
        console.warn("error getting user: \n", error);
      });
  };
};

export const requestConnection = (requested_id) => {
  return (dispatch) => {
    const configObj = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requested_id: requested_id }),
    };
    const userId = sessionStorage.userId;
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/request_connection`,
      configObj
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchUser());
      })
      .catch((error) => {
        console.warn("Error requesting connection: \n", error);
      });
  };
};

export const acceptConnection = (requesting_user_id) => {
  return (dispatch) => {
    const configObj = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requesting_user_id: requesting_user_id }),
    };
    const userId = sessionStorage.userId;
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/accept_connection`,
      configObj
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchUser());
      })
      .catch((error) => {
        console.warn("Error requesting connection: \n", error);
      });
  };
};

export const rejectConnection = (requesting_user_id) => {
  return (dispatch) => {
    const configObj = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requesting_user_id: requesting_user_id }),
    };
    const userId = sessionStorage.userId;
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/reject_connection`,
      configObj
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchUser());
      })
      .catch((error) => {
        console.warn("error requesting connection: \n", error);
      });
  };
};

export const fetchUserNotifications = () => {
  return (dispatch) => {
    const userId = sessionStorage.userId;
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/get_user_notifications`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch(setUserNotifications(json));
      })
      .catch(function (error) {
        console.warn("error getting notifications: \n", error);
      });
  };
};

export const fetchUserChatrooms = () => {
  return (dispatch) => {
    const userId = sessionStorage.userId;
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/get_user_chatrooms`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch(setUserChatrooms(json));
      })
      .catch((error) => {
        console.warn("Error getting chatrooms: \n", error);
      });
  };
};

export const sendMessage = (messageObject) => {
  return (dispatch) => {
    const configObj = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageObject }),
    };
    fetch(`${process.env.REACT_APP_BACKEND_URL}/messages`, configObj)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchUserChatrooms());
      })
      .catch((error) => {
        console.warn("Error sending message: \n", error);
      });
  };
};

export const makeMessageRead = (chatroom_id) => {
  return (dispatch) => {
    const configObj = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatroom_id: chatroom_id }),
    };
    fetch(`${process.env.REACT_APP_BACKEND_URL}/messages/make_read`, configObj)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchUserChatrooms());
      })
      .catch((error) => {
        console.warn("Error making message read: \n", error);
      });
  };
};
