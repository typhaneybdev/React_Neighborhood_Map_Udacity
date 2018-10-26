import React, { Component } from "react";
import "./App.css";

import { 
  load_google_maps, 
  load_places 
} from "./utils"

//https://www.youtube.com/watch?v=Uw5Ij56RhME eman mohammed abd elsalam Zaghlul Streamed live on Jul 28, 2018
//https://developers.google.com/maps/documentation/javascript/tutorial
class App extends Component {
  componentDidMount() {
    let googleMapsPromise = load_google_maps();
    let placesPromise = load_places();

    Promise.all([googleMapsPromise, placesPromise]).then(values => {
      let google = values[0];

      this.google = google;
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 9,
        scrollwheel: true,
        center: { lat: 34.86974, lng: -111.76099 }
      });
    });
  }
  render() {
    return (
      <div id="map">
      </div>
    );
  }
}

export default App;
