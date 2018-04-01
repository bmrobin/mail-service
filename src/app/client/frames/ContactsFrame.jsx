import React from 'react';
import { Col } from 'react-bootstrap';
import Navbar from 'components/navbar/Navbar';
import ContactList from 'components/contactList/ContactList';
import NewContact from 'components/newContact/NewContact';

export default class ContactsFrame extends React.Component {

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
      <Col xs={12} md={7}>
        <Navbar
          contactListSelected={this.state.displayContactList}
          newContactSelected={this.state.displayNewContact}
          navSelectAction={this.navSelect} />
        {this.state.displayContactList && <ContactList />}
        {this.state.displayNewContact && <NewContact />}
      </Col>
    );
  }
}

