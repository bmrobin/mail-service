import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Nav } from 'react-bootstrap';
import Navbar from './Navbar';

describe("Navbar Component", () => {

  test("should render component", () => {
    const component = shallow(<Navbar contactListSelected={false} newContactSelected={false} />);
    expect(component.debug()).toMatchSnapshot();
  });

  test("should invoke nav callback when nav selected", () => {
    const mockSelectFn = jest.fn();
    const component = shallow(<Navbar navSelectAction={mockSelectFn} contactListSelected={true} newContactSelected={false} />);
    const arg = {event: 'obj' };
    component.find(Nav).simulate('select', arg);
    expect(mockSelectFn).toHaveBeenCalledWith(arg)
  });

  test("should display contact list when selected", () => {
    const component = renderer.create(<Navbar contactListSelected={true} newContactSelected={false} />).toJSON();
    expect(component).toMatchSnapshot();
  });
  
  test("should display new contact when selected", () => {
    const component = renderer.create(<Navbar contactListSelected={false} newContactSelected={true} />).toJSON();
    expect(component).toMatchSnapshot();
  });

});
