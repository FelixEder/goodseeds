import {API_KEY, ENDPOINT} from 'TrefleConfig';

exports.authTrefleApi = functions.https.onCall((data, context) => {
  let url = ENDPOINT + 'auth/claim?origin=https://goodseeds.web.app/'
  return fetch(url, {
    "method": "POST",
    "headers": {
      'X-Mashape-Key': API_KEY
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
