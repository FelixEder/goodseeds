import getJWTToken from './trefleAuth';
const ENDPOINT = 'https://trefle.io/api/';

function handleHTTPError(response) {
    if (response.ok) {
        return response;
    } else if (response.status == 401) {
        getJWTToken().then(() => { return "invalidToken" });
    } else {
        throw Error(response.statusText);
    }
}

function searchPlants(freeText) {
    return createGetPromise(ENDPOINT + "plants?q=" + freeText)
        .then(handleHTTPError)
        .then(response => response.json())
        .catch(console.error);
}

// function getDishDetails(id) {
//     return createGetPromise(ENDPOINT + "recipes/" + id + "/information")
//         .then(handleHTTPError)
//         .then(response => response.json())
//         .catch(console.error);
// }

function createGetPromise(stringRequest) {
    const fetchCall = (stringRequest) => {
      return fetch(stringRequest, {
          "method": "GET",
          "headers": {
              'Authorization': 'Bearer ' + localStorage.getItem("token").token,
              'Access-Control-Allow-Origin': '*'
          }
      });
    };
    const response = fetchCall(stringRequest);
    if (response === "invalidToken") {
      return fetchCall(stringRequest);
    } else {
      return response;
    }
}

export default searchPlants;
