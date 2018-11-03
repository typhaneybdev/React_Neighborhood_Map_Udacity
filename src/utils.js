//https://www.youtube.com/watch?v=5J6fs_BlVC0&feature=youtu.be Ryan Waite Walk through 10/16
//Ryan Waite wrote and recommended to use the following code to load google map,
//link to repo https://github.com/ryanwaite28/script-store/blob/master/js/react_resolve_google_maps.js
//https://www.youtube.com/watch?v=dAhMIF0fNpo Elharoney walk through 8/17/18 foursquare Api
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

//load foursquare API
export function load_places() {
  let city = "Sedona, AZ";
  let query = "trail";
  var apiURL =
    "https://api.foursquare.com/v2/venues/search?client_id=TZXA1I2LTTCSDSCHY0K31HPIBLDZ3GJCFZ1GIX2HWWHYL3SI&client_secret=LDTK5GXKLVQT4AGOKPIRJIRDTQGRFNYWJBKTMGW0ZYTQQ4UP&v=20180323&limit=50&near=" +
    city +
    "&query=" +
    query +
    "";
  return fetch(apiURL).then(resp => resp.json());
}
