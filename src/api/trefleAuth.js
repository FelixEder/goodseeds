const firebase = require("firebase");

function getJWTToken() {
  var authTrefleApi = firebase.functions().httpsCallable('authTrefleApi');
  authTrefleApi().then(function(result) {
    localStorage.setItem('token', result);
  });
}

export default getJWTToken;
