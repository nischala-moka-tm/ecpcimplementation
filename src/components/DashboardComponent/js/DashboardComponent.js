import React, { useState, useEffect } from "react";
import "../scss/DashboardComponent.scss";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { dateFormat } from "../../CommonBlocks/js/CommonBlock";
import { AxiosGet, AxiosPostMetadata } from "../../AxiosMethods/ApiCalls";
import AddPermissionLevels from "../../AddPermissionLevels/js/AddPermissionLevels";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userRole = "ECPC_TOYOTA_ADMIN";
const userId = 1234567;
const navalue = "N/A";

function DashboardComponent(props) {
  const [recentUpdateData, setRecentUpdateData] = useState([]);
  const [isNoDataFound, setNoDataFound] = useState(false);
  const [showViewLevel, SetShowViewLevel] = useState(false);
  const [showModifyLevel, SetShowModifyLevel] = useState(false);

  useEffect(() => {
    getApiCall();
  }, [props.brand, props.type]);
  const getApiCall = () => {
    const getDataApi = AxiosGet({
      brand: props.brand,
      type: `${props.type}&userId=${userId}&role=${userRole}`,
    });
    getDataApi.then((result) => {
      result.data.data ? LoadData(result.data.data) : setNoDataFound(true);
    });
  };
  const LoadData = (data) => {
    setRecentUpdateData(data.recentUpdate);
  };

  const [resposnsedata, setData] = useState([recentUpdateData]);
  const modifyData = async (data, brand) => {
    const finalData = {
      adminMetaData: {
        id: data.id,
      },
    };
    const getMetaData = await AxiosPostMetadata(finalData, brand);
    setData(getMetaData.data);
  };
  const notify = (res, resType) => {
    if (resType === "success") {
      toast.success(res);
      getApiCall();
    } else {
      toast.error(res);
    }
  };
  return (
    <div className="dashboard-component" id="dashboard-page">
      <ToastContainer />
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
        {showModifyLevel && resposnsedata && resposnsedata.level && (
          <AddPermissionLevels
            show={showModifyLevel}
            onClose={() => {
              SetShowModifyLevel(false);
              setData([]);
            }}
            category={resposnsedata}
            optionType="Edit"
            brand={props.brand}
            level={resposnsedata.level}
            notify={notify}
          />
        )}
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
                        ? navalue
                        : activitylist.levels[0]}
                    </td>
                    <td>
                      {activitylist.levels[1] === undefined
                        ? navalue
                        : activitylist.levels[1]}
                    </td>
                    <td>
                      {activitylist.levels[2] === undefined
                        ? navalue
                        : activitylist.levels[2]}
                    </td>
                    <td>
                      {activitylist.levels[3] === undefined
                        ? navalue
                        : activitylist.levels[3]}
                    </td>
                    <td>
                      {activitylist.createdDate === ""
                        ? navalue
                        : dateFormat(activitylist.createdDate)}
                    </td>
                    <td>
                      {activitylist.createdBy === ""
                        ? navalue
                        : activitylist.createdBy}
                    </td>
                    <td>
                      {activitylist.modifiedDate === ""
                        ? navalue
                        : dateFormat(activitylist.modifiedDate)}
                    </td>
                    <td>
                      {activitylist.status === ""
                        ? navalue
                        : activitylist.status}
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
        {showViewLevel && resposnsedata && resposnsedata.level && (
          <AddPermissionLevels
            show={showViewLevel}
            onClose={() => {
              SetShowViewLevel(false);
              setData([]);
            }}
            category={resposnsedata}
            optionType="Edit"
            brand={props.brand}
            level={resposnsedata.level}
            notify={notify}
          />
        )}
      </div>
      <div className="recent-activity-list-one">
        To See all Admin portal activities
        <a href="/dashboard-admin/report-perm">Click here</a>
      </div>
    </div>
  );
}

export default DashboardComponent;
