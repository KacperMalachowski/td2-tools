import React from "react";
import renderer from "react-test-renderer";

import Home from '../../src/pages/index';

describe('Home component', () => {
  it("renders correectly", () => {
    const tree = renderer
      .create(<Home />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })
})