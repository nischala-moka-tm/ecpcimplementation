import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });
import { act } from "react-dom/test-utils";

import DashboardComponent from "../components/DashboardComponent/js/DashboardComponent";

it("renders correctly when there are no items", () => {
  const tree = renderer
    .create(<DashboardComponent brand="Toyota" type="dashboard" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe("renders <DashboardComponent />", () => {
  it("should pass mount snapshot test", async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<DashboardComponent brand="Toyota" type="dashboard" />);
    });
    expect(wrapper).toMatchSnapshot();
  });
});
