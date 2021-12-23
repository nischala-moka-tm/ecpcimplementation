import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import LeftNavigation from "../components/LeftNavigation/js/LeftNavigation";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { render, fireEvent } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });
const onClickTab = (childPath) => {
  console.log("path");
};
const path = "/dashboard-admin";
it("Rendering Left Navigation", () => {
  const wrapper = mount(<LeftNavigation path={path} onClickTab={onClickTab} />);
  expect(wrapper.find(".flex-column")).toBeDefined();
  for (var index; index <= wrapper.find(".nav-link").length; index++) {
    wrapper.find(".nav-link").at(index).simulate("click");
  }
});

it("Rendering Left Navigation", () => {
  const wrapper = render(
    <LeftNavigation path={path} onClickTab={onClickTab} />
  );
  fireEvent.click(wrapper.getByText("Dashboard"));
  fireEvent.click(wrapper.getByText("Manage Permissions/Preferences"));
});

it("renders correctly when there are no items", () => {
  const tree = renderer
    .create(<LeftNavigation path={path} onClickTab={onClickTab} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe("renders <LeftNavigation />", () => {
  it("should pass mount snapshot test", async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<LeftNavigation path={path} onClickTab={onClickTab} />);
    });
    expect(wrapper).toMatchSnapshot();
  });
});
