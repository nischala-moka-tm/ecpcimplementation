import React, { useState, useEffect } from "react";
import "../scss/DashboardComponent.scss";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { dateFormat } from "../../CommonBlocks/js/CommonBlock";
import { AxiosGet, AxiosPostMetadata } from "../../AxiosMethods/ApiCalls";
import AddPermissionLevels from "../../AddPermissionLevels/js/AddPermissionLevels";

function DashboardComponent(props) {
  const [recentUpdateData, setRecentUpdateData] = useState([]);
  const [recentActivityData, setRecentActivityData] = useState([]);
  const [isNoDataFound, setNoDataFound] = useState(false);
  const [showViewLevel, SetShowViewLevel] = useState(false);
  const [showModifyLevel, SetShowModifyLevel] = useState(false);

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
    setRecentUpdateData(data.recentUpdate);
    setRecentActivityData(data.recentActivity);
  };

  const [resposnsedata, setData] = useState([recentUpdateData]);
  const modifyData = async (data, brand) => {
    const finalData = {
      adminMetaData: {
        id: data.id,
      },
    };
    const getMetaData = await AxiosPostMetadata(finalData, brand);
    setData(getMetaData.data.data);
  };

  const LevelCondition1 = (category, optType) => {
    return (
      <>
        {showModifyLevel && (
          <AddPermissionLevels
            show={showModifyLevel}
            onClose={() => {
              SetShowModifyLevel(false);
              setData([]);
            }}
            category={category}
            optionType={optType}
            brand={props.brand}
            notify={"notify"}
            level={category.level}
            type={"dashboardPermission"}
          />
        )}
      </>
    );
  };
  const LevelCondition2 = (category, optType) => {
    return (
      <>
        {showViewLevel && (
          <AddPermissionLevels
            show={showViewLevel}
            onClose={() => {
              SetShowViewLevel(false);
              setData([]);
            }}
            category={category}
            optionType={optType}
            brand={props.brand}
            notify={"notify"}
            level={category.level}
            type={"dashboardPermission"}
          />
        )}
      </>
    );
  };

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
              recentUpdateData.slice(0, 4).map((recentlist, index) => {
                return (
                  <tr key={index}>
                    <td>{recentlist.levels[0]}</td>
                    <td>{recentlist.levels[1]}</td>
                    <td>{recentlist.levels[2]}</td>
                    <td>{recentlist.levels[3]}</td>
                    <td>{dateFormat(recentlist.createdDate)}</td>
                    <td>{dateFormat(recentlist.modifiedDate)}</td>
                    <td>{recentlist.status}</td>
                    <td
                      className="edit"
                      onClick={(e) => {
                        SetShowModifyLevel(true);
                        modifyData(recentlist, props.brand);
                      }}
                    >
                      <FaRegEdit />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isNoDataFound && <strong>No Data Found</strong>}
        {showModifyLevel &&
          resposnsedata != [] &&
          resposnsedata.level &&
          LevelCondition1(resposnsedata, "Edit")}
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
              recentUpdateData.slice(0, 4).map((activitylist, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {activitylist.levels[0] === undefined
                        ? "N/A"
                        : activitylist.levels[0]}
                    </td>
                    <td>
                      {activitylist.levels[1] === undefined
                        ? "N/A"
                        : activitylist.levels[1]}
                    </td>
                    <td>
                      {activitylist.levels[2] === undefined
                        ? "N/A"
                        : activitylist.levels[2]}
                    </td>
                    <td>
                      {activitylist.levels[3] === undefined
                        ? "N/A"
                        : activitylist.levels[3]}
                    </td>
                    <td>
                      {activitylist.createdDate === ""
                        ? "N/A"
                        : dateFormat(activitylist.createdDate)}
                    </td>
                    <td>
                      {activitylist.createdBy === ""
                        ? "N/A"
                        : activitylist.createdBy}
                    </td>
                    <td>
                      {activitylist.modifiedDate === ""
                        ? "N/A"
                        : dateFormat(activitylist.modifiedDate)}
                    </td>
                    <td>
                      {activitylist.status === "" ? "N/A" : activitylist.status}
                    </td>
                    <td
                      className="view"
                      onClick={() => {
                        SetShowViewLevel(true);
                        modifyData(activitylist, props.brand);
                      }}
                    >
                      <FaRegEye />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isNoDataFound && <strong>No Data Found</strong>}
        {showViewLevel &&
          resposnsedata != [] &&
          LevelCondition2(resposnsedata, "Edit")}
      </div>
      <div className="recent-activity-list-one">
        To See all Admin portal activities
        <a href="/dashboard-admin/report-perm">Click here</a>
      </div>
    </div>
  );
}

export default DashboardComponent;
