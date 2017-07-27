import React from 'react';
import { Table } from 'react-bootstrap';

export default class ContactList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
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
      });
  }

  render() {
    return (
      <div>
        {this.state.contactList && <Contacts contacts={this.state.contactList} />}
      </div>
    );
  }
}

function Contacts(props) {
  const contacts = props.contacts;
  if (contacts.length === 0) {
    return <p>No contacts</p>;
  }
  const contactList = contacts.map((contact) => {
    return (
      <tr key={contact.$loki}>
        <td>{contact.emailAddress}</td>
      </tr>
    );
  });
  return (
    <Table bordered striped responsive>
      <thead>
        <tr>
          <td>Email Address</td>
        </tr>
      </thead>
      <tbody>{contactList}</tbody>
    </Table>
  );
}
