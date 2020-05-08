import getJWTToken from './trefleAuth';
// import getJWTTokenLocalhost from './trefleAuth';
const ENDPOINT = 'https://trefle.io/api/';

function searchPlants(freeText, completeData = false) {
    let completeDataQuery = "";
    if (completeData) {
      completeDataQuery = "&complete_data=true";
    }
    return checkToken().then(() => {
      return createGetPromise(ENDPOINT + "plants?q=" + freeText + completeDataQuery + "&token=" + JSON.parse(localStorage.getItem("token")).token)
            .then(handleHTTPError)
            .then(response => response.json())
            .catch(err => console.error("API responded with " + err));
    });
}

function getPlantDetails(id) {
    return checkToken().then(() => {
      return createGetPromise(ENDPOINT + "plants/" + id + "?token=" + JSON.parse(localStorage.getItem("token")).token)
            .then(handleHTTPError)
            .then(response => response.json())
            .catch(err => console.error("API responded with " + err));
    });
}

// ------------Utility functions---------------

function handleHTTPError(response) {
    if (response.ok) {
        return response;
    } else if (response.status === 401) {
        getJWTToken().then(() => { return "invalidToken" });
        // getJWTTokenLocalhost().then(() => { return "invalidToken" });
    } else {
        throw Error(response.statusText);
    }
}

async function checkToken() {
    let token = localStorage.getItem("token");
    if (!token || Date.now() >= JSON.parse(token).expiration * 1000) {
        await getJWTToken();
        // await getJWTTokenLocalhost();
        return Promise.resolve();
    } else {
        return Promise.resolve();
    }
}

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
