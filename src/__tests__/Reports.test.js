import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ReportsPermissionPreference from "../components/Reports/js/Reports-PermissionAndPreference";
import ReportsAudit from "../components/Reports/js/Reports-Audit";

Enzyme.configure({ adapter: new Adapter() });
const brand = "Toyota";
const type = "dashboard";
const permissionId = "report-permpref";
const filterId = "report-filters";
it("Searching rendering reports-permission and preferences correctly", () => {
  const wrapper = mount(
    <ReportsPermissionPreference brand={brand} type={type} />
  );
  expect(wrapper.find(permissionId)).toBeDefined();
  expect(wrapper.find(filterId)).toBeDefined();
});
it("Searching rendering reports- audit trail correctly", () => {
  const wrapper = mount(<ReportsAudit brand={brand} type={type} />);
  expect(wrapper.find(permissionId)).toBeDefined();
  expect(wrapper.find(filterId)).toBeDefined();
});
