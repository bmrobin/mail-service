import React from 'react';
import * as propTypes from 'prop-types';
import { Nav, NavItem } from 'react-bootstrap';

export default class Navbar extends React.Component {

  constructor(props) {
    super(props);
  }

  navSelected(event) {
    this.props.navSelectAction(event);
  }

  render() {
    return (
      <Nav bsStyle="tabs" onSelect={event => this.navSelected(event)}>
        <NavItem eventKey="list" active={this.props.contactListSelected}>Contact List</NavItem>
        <NavItem eventKey="new" active={this.props.newContactSelected}>New Contact</NavItem>
      </Nav>
    );
  }
}

Navbar.propTypes = {
  navSelectAction: propTypes.func,
  contactListSelected: propTypes.bool.isRequired,
  newContactSelected: propTypes.bool.isRequired
};
