import React from "react";
import Enzyme from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import AddPreferenceLevels from "../components/AddPreferenceLevels/js/AddPreferenceLevels";

Enzyme.configure({ adapter: new Adapter() });

const categorydata = {
	brand: "Toyota",
	startDate: "11/23/2021 02:32:00 AM",
	endDate: "01/04/2022 02:32:00 AM",
	description: "for Preferences",
	comments: [
		{
			user: "abc@xyz.com",
			comment: "Preferences",
			time: "11/23/2021 02:02:51 PM",
		},
	],
	status: "Pending Approval",
	rank: 1,
	level: 2,
	createdDate: "11/30/2021 02:10:45 AM",
	modifiedDate: "11/30/2021 02:10:45 AM",
	createdBy: "user",
	modifiedBy: "",
	id: "CATEGORY#Marketing#Preferences",
	subCategoryName: "Interests",
};

it("Edit Preference Section", () => {
	const wrapper = render(
		<AddPreferenceLevels
			show={true}
			onClose={() => {
				console.log("Closed");
			}}
			category={categorydata}
			optionType={"Edit"}
			brand={"Toyota"}
			notify={() => {
				console.log("Notify");
			}}
			level={2}
		/>
	);
	expect(wrapper.getByPlaceholderText("Catergory Name*").value).toBe(
		categorydata.subCategoryName
	);
	expect(wrapper.getByPlaceholderText("Add the Description here..").value).toBe(
		categorydata.description
	);
	expect(wrapper.getByPlaceholderText("Start date & Time*").type).toBe(
		"datetime-local"
	);
	expect(wrapper.getByPlaceholderText("End Date & Time*").type).toBe(
		"datetime-local"
	);
	fireEvent.click(wrapper.getByText("Submit for Approval"));
});


it("Add Preference Section", () => {
	const wrapper = render(
		<AddPreferenceLevels
			show={true}
			onClose={() => {
				console.log("Closed");
			}}
			category={categorydata}
			optionType={"Add"}
			brand={"Toyota"}
			notify={() => {
				console.log("Notify");
			}}
			level={2}
		/>
	);
	expect(wrapper.getByPlaceholderText("Catergory Name*").value).toBe(
		""
	);
	expect(wrapper.getByPlaceholderText("Add the Description here..").value).toBe(
		""
	);
	expect(wrapper.getByPlaceholderText("Start date & Time*").type).toBe(
		"text"
	);
	expect(wrapper.getByPlaceholderText("End Date & Time*").type).toBe(
		"text"
	);
	fireEvent.click(wrapper.getByText("Save for Later"));
});
