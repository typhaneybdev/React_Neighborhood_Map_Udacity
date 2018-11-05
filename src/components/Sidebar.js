import React, { Component } from "react";
//https://www.youtube.com/watch?v=5J6fs_BlVC0&feature=youtu.be ryan waite 10/16
//https://www.youtube.com/watch?v=Uw5Ij56RhME eman mohammed abd elsalam Zaghlul Streamed live on Jul 28, 2018
//https://developers.google.com/maps/documentation/javascript/tutorial

class Sidebar extends Component {
 //filterVenues method is called in app js when user inputs data, side bar venues and markers are filtered concurrently
  render() {
    return (
      <div id="sidebar">
        <input type="text" aria-label="Enter search text"
          className="venueInput"
          placeholder="Filter Locations"
          value={this.props.query}
          onChange={e => {
            this.props.filterVenues(e.target.value);
          }}
        />
        <br />
        <br />
        {this.props.filteredVenues &&
          this.props.filteredVenues.length > 0 &&
          this.props.filteredVenues.map((venue, index) => (
            <div role="button" aria-label="{venue.name}"
              key={index}
              className="venue-item" tabIndex={0} 
              onClick={() => {
                this.props.listItemClick(venue);
              }}
              onKeyDown={() => {
                this.props.listItemClick(venue);
              }}
            >
              {venue.name}
            </div>
          ))}
      </div>
    );
  }
}

export default Sidebar;
