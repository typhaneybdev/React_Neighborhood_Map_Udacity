import React, { Component } from "react";
import "./App.css";
import { load_google_maps, load_places } from "./utils";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
//https://www.youtube.com/watch?v=5J6fs_BlVC0&feature=youtu.be ryan waite 10/16
//https://www.youtube.com/watch?v=Uw5Ij56RhME eman mohammed abd elsalam Zaghlul Streamed live on Jul 28, 2018
//https://developers.google.com/maps/documentation/javascript/tutorial

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }
  //load API data from methods in utils file
  componentDidMount() {
    let googleMapsPromise = load_google_maps();
    let placesPromise = load_places();

    //load google map and foursquare venues
    Promise.all([googleMapsPromise, placesPromise]).then(values => {
      let google = values[0];
      this.venues = values[1].response.venues;
      console.log(values);

      this.google = google;
      this.markers = [];
      this.infowindow = new google.maps.InfoWindow();
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 9,
        scrollwheel: true,
        center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }
      });

      //loop through venues to create map markers with properties to allow filtering 
      this.venues.forEach(venue => {
        let marker = new google.maps.Marker({
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          animation: google.maps.Animation.DROP
        });
      

        //set marker animation 
        marker.addListener("click", () => {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
          setTimeout(() => {
            marker.setAnimation(null);
          }, 1500);
        });
        google.maps.event.addListener(marker, "click", () => {
          this.infowindow.setContent(marker.name);
          this.map.setCenter(marker.position);
          this.infowindow.open(this.map, marker);
          this.map.panBy(0, -125);
        });

        this.markers.push(marker);
      });

      this.setState({ filteredVenues: this.venues });
    })

    //alerts user if data is not retrieved from API
    .catch(error => {
      console.log(error);
      alert('Error loading page...');
    })

  }
  // filter venues based on user input, add and remove list items and markers based on query
  filterVenues = (query) => {
    let f = this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) === true
        ? marker.setVisible(true)
        : marker.setVisible(false);
    });
    this.setState({ filteredVenues: f, query });
  }

  //set info window and marker animation 
  listItemClick = (venue) => {
    let marker = this.markers.filter(m => m.id === venue.id)[0];
    this.infowindow.setContent(marker.name);
    this.map.setCenter(marker.position);
    this.infowindow.open(this.map, marker);
    this.map.panBy(0, -125);
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(this.google.maps.Animation.BOUNCE);
    }
    setTimeout(() => {
      marker.setAnimation(null);
    }, 1500);
    
  }


  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div id="mobileContainer">
        <div id="map" role="application" aria-label="map">
        </div>
        <Sidebar 
        filterVenues={this.filterVenues} 
        filteredVenues={this.state.filteredVenues} 
        listItemClick={this.listItemClick}/>
        </div>
      </div>
    );
  }
}

export default App;
