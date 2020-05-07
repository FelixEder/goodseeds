const functions = require('firebase-functions');
const fetch = require("node-fetch");

exports.authTrefleApi = functions.https.onCall((data, context) => {
  let url = 'https://trefle.io/api/auth/claim?token=' + functions.config().trefle.api_key
          + '&origin=https://goodseeds.web.app';
  return fetch(url, {
    "method": "POST"
  })
  .then(handleHTTPError)
  .then(response => response.json())
  .then((response) => {
    console.log("Successfully requested a JWT token");
    return response;
  })
  .catch(console.error);
});

exports.authTrefleApiLocalhost = functions.https.onCall((data, context) => {
  let url = 'https://trefle.io/api/auth/claim?token=' + functions.config().trefle.api_key
          + '&origin=http://localhost:3000';
  return fetch(url, {
    "method": "POST"
  })
  .then(handleHTTPError)
  .then(response => response.json())
  .then((response) => {
    console.log("Successfully requested a JWT token");
    return response;
  })
  .catch(console.error);
});

function handleHTTPError(response) {
  if (response.ok)
    return response;
  throw Error(response.statusText);
}
