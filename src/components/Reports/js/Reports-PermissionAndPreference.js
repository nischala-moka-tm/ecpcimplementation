import React, { useState, useEffect } from "react";
import "../scss/Reports-PermissionAndPreference.scss";
import { Paginated } from "./Pagenated";
import { AxiosGet } from "../../AxiosMethods/ApiCalls";
import Moment from "moment";
import statusDetails from "../../CategoriesData/StatusDetails.json";
import { dateFormat } from "../../CommonBlocks/js/CommonBlock";
import excellogo from "./../../../assets/excel-icon.svg";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const DateFormat = () => {
  return Moment().format("YYYY-MM-DD");
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
        {props.categories.map((cat, pos) => {
          return (
            <option key={pos} value={cat}>
              {cat}
            </option>
          );
        })}
      </select>
      <select
        id="Status"
        name="Status"
        value={props.Status}
        onChange={props.onSelectable}
      >
        {props.statusDetails.map((st, pos) => {
          return (
            <option key={pos} value={st.status}>
              {st.status}
            </option>
          );
        })}
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

export function ReportsPermissionAndPreference(props) {
  const [searchText, setSearchText] = useState("");
  const [Category, setCategory] = useState("Marketing");
  const [Status, setStatus] = useState("Pending Approval");
  const [fromdate, setFromDate] = useState(DateFormat());
  const [todate, setToDate] = useState(DateFormat());
  const [reportData, setReportData] = useState([]);
  const [apiData, setapiData] = useState([]);
  const [isNoDataFound, setNoDataFound] = useState(false);
  const [categories, setCategories] = useState([]);
  const userRole = "ECPC_TOYOTA_ADMIN";
  const userId = 1234567;
  const forTable = (data) => {
    let tempArray = [];
    data.map((item) => {
      const obj = {
        Category: item.levels[0],
        "Level 2": item.levels[1] ? item.levels[1] : "N/A",
        "Level 3": item.levels[2] ? item.levels[2] : "N/A",
        "Level 4": item.levels[3] ? item.levels[3] : "N/A",
        "Level 5": item.levels[4] ? item.levels[4] : "N/A",
        "Created By": item.createdBy,
        "Created Date": Moment(item.createdDate).format("MM/DD/YYYY"),
        "Last Modified": dateFormat(item.modifiedDate),
        Status: item.status,
      };
      tempArray = [...tempArray, obj];
    });
    setapiData(tempArray);
  };
  useEffect(() => {
    DataFetch(searchText);
  }, [fromdate, todate, searchText, Category, Status, apiData]);
  useEffect(() => {
    AxiosGet({
      brand: props.brand,
      type: `${props.type}&userId=${userId}&role=${userRole}`,
    }).then((res) => {
      res.data.data ? Load(res.data.data.recentUpdate) : setNoDataFound(true);
    });
  }, [props.brand, props.type]);
  const Load = (data) => {
    let loaditems = [];
    forTable(data);
    data.map((item) => {
      loaditems = [...loaditems, item.levels[0]];
    });

    setCategories(Array.from(new Set(loaditems)));
  };

  statusDetails.sort(function (a, b) {
    var statusA = a.status.toUpperCase();
    var statusB = b.status.toUpperCase();
    if (statusA < statusB) {
      return -1; //nameA comes first
    }
    if (statusA > statusB) {
      return 1;
    }
    return 0;
  });
  const onExclClick = () => {
    let date = new Date();

    const filename = "Recent_Activity_Data_Report_" + date.toLocaleDateString();
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(reportData);
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
    const res = apiData.filter((data) => {
      return (
        data["Category"] === Category &&
        data["Status"] === Status &&
        (Moment(data["Created Date"]) >= Moment(fromdate) ||
          Moment(data["Created Date"]) <= Moment(todate))
      );
    });
    setReportData(res);
  };
  const onSearchText = (searchtxt) => {
    const results = apiData.filter((data) => {
      return (
        (data["Category"]
          .toString()
          .toLowerCase()
          .indexOf(searchtxt.toLowerCase()) > -1 ||
          data["Last Modified"]
            .toString()
            .toLowerCase()
            .indexOf(searchtxt.toLowerCase()) > -1 ||
          data.Status.toString()
            .toLowerCase()
            .indexOf(searchtxt.toLowerCase()) > -1 ||
          data["Level 2"]
            .toString()
            .toLowerCase()
            .indexOf(searchtxt.toLowerCase()) > -1 ||
          data["Level 3"]
            .toString()
            .toLowerCase()
            .indexOf(searchtxt.toLowerCase()) > -1 ||
          data["Level 4"]
            .toString()
            .toLowerCase()
            .indexOf(searchtxt.toLowerCase()) > -1 ||
          data["Created By"]
            .toString()
            .toLowerCase()
            .indexOf(searchtxt.toLowerCase()) > -1) &&
        data["Category"] === Category &&
        data.Status === Status &&
        (Moment(data.categorydate) >= Moment(fromdate) ||
          Moment(data.categorydate) <= Moment(todate))
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
      accessor: "Category",
    },
    {
      Header: "Level 2",
      accessor: "Level 2",
    },
    {
      Header: "Level 3",
      accessor: "Level 3",
    },

    {
      Header: "Level 4",
      accessor: "Level 4",
    },
    {
      Header: "Level 5",
      accessor: "Level 5",
    },
    {
      Header: "Created By",
      accessor: "Created By",
    },

    {
      Header: "Created Date",
      accessor: "Created Date",
    },
    {
      Header: "Last Modified",
      accessor: "Last Modified",
    },
    {
      Header: "Status",
      accessor: "Status",
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
        statusDetails={statusDetails}
        categories={categories}
      />
      <Paginated columns={testcolumns} data={reportData} />
      {isNoDataFound && <strong>No Data Found</strong>}
    </div>
  );
}
export default function ReportsPermissionPreference(props) {
  return <ReportsPermissionAndPreference {...props} />;
}
