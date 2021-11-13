import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../scss/ManageComponent.scss";
import statusDetails from "../../CategoriesData/StatusDetails.json";
import AddNewCategory from "../../AddNewCategory/js/AddNewCategory";
import AddPermissionLevel1 from "../../AddPermissionLevel1/js/AddPermissionLevel1";
import AddPermissionLevel2 from "../../AddPermissionLevel2/js/AddPermissionLevel2";
import AddPermissionLevel3 from "../../AddPermissionLevel3/js/AddPermissionLevel3";
import AddPreferencesLevel1 from "../../AddPreferencesLevel1/js/AddPreferencesLevel1";
import AddPreferencesLevel4 from "../../AddPreferencesLevel4/js/AddPreferencesLevel4";
import DetailedViewPage from "../../DetailedViewPage/js/DetailedViewPage";
import { AxiosGet } from "../../AxiosMethods/ApiCalls";

import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const SubCategory = (props) => {
  const [subCategory, setSubCategory] = useState(false);
  return (
    <div className="sub-category">
      <ul>
        <li>
          <button
            className="plusmenu-danger"
            onClick={() => setSubCategory(!subCategory)}
          >
            {props.subCategory &&
              (subCategory ? <FaMinusCircle /> : <FaPlusCircle />)}
          </button>
          <Status status={props.status} />
          {props.subCategoryName}
          <SelectablePopupLevel {...props} />
        </li>

        {props.subCategory &&
          props.subCategory.map((category, index) => {
            return subCategory && <SubCategory key={index} {...category} />;
          })}
      </ul>
    </div>
  );
};

function SelectablePopupLevel(props) {
  const [showLevelPopup, setLevelPopup] = useState(false);
  const [optionType, setOptionType] = useState("Add");
  const [showDetailLevel, setShowDetailLevel] = useState(false);
  const LevelCondition1 = (category, optType) => {
    console.log(category.level);
    switch (category.level) {
      case 1:
        return (
          <AddPermissionLevel1
            show={showLevelPopup}
            onClose={() => setLevelPopup(false)}
            category={category}
            optionType={optType}
          />
        );
      case 2:
        return (
          <AddPermissionLevel2
            show={showLevelPopup}
            onClose={() => setLevelPopup(false)}
            category={category}
            optionType={optType}
          />
        );
      case 3:
        return (
          <AddPermissionLevel3
            show={showLevelPopup}
            onClose={() => setLevelPopup(false)}
            category={category}
            optionType={optType}
          />
        );
      default:
        return "";
    }
  };
  const LevelCondition2 = (category, optType) => {
    console.log(category.level);
    switch (category.level) {
			case 1:
			case 2:
			case 3:
				return (
					<AddPreferencesLevel1
						show={showLevelPopup}
						onClose={() => setLevelPopup(false)}
						category={category}
						optionType={optType}
					/>
				); 
			case 4:
				return (
					<AddPreferencesLevel4
						show={showLevelPopup}
						onClose={() => setLevelPopup(false)}
						category={category}
						optionType={optType}
					/>
				);
			default:
				return "";
		}
  };

  return (
    <div className="dropdown-content">
      <ul className="selectble-popup">
        <li
          onClick={() => {
            setLevelPopup(true);
            setOptionType("Add");
          }}
        >
          Add New
          {props.id.includes("PREFERENCES") ? " Preference" : " Permission"}
        </li>
        <li
          onClick={() => {
            setLevelPopup(true);
            setOptionType("Edit");
          }}
        >
          Modify
        </li>
        <li onClick={() => setShowDetailLevel(true)}>View Existing Content</li>
        <li
          onClick={() => {
            setLevelPopup(true);
            setOptionType("Delete");
          }}
        >
          Delete
        </li>
      </ul>
      {showLevelPopup &&
        (props.id.includes("PREFERENCES")
          ? LevelCondition2(props, optionType)
          : LevelCondition1(props, optionType))}
      {showDetailLevel && (
        <DetailedViewPage
          show={setShowDetailLevel}
          onClose={() => setShowDetailLevel(false)}
        />
      )}
    </div>
  );
}
const SubmitApproval = (props) => {
  return (
    <Modal
      show={props.SubmitPref}
      onHide={props.handleClose}
      className="approval-popup modalpopup"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <p>Your new permissions category has been submitted for approval</p>
        <div className="button-options">
          <Button variant="primary" size="sm" onClick={props.handleClose}>
            OK
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
function MainCategory({ category }) {
  const [SubC1, setSubC1] = useState(false);

  return (
    <div className="categories-list">
      <div className="heading">
        <button className="plusmenu-danger" onClick={() => setSubC1(!SubC1)}>
          {category.subCategory &&
            (SubC1 ? <FaMinusCircle /> : <FaPlusCircle />)}
        </button>
        <span className="heading-text">
          <Status status={category.status} />
          {category.categoryName}
        </span>
        <SelectablePopupLevel {...category} />
      </div>

      {category.subCategory &&
        category.subCategory.map((subCateogry, pos) => {
          return SubC1 && <SubCategory key={pos} {...subCateogry} />;
        })}
    </div>
  );
}
function ManageComponent(props) {
  const [showLevel1, SetLevel1] = useState(false);
  const [SubmitPref, setSubmitPref] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [categorydata, setCategoriesData] = useState([]);
  const handleClose = () => setSubmitPref(false);

  useEffect(() => {
    setLoading(true);
    const getDataApi = AxiosGet({
      brand: props.brand,
    });
    getDataApi.then((result) => {
      console.log(result);
      setLoading(false);
      setCategoriesData(result.data.data);
    });
  }, [props.brand]);
  return (
    <div className="manage-component" id="manage-permission">
      <div className="sub-head">
        <p>Permissions/Preferences</p>
      </div>
      <div className="manage-body">
        <div className="status-codes">
          <ul>
            <li className="live">Live</li>
            <li className="pending-approval">Pending Approval</li>
            <li className="pending-go-live">Approved Pending Go-Live</li>
            <li className="expiring-soon">Approved Expiring Soon</li>
            <li className="inactive">Inactive</li>
          </ul>
        </div>
        <p className="reference-guide">
          <a href="/">Click Here</a> for reference guide
        </p>
        <Button variant="primary" size="sm" onClick={() => SetLevel1(true)}>
          Create new Category
        </Button>
        <p className="info-text">
          To edit/delete existing category or subcategory right click on item
        </p>

        {isLoading
          ? "Loading...."
          : categorydata.map((category, index) => {
              return <MainCategory category={category} key={index} />;
            })}
      </div>

      <div className="button-options">
        <Button variant="primary" size="sm">
          Cancel
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSubmitPref(!SubmitPref)}
        >
          Submit
        </Button>
        {SubmitPref && (
          <SubmitApproval SubmitPref={SubmitPref} handleClose={handleClose} />
        )}
      </div>
      {showLevel1 && (
        <AddNewCategory show={showLevel1} onClose={() => SetLevel1(false)} />
      )}
    </div>
  );
}
function Status(props) {
  let bgColor = "";
  statusDetails.map((status) => {
    if (status.status === props.status) {
      bgColor = status.colorCode;
    }
  });
  return (
    <span
      className="status-roundend"
      style={{ backgroundColor: bgColor }}
    ></span>
  );
}

export default ManageComponent;
