import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Navbar from '../navbar/Navbar';
import ContactList from '../contactList/ContactList';
import NewContact from '../newContact/NewContact';

export default class MainFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayContactList: true,
      displayNewContact: false
    };
    this.navSelect = this.navSelect.bind(this);
  }

  navSelect(event) {
    switch (event) {
      case 'list':
        this.setState({ displayContactList: true, displayNewContact: false });
        break;
      case 'new':
        this.setState({ displayNewContact: true, displayContactList: false });
        break;
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8}>
            <Navbar
              contactListSelected={this.state.displayContactList}
              newContactSelected={this.state.displayNewContact}
              navSelectAction={this.navSelect} />
            { this.state.displayContactList && <ContactList /> }
            { this.state.displayNewContact && <NewContact /> }
          </Col>
        </Row>
      </Grid>
    );
  }
}
