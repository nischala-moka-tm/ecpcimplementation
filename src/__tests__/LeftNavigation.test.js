import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import LeftNavigation from "../components/LeftNavigation/js/LeftNavigation";

Enzyme.configure({ adapter: new Adapter() });
const onClickTab = (childPath) => {
  console.log("path");
};
let path = "/dashboard-admin";
it("Rendering Left Navigation", () => {
  const wrapper = mount(<LeftNavigation path={path} onClickTab={onClickTab} />);
  expect(wrapper.find(".flex-column")).toBeDefined();
  for (var index; index <= wrapper.find(".nav-link").length; index++) {
    wrapper.find(".nav-link").at(index).simulate("click");
  }
});
