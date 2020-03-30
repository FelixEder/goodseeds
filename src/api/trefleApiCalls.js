import getJWTToken from './trefleAuth';
const ENDPOINT = 'https://trefle.io/api/';

function searchPlants(freeText) {
    //return checkToken().then(() => {
    return createGetPromise(ENDPOINT + "plants?q=" + freeText + "&token=" + JSON.parse(localStorage.getItem("token")).token)
            .then(handleHTTPError)
            .then(response => response.json())
            .catch(console.error);
    //});
}

function getPlantDetails(id) {
    //return checkToken().then(() => {
    return createGetPromise(ENDPOINT + "plants/" + id + "?token=" + JSON.parse(localStorage.getItem("token")).token)
            .then(handleHTTPError)
            .then(response => response.json())
            .catch(console.error);
    //});
}

// ------------Utility functions---------------

function handleHTTPError(response) {
    if (response.ok) {
        return response;
    } else if (response.status == 401) {
        getJWTToken().then(() => { return "invalidToken" });
    } else {
        throw Error(response.statusText);
    }
}

// async function checkToken() {
//     let token = localStorage.getItem("token");
//     if (!token) {
//         await getJWTToken();
//         return Promise.resolve();
//     } else {
//         return Promise.resolve();
//     }
// }

function createGetPromise(stringRequest) {
    const fetchCall = (stringRequest) => {
      return fetch(stringRequest, {
          "method": "GET",
          // Would be better if we could use a bearer token, but this doesn't seem to work 
          //"headers": {
          //    'Authorization': 'Bearer ' + localStorage.getItem("token").token,
        //  }
      });
    };
    const response = fetchCall(stringRequest);
    if (response === "invalidToken") {
      return fetchCall(stringRequest);
    } else {
      return response;
    }
}

export { getPlantDetails, searchPlants };
