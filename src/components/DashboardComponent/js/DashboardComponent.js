import React, { useState, useEffect } from "react";
import "../scss/DashboardComponent.scss";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { dateFormat } from "../../CommonBlocks/js/CommonBlock";
import { AxiosGet } from "../../AxiosMethods/ApiCalls";

function DashboardComponent(props) {
	const [recentUpdateData, setRecentUpdateData] = useState([]);
	const [recentActivityData, setRecentActivityData] = useState([]);
	const [isNoDataFound, setNoDataFound] = useState(false);
	useEffect(() => {
		const getDataApi = AxiosGet({
			brand: props.brand,
			type: props.type,
		});
		getDataApi.then((result) => {
			result.data.data
				? setRecentUpdateData(result.data.data.recentUpdate)
				: setNoDataFound(true);
			result.data.data
				? setRecentActivityData(result.data.data.recentActivity)
				: setNoDataFound(true);
		});
	}, [props.brand, props.type]);

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
					<tbody>
						{recentActivityData.slice(0, 4).map((data, index) => {
							return (
								<tr key={index}>
									<td>{data.levels[0]}</td>
									<td>{data.levels[1]}</td>
									<td>{data.levels[2]}</td>
									<td>{data.levels[3]}</td>
									<td>{dateFormat(data.createdDate)}</td>
									<td>{dateFormat(data.modifiedDate)}</td>
									<td>{data.status}</td>
									<td className="edit">
										<FaRegEdit />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{isNoDataFound && <strong>No Data Found</strong>}
			</div>
			<div className="recent-activity-list">
				To See all My activities{" "}
				<a href="/dashboard-admin/report-perm">Click here</a>
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
					{/* <tbody>{recentUpdates}</tbody> */}
					<tbody>
						{recentUpdateData.slice(0, 4).map((data, index) => {
							return (
								<tr key={index}>
									<td>
										{data.levels[0] === undefined ? "N/A" : data.levels[0]}
									</td>
									<td>
										{data.levels[1] === undefined ? "N/A" : data.levels[1]}
									</td>
									<td>
										{data.levels[2] === undefined ? "N/A" : data.levels[2]}
									</td>
									<td>
										{data.levels[3] === undefined ? "N/A" : data.levels[3]}
									</td>
									<td>
										{data.createdDate === ""
											? "N/A"
											: dateFormat(data.createdDate)}
									</td>
									<td>{data.createdBy === "" ? "N/A" : data.createdBy}</td>
									<td>
										{data.modifiedDate === ""
											? "N/A"
											: dateFormat(data.modifiedDate)}
									</td>
									<td>{data.status === "" ? "N/A" : data.status}</td>
									<td className="view">
										<FaRegEye />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{isNoDataFound && <strong>No Data Found</strong>}
			</div>
			<div className="recent-activity-list-one">
				To See all Admin portal activities{" "}
				<a href="/dashboard-admin/report-audit">Click here</a>
			</div>
		</div>
	);
}

export default DashboardComponent;
