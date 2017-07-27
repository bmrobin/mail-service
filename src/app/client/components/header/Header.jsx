import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import img from './mail_icon.png';
import './header.css';

class Header extends React.Component {

  render() {
    return (
      <div>
        <Jumbotron>
          <img src={img} className="logo"></img>
          <h1 className="header-label">mail-service&nbsp;|<span className="description">&nbsp;&nbsp;A mail service for you</span></h1>
        </Jumbotron>
      </div>
    );
  }
}

export default Header;
