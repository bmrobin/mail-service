import React  from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';
import { sendEmail } from 'utils/api';
import Error from 'components/error/Error';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendEmail(event) {
    event.preventDefault();
    console.log("Sending email to contact list...", JSON.stringify(this.state));
    sendEmail(this.state.message).then(() => {
      console.log('success!');
      this.setState({ message: undefined });
      console.log(this.state);
    }).catch(() => {
      console.error('error!');
      this.setState({ connectionError: true });
    });
  }

  handler(event) {
    this.setState({
      message: event.target.value,
      connectionError: undefined
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


        <Button type="submit" 
                className="save-btn"
                id="save-id"
                onSubmit={(event) => this.sendEmail(event)}>
          Send
        </Button>

        {this.state.connectionError && <Error message="An error occurred while sending message." />}

      </Form>
    );
  }
}
