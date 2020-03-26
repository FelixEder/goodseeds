const functions = require('firebase-functions');

exports.authTrefleApi = functions.https.onCall((data, context) => {
  let url = 'https://trefle.io/api/auth/claim?token=<your-token>&origin=https://goodseeds.web.app/'
  return fetch(url, {
    "method": "POST",
    "headers": {
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then(handleHTTPError)
  .then(response => response.json())
  .then((response) => {
    console.log("Successfully requested a JWT token");
    return {'token': response.token};
  })
  .catch(console.error);
});

function handleHTTPError(response) {
  if (response.ok)
    return response;
  throw Error(response.statusText);
}
