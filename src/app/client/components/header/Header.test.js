import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';

describe("Header Component", () => {

  test("should render component", () => {
    const component = renderer.create(<Header />).toJSON();
    expect(component).toMatchSnapshot();
  });

});
