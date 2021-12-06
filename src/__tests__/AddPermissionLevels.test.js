import React from "react";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { render } from "@testing-library/react";
import AddPermissionLevels from "../components/AddPermissionLevels/js/AddPermissionLevels";

Enzyme.configure({ adapter: new Adapter() });

const sampledata = [
  {
    brand: "Toyota",
    startDate: "11/23/2021 02:32:00 AM",
    endDate: "01/04/2022 02:32:00 AM",
    description: "Vehicle Connected Service description added",
    comments: [
      {
        user: "abc@xyz.com",
        comment: "Vehicle Connected Services",
        time: "11/23/2021 02:02:51 PM",
      },
    ],
    status: "Live",
    rank: 1,
    level: 2,
    createdDate: "11/30/2021 02:10:45 AM",
    modifiedDate: "11/30/2021 02:10:45 AM",
    createdBy: "user",
    modifiedBy: "",
    id: "CATEGORY#TEST_COMMUNICATIONS#VEHICLE_CONNECTED_SERVICE",
    subCategoryName: "Vehicle Connected Service",
  },
];

it("Add Sub Permission Levels renders properly", () => {
  const wrapper = render(
    <AddPermissionLevels
      show={true}
      onClose={() => {
        console.log("Closed");
      }}
      category={sampledata}
      optionType={"Add"}
      brand={"Toyota"}
      notify={() => {
        console.log("Notify");
      }}
      level={2}
    />
  );
  expect(wrapper.getByPlaceholderText("Catergory Name*").value).toBe("");
});
