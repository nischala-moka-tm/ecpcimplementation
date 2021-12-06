import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ManageComponent from "../components/ManageComponent/js/ManageComponent";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
Enzyme.configure({ adapter: new Adapter() });

const brand = "Toyota";
const type = "dashboard";

it("Searching rendering id correctly", async () => {
  const wrapper = mount(<ManageComponent brand={brand} type={type} />);
  expect(wrapper.find("manage-permission")).toBeDefined();
  expect(wrapper.find("status-codes")).toBeDefined();
});

it("renders correctly when there are no items", () => {
  const tree = renderer
    .create(<ManageComponent brand={brand} type={type} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe("renders <DashboardComponent />", () => {
  it("should pass mount snapshot test", async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<ManageComponent brand={brand} type={type} />);
    });
    expect(wrapper).toMatchSnapshot();
  });
});
