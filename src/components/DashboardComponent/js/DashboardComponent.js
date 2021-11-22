import React, { useState, useEffect } from "react";
import "../scss/DashboardComponent.scss";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import DetailedViewPage from "../../DetailedViewPage/js/DetailedViewPage";
import { dateFormat } from "../../CommonBlocks/js/CommonBlock";
import { AxiosGet, AxiosPostMetadata } from "../../AxiosMethods/ApiCalls";
import axios from "axios";
import AddPermissionLevels from "../../AddPermissionLevels/js/AddPermissionLevels";

function DashboardComponent(props) {
  const [recentUpdateData, setRecentUpdateData] = useState([]);
  const [recentActivityData, setRecentActivityData] = useState([]);
  const [isNoDataFound, setNoDataFound] = useState(false);
  const [showViewLevel, SetShowViewLevel] = useState(false);
  const [showModifyLevel, SetShowModifyLevel] = useState(false);
  const [data, setData] = useState([]);
  const [recentViewData, setRecentViewData] = useState([]);

  const userRole = "ECPC_TOYOTA_ADMIN";
  const userId = 1234567;
  useEffect(() => {
    const getDataApi = AxiosGet({
      brand: props.brand,
      type: `${props.type}&userId=${userId}&role=${userRole}`,
    });
    getDataApi.then((result) => {
      result.data.data ? LoadData(result.data.data) : setNoDataFound(true);
    });
  }, [props.brand, props.type]);
  const LoadData = (data) => {
    let res = {
      userId,
      userRole,
      data,
    };
    console.log(res);
    setRecentUpdateData(data.recentUpdate);
    setRecentActivityData(data.recentActivity);
  };
  
  const modifyData =async (id) =>{
    const getMetaDataApi = await AxiosPostMetadata({
      brand: props.brand,
      id: id
    })
    getMetaDataApi.then((result) => {
      console.log(result);
    });
  }

  const LevelCondition1 = (category, optType) => {
    // console.log(category);
    return (
      <>
        showModifyLevel?<AddPermissionLevels
          show={showModifyLevel}
          onClose={() => SetShowModifyLevel(false)}
          category={category}
          optionType={optType}
          brand={props.brand}
          notify={"notify"}
          level={category.levels.length}
          type={"dashboardPermission"}
        />:<AddPermissionLevels
          show={showViewLevel}
          onClose={() => SetShowViewLevel(false)}
          category={category}
          optionType={optType}
          brand={props.brand}
          notify={"notify"}
          level={category.levels.length}
          type={"dashboardPermission"} 
        />
      </>
    );
  };
  // console.log(recentUpdateData);
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
            {recentUpdateData &&
              recentUpdateData.slice(0, 4).map((data, index) => {
                console.log(data);
                return (
                  <tr key={index}>
                    <td>{data.levels[0]}</td>
                    <td>{data.levels[1]}</td>
                    <td>{data.levels[2]}</td>
                    <td>{data.levels[3]}</td>
                    <td>{dateFormat(data.createdDate)}</td>
                    <td>{dateFormat(data.modifiedDate)}</td>
                    <td>{data.status}</td>
                    <td className="edit" onClick={() => { 
                      SetShowModifyLevel(true); 
                      setData(data); 
                      modifyData(data.id) }}>
                      <FaRegEdit />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isNoDataFound && <strong>No Data Found</strong>}
        {showModifyLevel && LevelCondition1(data, "Edit")}
      </div>
      <div className="recent-activity-list">
        To See all My activities
        <a href="/dashboard-admin/report-audit">Click here</a>
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
          <tbody>
            {recentUpdateData &&
              recentUpdateData.slice(0, 4).map((data, index) => {
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
                    <td className="view"
                      onClick={() => { SetShowViewLevel(true); setRecentViewData(data) }}>
                      <FaRegEye />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isNoDataFound && <strong>No Data Found</strong>}
        {/* console.log(showViewLevel); */}
        {showViewLevel && LevelCondition1(recentViewData, "Edit")}
      </div>
      <div className="recent-activity-list-one">
        To See all Admin portal activities
        <a href="/dashboard-admin/report-perm">Click here</a>
      </div>
    </div>
  );
}

export default DashboardComponent;
