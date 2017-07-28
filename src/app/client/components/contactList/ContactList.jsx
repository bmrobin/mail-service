import React from 'react';
import { Table } from 'react-bootstrap';
import Error from '../error/Error';
import Contact from './Contact';

export default class ContactList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      connectionError: false
    };
  }

  componentWillMount() {
    fetch('http://localhost:9000/users', {
      method: 'GET',
      mode: 'cors'
    }).then(result => result.json())
      .then((contacts) => {
        this.setState({contactList: contacts});
      })
      .catch((error) => {
        console.error(error);
        this.setState({connectionError: true});
      });
  }

  render() {
    return (
      <div>
        {this.state.contactList && <Contacts contacts={this.state.contactList} />}
        { this.state.connectionError &&
          <Error message="An error occurred fetching contact list" />
        }
      </div>      
    );
  }
}

function deleteContact(contact) {
  console.log('deleting user ', contact);
}

function Contacts(props) {
  const contacts = props.contacts;
  if (contacts.length === 0) {
    return <p className="error">No contacts</p>;
  }
  const contactList = contacts.map((contact) => {
    return (
      <Contact key={contact.$loki} contact={contact} delete={deleteContact} />
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
