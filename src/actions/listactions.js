export const setInstruments = (instruments) => ({
  type: "SET_INSTRUMENTS",
  payload: instruments,
});

export const setGenres = (genres) => ({
  type: "SET_GENRES",
  payload: genres,
});

export const setCities = (cities) => ({
  type: "SET_CITIES",
  payload: cities,
});

export const fetchAllLists = () => {
  return (dispatch) => {
    dispatch(fetchInstruments());
    dispatch(fetchGenres());
    dispatch(fetchCities());
  };
};

export const fetchInstruments = () => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/lists/get-instruments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(setInstruments(json));
      })
      .catch(function (error) {
        console.log("Error getting Instruments.");
      });
  };
};

export const fetchGenres = () => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/lists/get-genres`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(setGenres(json));
      })
      .catch(function (error) {
        console.log("Error getting genres.");
      });
  };
};

export const fetchCities = () => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/lists/get-cities`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(setCities(json));
      })
      .catch(function (error) {
        console.log("Error getting Instruments.");
      });
  };
};
