import React from 'react';
import { shallow } from 'enzyme';
import { FormControl, Button } from 'react-bootstrap';
import Message from './Message';

jest.mock('utils/api', () => (
  {
    sendEmail: jest.fn((args) => {
      return new Promise((resolve, reject) => {
        if (args === 'email') {
          resolve();
        } else {
          reject();
        }
      });
    })
  }
));

describe("Message Component", () => {
  test("should render component", () => {
    const component = shallow(<Message />);
    expect(component.debug()).toMatchSnapshot();
  });

  test("should store message when changed in form", () => {
    const component = shallow(<Message />);
    expect(component.state().message).toBeUndefined();
    component.find(FormControl).simulate('change', {target: { value: 'my value' }});
    expect(component.state().message).toBe('my value');
  });

  test.skip("should send an email when button is clicked", () => {
    const mockEventFn = jest.fn();
    const component = shallow(<Message />);
    component.find(FormControl).simulate('change', {target: { value: 'email' }});
    component.find(Button).simulate('submit', { preventDefault: mockEventFn });
    expect(mockEventFn).toHaveBeenCalledTimes(1);
    expect(component.state()).toEqual({ connectionError: undefined, message: undefined });
  });

});
