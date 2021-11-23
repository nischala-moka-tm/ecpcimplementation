import React from "react";
import ReactExport from "react-data-export";
import excellogo from "./../../../assets/excel-icon.svg";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default function ExportDataToExcel({ data }) {
	let cols = [];
	let rows = [];
	const getCols = () => {
		for (let i in data[0]) {
			cols = [
				...cols,
				{
					title: i,
					width: { wpx: 150 },
				},
			];
		}

		return cols;
	};
	const getRows = () => {
		data.map((d) => {
			let record = [];
			for (let i in data[0]) {
				record = [...record, { value: d[i] }];
			}
			rows = [...rows, record];
		});
		return rows;
	};
	const DataSet = [
		{
			columns: getCols(),
			data: getRows(),
		},
	];
	return (
		<ExcelFile
			element={<img src={excellogo} alt="excel-img" className="excel-icon" />}
		>
			<ExcelSheet dataSet={DataSet} name="Organization" />
		</ExcelFile>
	);
}
