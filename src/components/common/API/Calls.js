import axios from "axios";

export const getCall = () => {
  axios
    .get("/user?ID=12345")
    .then(function (response) {
      // handle success
      return response;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
};
