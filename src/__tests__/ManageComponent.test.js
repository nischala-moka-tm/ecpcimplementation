import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ManageComponent from "../components/ManageComponent/js/ManageComponent";
Enzyme.configure({ adapter: new Adapter() });

it("Searching rendering id correctly", async () => {
	const brand = "Toyota";
	const type = "dashboard";
	const wrapper = mount(<ManageComponent brand={brand} type={type} />);
	expect(wrapper.find("manage-permission")).toBeDefined();
	expect(wrapper.find("status-codes")).toBeDefined();
});
