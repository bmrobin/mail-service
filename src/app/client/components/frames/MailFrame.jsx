import React from 'react';
import { Col } from 'react-bootstrap';
import Message from '../message/Message';

export default class MailFrame extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Col xs={12} md={7}>
        <Message />
      </Col>
    );
  }
}

