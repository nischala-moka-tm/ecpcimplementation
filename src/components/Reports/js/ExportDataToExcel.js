import React from "react";
import ReactExport from "react-data-export";
import excellogo from "./../../../assets/excel-icon.svg";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default function ExportDataToExcel({ data }) {
  let cols = [];
  let rows = [];
  const getCols = () => {
    for (const i in data[0]) {
      cols = [
        ...cols,
        {
          title: i,
          width: { wpx: 150 },
          style: {
            font: { bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "e5e5e5" } },
            alignment: {
              vertical: "center",
              horizontal: "center",
              wrapText: true,
            },
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            },
          },
        },
      ];
    }

    return cols;
  };
  const getRows = () => {
    data.map((d) => {
      let record = [];
      for (const i in data[0]) {
        record = [
          ...record,
          {
            value: d[i],
            style: {
              alignment: {
                vertical: "center",
                horizontal: "center",
                wrapText: true,
              },
              border: {
                top: { style: "thin" },
                bottom: { style: "thin" },
                left: { style: "thin" },
                right: { style: "thin" },
              },
            },
          },
        ];
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
      name="Report"
      element={<img src={excellogo} alt="excel-img" className="excel-icon" />}
    >
      <ExcelSheet dataSet={DataSet} name="Permission Or Preference" />
    </ExcelFile>
  );
}
