import React, { useState, useEffect } from "react";
import "../scss/Reports-PermissionAndPreference.scss";
import JsonData from "../../DashboardComponent/js/catergoryList.json";
import { Paginated } from "./Pagenated";
import excellogo from "./../../../assets/excel-icon.svg";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const DateFormat = () => {
	let date = new Date();
	return (
		date.getFullYear() +
		"-" +
		("0" + (date.getMonth() + 1)).slice(-2) +
		"-" +
		("0" + date.getDate()).slice(-2)
	);
};

function Filters(props) {
	return (
		<div className="report-filters">
			<input
				type="date"
				id="fromDate"
				name="fromdate"
				value={props.fromdate}
				onChange={props.onSelectable}
			/>
			<input
				type="date"
				id="toDate"
				name="todate"
				value={props.todate}
				onChange={props.onSelectable}
			/>
			<select
				id="Category"
				name="Category"
				value={props.Category}
				onChange={props.onSelectable}
			>
				<option value="Marketing">Marketing</option>
				<option value="Survey">Survey</option>
			</select>
			<select
				id="Status"
				name="Status"
				value={props.Status}
				onChange={props.onSelectable}
			>
				<option value="Pending Approval">Pending Approval</option>
				<option value="Approved">Approved</option>
			</select>
			<input
				type="search"
				placeholder="Search"
				value={props.searchText}
				onChange={props.onSearch}
				className="search"
			/>
			<img
				src={excellogo}
				alt="excel-img"
				className="excel-icon"
				onClick={props.onExclClick}
			/>
		</div>
	);
}

export function ReportsPermissionAndPreference() {
	const [searchText, setSearchText] = useState("");
	const [Category, setCategory] = useState("Marketing");
	const [Status, setStatus] = useState("Approved");
	const [fromdate, setFromDate] = useState(DateFormat());
	const [todate, setToDate] = useState(DateFormat());
	const [reportData, setReportData] = useState(JsonData);

	useEffect(() => {
		DataFetch(searchText);
	}, [fromdate, todate, searchText, Category, Status]);
	const onExclClick = () => {
		let date = new Date();
		const dataHeader = {
			categoryname: "Category",
			levelTwo: "Level 2",
			levelThree: "Level 3",
			levelFour: "Level 4",
			createdBy: "CreatedBy",
			categorydate: "Category Data",
			lastmodified: "Last Modified",
			status: "Status",
		};
		const filename = "Recent_Activity_Data_Report_" + date.toLocaleDateString();
		const fileType =
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
		const fileExtension = ".xlsx";

		const ws = XLSX.utils.json_to_sheet([dataHeader, ...reportData]);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, filename + fileExtension);
	};
	const onSelectable = (e) => {
		let { name, value } = e.target;
		if (name === "Category") {
			setCategory(value);
		} else if (name === "Status") {
			setStatus(value);
		} else if (name === "fromdate") {
			setFromDate(value);
		} else {
			setToDate(value);
		}
	};
	const Filter = () => {
		const res = JsonData.filter((data) => {
			return (
				data.categoryname === Category &&
				data.status === Status &&
				(Date.parse(data.categorydate) >= Date.parse(fromdate) ||
					Date.parse(data.categorydate) <= Date.parse(todate))
			);
		});
		setReportData(res);
	};
	const onSearchText = (searchtxt) => {
		const results = JsonData.filter((data) => {
			return (
				(data.categoryname
					.toString()
					.toLowerCase()
					.indexOf(searchtxt.toLowerCase()) > -1 ||
					data.categorydate
						.toString()
						.toLowerCase()
						.indexOf(searchtxt.toLowerCase()) > -1 ||
					data.lastmodified
						.toString()
						.toLowerCase()
						.indexOf(searchtxt.toLowerCase()) > -1 ||
					data.status
						.toString()
						.toLowerCase()
						.indexOf(searchtxt.toLowerCase()) > -1 ||
					data.levelTwo
						.toString()
						.toLowerCase()
						.indexOf(searchtxt.toLowerCase()) > -1 ||
					data.levelThree
						.toString()
						.toLowerCase()
						.indexOf(searchtxt.toLowerCase()) > -1 ||
					data.levelFour
						.toString()
						.toLowerCase()
						.indexOf(searchtxt.toLowerCase()) > -1 ||
					data.createdBy
						.toString()
						.toLowerCase()
						.indexOf(searchtxt.toLowerCase()) > -1) &&
				data.categoryname === Category &&
				data.status === Status &&
				(Date.parse(data.categorydate) >= Date.parse(fromdate) ||
					Date.parse(data.categorydate) <= Date.parse(todate))
			);
		});

		setReportData(results);
	};
	const DataFetch = (searchtxt) => {
		if (searchtxt !== "") {
			onSearchText(searchtxt);
		} else {
			Filter();
		}
		setSearchText(searchtxt);
	};
	const testcolumns = [
		{
			Header: "Category",
			accessor: "categoryname",
		},
		{
			Header: "Level 2",
			accessor: "levelTwo",
		},
		{
			Header: "Level 3",
			accessor: "levelThree",
		},

		{
			Header: "Level 4",
			accessor: "levelFour",
		},
		{
			Header: "Created By",
			accessor: "createdBy",
		},

		{
			Header: "Category Date",
			accessor: "categorydate",
		},
		{
			Header: "Last Modified",
			accessor: "lastmodified",
		},
		{
			Header: "Status",
			accessor: "status",
		},
	];
	return (
		<div className="report-permpref">
			<Filters
				searchText={searchText}
				onSearch={(e) => setSearchText(e.target.value)}
				onSelectable={(e) => onSelectable(e)}
				Category={Category}
				Status={Status}
				fromdate={fromdate}
				todate={todate}
				onExclClick={onExclClick}
			/>
			<Paginated columns={testcolumns} data={reportData} />
		</div>
	);
}
export default function ReportsPermissionPreference() {
	return <ReportsPermissionAndPreference />;
}
