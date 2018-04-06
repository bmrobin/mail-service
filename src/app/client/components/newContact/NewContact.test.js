import React from 'react';
import { shallow } from 'enzyme';
import { FormControl, Form } from 'react-bootstrap';
import NewContact from './NewContact';

jest.mock('utils/api', () => (
  {
    saveUser: jest.fn((args) => {
      return new Promise((resolve) => {
        resolve();
      });
    })
  }
));

describe("NewContact Component", () => {

  test("should render component", () => {
    const component = shallow(<NewContact />);
    expect(component.debug()).toMatchSnapshot();
  });

  test("should store email address when changed in form", () => {
    const component = shallow(<NewContact />);
    component.find(FormControl).simulate('change', { target: { value: 'bmrobin@mail.com' }});
    expect(component.state('emailAddress')).toBe('bmrobin@mail.com');
    expect(component.state('connectionError')).toBe(false);
  });

  test("should create new contact when form is submitted", () => {
    const component = shallow(<NewContact />);
    const mockEventFn = jest.fn();
    component.setState({ connectionError: true });
    component.find(FormControl).simulate('change', { target: { value: 'bmrobin@mail.com' }});
    component.find(Form).simulate('submit', { preventDefault : mockEventFn });
    expect(mockEventFn).toHaveBeenCalledTimes(1);
    expect(component.state('connectionError')).toBe(false);
  });

});
