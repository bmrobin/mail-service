import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-bootstrap';
import Contact from './Contact';

describe("Contact Component", () => {

  test("should render component", () => {
    const contact = {
      emailAddress: 'bmrobin@mail.com'
    };
    const component = shallow(<Contact contact={contact} />);
    expect(component.debug()).toMatchSnapshot();
  });

  test("should invoke delete callback when clicked", () => {
    const contact = {
      emailAddress: 'bmrobin@mail.com'
    };
    const mockDeleteFn = jest.fn();
    const component = shallow(<Contact contact={contact} delete={mockDeleteFn} />);
    component.find(Button).simulate('click');
    expect(mockDeleteFn).toHaveBeenCalledWith(contact);
  });

});
