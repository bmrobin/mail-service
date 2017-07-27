import React from 'react';

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
  const contactList = contacts.map((contact) => {
    return <li key={contact.$loki}>{contact.emailAddress}</li>
  });
  return (
    <ul>{contactList}</ul>
  );
}
