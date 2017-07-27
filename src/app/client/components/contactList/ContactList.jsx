import React from 'react';
import { Table } from 'react-bootstrap';

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
        { this.state.connectionError && <Error /> }
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

function Error() {
  return (
    <p className="error">An error occurred fetching contact list</p>
  );
}
