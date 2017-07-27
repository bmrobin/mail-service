import React from 'react';
import { Jumbotron, Grid, Row, Col, Nav, NavItem } from 'react-bootstrap';
import img from './mail_icon.png';
import './header.css';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contactListSelected: true,
      newContactSelected: false
    };
  }

  componentDidMount() {
    fetch('http://localhost:9000/users', {
      method: 'GET',
      mode: 'cors'
    }).then((result) => {
        return result.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  navSelected(event) {
    switch (event) {
      case 'list':
        this.setState({ contactListSelected: true, newContactSelected: false });
        break;
      case 'new':
        this.setState({ newContactSelected: true, contactListSelected: false });
        break;
    }
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <img src={img} className="logo"></img>
          <h1 className="header-label">mail-service&nbsp;|<span className="description">&nbsp;&nbsp;A mail service for you</span></h1>
        </Jumbotron>

        <Grid>
          <Row>
            <Col xs={12} md={8}>
              <Nav bsStyle="tabs" onSelect={(event) => this.navSelected(event)}>
                <NavItem eventKey="list" active={this.state.contactListSelected}>Contact List</NavItem>
                <NavItem eventKey="new" active={this.state.newContactSelected}>New Contact</NavItem>
              </Nav>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Header;
