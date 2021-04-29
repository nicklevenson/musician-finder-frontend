const api = {
  REQUEST: (url, config) => {
    return new Promise((resolve) => {
      fetch(url, config)
        .then((res) => res.json())
        .then((json) => resolve(json))
        .catch((err) => {
          console.warn("Error with api request: \n", err);
          resolve(false);
        });
    });
  },
  getAllUsers: async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
      },
    };
    const url = `${process.env.REACT_APP_BACKEND_URL}/users`;
    let response = await api.REQUEST(url, config);
    return response;
  },
};

export default api;
