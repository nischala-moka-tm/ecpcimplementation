import React from "react";

import "../scss/DashboardComponent.scss";
import { FaRegEdit, FaRegEye } from "react-icons/fa";

import JsonData from "./catergoryList.json";

const recentActivity = JsonData.map((data,index) => {
  return (
		<tr key={index}>
			<td>{data.categoryname}</td>
			<td>{data.levelTwo}</td>
			<td>{data.levelThree}</td>
			<td>{data.levelFour}</td>
			<td>{data.categorydate}</td>
			<td>{data.lastmodified}</td>
			<td>{data.status}</td>
			<td className="edit">
				<FaRegEdit />
			</td>
		</tr>
	);
});

const recentUpdates = JsonData.map((data,index) => {
  return (
    <tr key={index}>
      <td>{data.categoryname}</td>
      <td>{data.levelTwo}</td>
      <td>{data.levelThree}</td>
      <td>{data.levelFour}</td>
      <td>{data.categorydate}</td>
      <td>{data.createdBy}</td>
      <td>{data.lastmodified}</td>
      <td>{data.status}</td>
      <td className="view">
        <FaRegEye />
      </td>
    </tr>
  );
});
function DashboardComponent() {
  return (
    <div className="dashboard-component" id="dashboard-page">
      <div className="recent-activity">
        <p>My Recent Activities</p>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Level 2</th>
              <th>Level 3</th>
              <th>Level 4</th>
              <th>Created Date</th>
              <th>Last Modified</th>
              <th>Status</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>{recentActivity}</tbody>
        </table>
      </div>
      <div className="recent-activity-list">
        To See all My activities <a href="#">Click here</a>
      </div>  
      <div className="recent-updates">
        <p>Recent Admin Portal Activities</p>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Level 2</th>
              <th>Level 3</th>
              <th>Level 4</th>
              <th>Created Date</th>
              <th>Last Modified By</th>
              <th>Last Modified</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>{recentUpdates}</tbody>
        </table>
      </div>
      <div className="recent-activity-list-one">
        To See all Admin portal activities <a href="#">Click here</a>
      </div>  
    </div>
  );
}

export default DashboardComponent;
