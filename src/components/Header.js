import React, { Component } from "react";


class Header extends Component {

    //TODO implement onClick event for burger menu to toggle sidebar on mobile
    //http://www.hackingwithreact.com/read/1/9/handling-events-with-jsx-onclick
   /* buttonClicked() {
       console.log('Button was clicked!')
   }*/
    render() {
        return (
            <header className="topNav">
            <div className="headText">
              <h2 className="headerText" tabIndex={0}>Sedona, AZ Hiking Trails</h2>
            </div>
              <div className="burger">
                  <button className="toggle"onClick={this.buttonClicked}><i className="fas fa-bars"></i></button>
              </div>
            </header>
          );
    }
}


export default Header;