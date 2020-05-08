const firebase = require("firebase");

// async function getJWTToken() {
//   var authTrefleApi = firebase.functions().httpsCallable('authTrefleApi');
//   await authTrefleApi().then(function(result) {
//     localStorage.setItem('token', JSON.stringify(result.data));
//   });
// }

async function getJWTTokenLocalhost() {
  var authTrefleApi = firebase.functions().httpsCallable('authTrefleApiLocalhost');
  await authTrefleApi().then(function(result) {
    localStorage.setItem('token', JSON.stringify(result.data));
  });
}

//export default getJWTToken;
 export default getJWTTokenLocalhost;
