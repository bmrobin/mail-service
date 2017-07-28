import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import img from './mail_icon.png';
import github from './github-octocat.png';
import './header.css';

class Header extends React.Component {

  render() {
    return (
      <div>
        <Jumbotron>
          <img src={img} className="logo"></img>
          <h1 className="header-label">mail-service&nbsp;|<span className="description">&nbsp;&nbsp;A mail service for you</span></h1>
          <div className="github-logo">
            <a href="https://github.com/bmrobin/mail-service/"
               rel="noopener noreferrer"
               target="_blank">
               <img src={github}></img>
            </a>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default Header;
