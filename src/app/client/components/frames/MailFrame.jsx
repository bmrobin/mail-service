import React from 'react';
import { Button, Col, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Error from '../error/Error';

export default class MailFrame extends React.Component {

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
        <Form horizontal onSubmit={(e) => this.saveEmail(e)}>

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
      </Col>
    );
  }
}

