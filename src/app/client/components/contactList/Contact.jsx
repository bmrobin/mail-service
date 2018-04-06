import React from 'react';
import * as propTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './contact.css';

export default class Contact extends React.Component {

  constructor(props) {
    super(props);
  }

  deleteHandler() {
    this.props.delete(this.props.contact);
  }

  render() {
    return (
      <tr>
        <td>{this.props.contact.emailAddress}</td>
        <td className="action-column">
          <Button bsSize="sm" className="delete-button" onClick={() => this.deleteHandler()}>X</Button>
        </td>
      </tr>
    );
  }
}

Contact.propTypes = {
  delete: propTypes.func,
  contact: propTypes.shape({
    emailAddress: propTypes.string.isRequired
  }).isRequired
};
