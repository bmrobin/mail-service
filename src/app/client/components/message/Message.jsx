import React  from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';
import Error from '../error/Error';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendEmail() {
    event.preventDefault();
    console.log("Sending email to contact list...");
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch('http://localhost:9000/mail', {
      body: JSON.stringify(this.state),
      method: 'POST',
      mode: 'cors',
      headers: headers
    }).then(() => {
      console.log('success!');
    }).catch(() => {
      console.error('error!');
    });
  }

  handler(event) {
    this.setState({
      message: event.target.value
    });
  }

  render() {
    return (
      <Form horizontal onSubmit={(e) => this.sendEmail(e)}>

        <FormGroup>
          <Col sm={2} componentClass={ControlLabel}>
            Message
                  </Col>
          <Col sm={10}>
            <FormControl componentClass="textarea" id="message-id" onChange={(e) => this.handler(e)} />
          </Col>
        </FormGroup>

        {this.state.connectionError && <Error message="An error occurred while saving. Check connection to server." />}

        <Button type="submit" className="save-btn" id="save-id">Send</Button>

      </Form>
    );
  }
}
