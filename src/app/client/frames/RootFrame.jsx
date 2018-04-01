import React from 'react';
import { Col, Nav, NavItem } from 'react-bootstrap';
import ContactsFrame from 'frames/ContactsFrame';
import MailFrame from 'frames/MailFrame';
import 'frames/frames.css';

export default class RootFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayContactsFrame: true,
      displayMailFrame: false
    };
    this.frameSelect = this.frameSelect.bind(this);
  }

  frameSelect(frame) {
    switch(frame) {
      case 'contacts':
        this.setState({displayContactsFrame: true, displayMailFrame: false});
        break;
      case 'mail':
        this.setState({displayMailFrame: true, displayContactsFrame: false});
        break;
    }
  }

  render() {
    return (
      <div>

        <Col sm={3} md={2} className="sidebar">
          <Nav bsStyle="pills" stacked onSelect={this.frameSelect}>
            <NavItem eventKey="contacts" active={this.state.displayContactsFrame}>Contacts</NavItem>
            <NavItem eventKey="mail" active={this.state.displayMailFrame}>Mail</NavItem>
          </Nav>
        </Col>

        { this.state.displayContactsFrame && <ContactsFrame /> }
        { this.state.displayMailFrame && <MailFrame /> }

      </div>
    );
  }
}
