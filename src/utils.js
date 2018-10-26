import axios from "axios";
//https://www.youtube.com/watch?v=5J6fs_BlVC0&feature=youtu.be Ryan Waite Walk through 10/16
//Ryan Waite wrote and recommended to use the following code to load google map,
//link to repo https://github.com/ryanwaite28/script-store/blob/master/js/react_resolve_google_maps.js
//https://www.youtube.com/watch?v=dAhMIF0fNpo Elharoney walk through 8/17/18 foursquare Api
//https://github.com/axios/axios promise based http client for browser and node.js
//https://developer.foursquare.com/ 3rd party location API
export function load_google_maps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    };
    // Now, Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = "AIzaSyDzN0ZaZRCzBs1btZwIGAOeutQ2o9d94bw";
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}

export function load_places() {
  const endPoint = "https://api.foursquare.com/v2/venues/explore?";
  const parameters = {
    client_id: "TZXA1I2LTTCSDSCHY0K31HPIBLDZ3GJCFZ1GIX2HWWHYL3SI",
    client_secret: "LDTK5GXKLVQT4AGOKPIRJIRDTQGRFNYWJBKTMGW0ZYTQQ4UP",
    query: "outdoors",
    near: "Sedona, AZ",
    v: "20182410"
  };

  axios
    .get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log("ERROR!! " + error);
    });
}
