import React from 'react';
import { Table } from 'react-bootstrap';
import Error from 'components/error/Error';
import Contact from './Contact';

export default class ContactList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      connectionError: false
    };

    // bind 'this' context to instance of this class so callback can use getContacts()
    this.deleteContact = this.deleteContact.bind(this);
  }

  componentWillMount() {
    this.getContacts();
  }

  getContacts() {
    fetch('http://localhost:9000/users', {
      method: 'GET',
      mode: 'cors'
    }).then(result => result.json())
      .then((contacts) => {
        this.setState({ contactList: contacts });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ connectionError: true });
      });
  }
  
  deleteContact(contact) {
    fetch('http://localhost:9000/users/' + contact.emailAddress, {
      method: 'DELETE',
      mode: 'cors'
    }).then(() => this.getContacts());
  }

  render() {
    return (
      <div>
        {this.state.contactList && <Contacts contacts={this.state.contactList} deleteContact={this.deleteContact} />}
        { this.state.connectionError &&
          <Error message="An error occurred fetching contact list. Check connection to server." />
        }
      </div>      
    );
  }
}

function Contacts(props) {
  const contacts = props.contacts;
  if (contacts.length === 0) {
    return <p className="error">No contacts</p>;
  }
  const contactList = contacts.map((contact) => {
    return (
      <Contact key={contact.$loki} contact={contact} delete={props.deleteContact} />
    );
  });
  return (
    <Table striped responsive hover>
      <thead>
        <tr>
          <td>Email Address</td>
        </tr>
      </thead>
      <tbody>{contactList}</tbody>
    </Table>
  );
}
