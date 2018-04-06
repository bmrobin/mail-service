import React from 'react';
import renderer from 'react-test-renderer';
import Error from './Error';

describe("Error Component", () => {
  
  test("should render component", () => {
    const component = renderer.create(<Error message={"an error message"} />);
    expect(component).toMatchSnapshot();
  });

});
