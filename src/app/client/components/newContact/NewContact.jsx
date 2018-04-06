import React from 'react';
import { Form, FormControl, FormGroup, ControlLabel, Button, Col } from 'react-bootstrap';
import Error from 'components/error/Error';
import { saveUser } from 'utils/api';
import './newContact.css';

export default class NewContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionError: false
    };
  }

  saveEmail(event) {
    event.preventDefault();
    saveUser(this.state.emailAddress).then(() => {
      this.setState({ connectionError: false });
      this.resetForm();
    }).catch(() => {
      this.resetForm();
      this.setState({ connectionError: true });
    });
  }

  resetForm() {
    document.getElementById('email-id').value = '';
    document.getElementById('save-id').blur();
  }

  handler(event) {
    this.setState({
      emailAddress: event.target.value,
      connectionError: false
    });
  }

  render() {
    return (
      <Col xs={12} md={7} className="email-form">
        <Form horizontal onSubmit={(e) => this.saveEmail(e)}>

          <FormGroup>
            <Col sm={2} componentClass={ControlLabel}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="text" id="email-id" onChange={(e) => this.handler(e)} />
            </Col>
          </FormGroup>

          {this.state.connectionError && <Error message="An error occurred while saving. Check connection to server." />}

          <Button type="submit" className="save-btn" id="save-id">Save</Button>

        </Form>
      </Col>
    );
  }
}
