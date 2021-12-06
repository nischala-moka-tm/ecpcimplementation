import React, { useState, useEffect } from "react";
import "../scss/Reports-PermissionAndPreference.scss";
import { Paginated } from "./Pagenated";
import { AxiosGet } from "../../AxiosMethods/ApiCalls";
import Moment from "moment";
import statusDetails from "../../CategoriesData/StatusDetails.json";
import { dateFormat } from "../../CommonBlocks/js/CommonBlock";
import ExportDataToExcel from "./ExportDataToExcel";
const createdDateString = "Created Date";
const lastModifiedString = "Last Modified";
const createdByString = "Created By";
const naString = "N/A";
const DateFormat = () => {
  return Moment().format("YYYY-MM-DD");
};
const isBothAll = (cateogory, status) => {
  return cateogory === "" && status === "";
};
const isNotBothAll = (cateogory, status) => {
  return cateogory !== "" && status !== "";
};
const isCategoryAll = (cateogory, status) => {
  return cateogory === "" && status !== "";
};

const isStatusAll = (cateogory, status) => {
  return cateogory !== "" && status === "";
};
const searchFilter = (data, searchtxt) => {
  return (
    data["Category"].toString().toLowerCase().indexOf(searchtxt.toLowerCase()) >
      -1 ||
    data[lastModifiedString]
      .toString()
      .toLowerCase()
      .indexOf(searchtxt.toLowerCase()) > -1 ||
    data.Status.toString().toLowerCase().indexOf(searchtxt.toLowerCase()) >
      -1 ||
    data["Level 2"].toString().toLowerCase().indexOf(searchtxt.toLowerCase()) >
      -1 ||
    data["Level 3"].toString().toLowerCase().indexOf(searchtxt.toLowerCase()) >
      -1 ||
    data["Level 4"].toString().toLowerCase().indexOf(searchtxt.toLowerCase()) >
      -1 ||
    data[createdByString]
      .toString()
      .toLowerCase()
      .indexOf(searchtxt.toLowerCase()) > -1
  );
};
function Filters(props) {
  return (
    <div className="report-filters">
      <input
        type="date"
        id="fromDate"
        name="fromdate"
        defaultValue={props.fromdate}
        onChange={props.onSelectable}
      />
      <input
        type="date"
        id="toDate"
        name="todate"
        defaultValue={props.todate}
        onChange={props.onSelectable}
      />
      <select
        id="Category"
        name="Category"
        defaultValue={props.Category}
        onChange={props.onSelectable}
      >
        <option value="" selected="selected">
          All Categories
        </option>
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
        <option value="" selected="selected">
          All Status
        </option>
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
      <ExportDataToExcel data={props.data} />
    </div>
  );
}
const gridcolumns = [
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
    Header: createdByString,
    accessor: createdByString,
  },

  {
    Header: createdDateString,
    accessor: createdDateString,
  },
  {
    Header: lastModifiedString,
    accessor: lastModifiedString,
  },
  {
    Header: "Status",
    accessor: "Status",
  },
];
export function ReportsPermissionAndPreference(props) {
  const [searchText, setSearchText] = useState("");
  const [Category, setCategory] = useState("");
  const [Status, setStatus] = useState("");
  const [fromdate, setFromDate] = useState(DateFormat());
  const [todate, setToDate] = useState(DateFormat());
  const [reportData, setReportData] = useState([]);
  const [apiData, setapiData] = useState([]);
  const [isNoDataFound, setNoDataFound] = useState(false);
  const [categories, setCategories] = useState([]);

  const forTable = (data) => {
    let tempArray = [];
    data.map((item) => {
      const obj = {
        Category: item.levels[0],
        "Level 2": item.levels[1] ? item.levels[1] : naString,
        "Level 3": item.levels[2] ? item.levels[2] : naString,
        "Level 4": item.levels[3] ? item.levels[3] : naString,
        "Level 5": item.levels[4] ? item.levels[4] : naString,
        "Created By": item.createdBy,
        "Created Date": Moment(item.createdDate).format("MM/DD/YYYY"),
        "Last Modified": dateFormat(item.modifiedDate),
        Status: item.status ? item.status : "",
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
      type: props.type,
    }).then((res) => {
      res.data.data ? Load(res.data.data) : setNoDataFound(true);
    });
  }, [props.brand, props.type]);
  const Load = (data) => {
    let loaditems = [];

    data.map((item) => {
      loaditems = [...loaditems, item.levels[0]];
    });
    setCategories(Array.from(new Set(loaditems)));
    setCategory(loaditems[0]);
    forTable(data);
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
    let res;
    if (isNotBothAll(Category, Status)) {
      res = apiData.filter((data) => {
        return data["Category"] === Category && data["Status"] === Status;
      });
      setReportData(res);
    } else if (isBothAll(Category, Status)) {
      res = apiData.filter((data) => {
        return data["Category"] !== Category && data["Status"] !== Status;
      });
      setReportData(res);
    } else if (isCategoryAll(Category, Status)) {
      res = apiData.filter((data) => {
        return data["Category"] !== Category && data["Status"] === Status;
      });
      setReportData(res);
    } else if (isStatusAll(Category, Status)) {
      res = apiData.filter((data) => {
        return data["Category"] === Category && data["Status"] !== Status;
      });
    }
    setReportData(res);
  };
  const onSearchText = (searchtxt) => {
    let results;
    if (isNotBothAll(Category, Status)) {
      results = apiData.filter((data) => {
        return (
          searchFilter(data, searchtxt) &&
          data["Category"] === Category &&
          data["Status"] === Status
        );
      });
      setReportData(results);
    } else if (isBothAll(Category, Status)) {
      results = apiData.filter((data) => {
        return (
          searchFilter(data, searchtxt) &&
          data["Category"] !== Category &&
          data["Status"] !== Status
        );
      });
      setReportData(results);
    } else if (isCategoryAll(Category, Status)) {
      results = apiData.filter((data) => {
        return (
          searchFilter(data, searchtxt) &&
          data["Category"] !== Category &&
          data["Status"] === Status
        );
      });
      setReportData(results);
    } else if (isStatusAll(Category, Status)) {
      results = apiData.filter((data) => {
        return (
          searchFilter(data, searchtxt) &&
          data["Category"] === Category &&
          data["Status"] !== Status
        );
      });
      setReportData(results);
    }
  };
  const DataFetch = (searchtxt) => {
    if (searchtxt !== "") {
      onSearchText(searchtxt);
    } else {
      Filter();
    }
    setSearchText(searchtxt);
  };

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
        statusDetails={statusDetails}
        categories={categories}
        data={reportData}
      />
      <Paginated columns={gridcolumns} data={reportData} />
      {isNoDataFound && (
        <div className="row justify-content-sm-center text-center">
          <span className="text-danger col-sm-2">No Data Found</span>
        </div>
      )}
    </div>
  );
}
export default function ReportsPermissionPreference(props) {
  return (
    <ReportsPermissionAndPreference
      {...props}
      type={`report&type=permissionOrPreference`}
    />
  );
}
