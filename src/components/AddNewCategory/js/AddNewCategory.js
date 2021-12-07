import React, { useState } from "react";
import {
  Row,
  Col,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Container,
  Button,
} from "react-bootstrap";
import "../scss/AddNewCategory.scss";
import { AxiosCreateNewPost } from "../../AxiosMethods/ApiCalls";
import { FaRegQuestionCircle } from "react-icons/fa";
import AddNewPermissionList from "../../AddNewPermissionList/js/AddNewPermissionList";
import AddNewPreferenceList from "../../AddNewPreferenceList/js/AddNewPreferenceList";
import {
  FinalSelection,
  CategorySec,
  EnableEmailSec,
  CommentSec,
  DefaultCommunicationModes,
  DateSec,
  onlyAddconditon,
  ImageSec,
  dateFormat,
  jsondata,
  DescriptionSec,
} from "../../CommonBlocks/js/CommonBlock";
import axios from "axios";

const fileChangedHandler = (event) => {
  const formData = new FormData();
  console.log(formData);
};
const ForPreference = ({
  altEmail,
  handleChange,
  labelLayout,
  commChannels,
  labelAdd,
  onChangeAltMail,
  onInputChecked,
  onCommChecked,
  optionType,
}) => {
  return (
    <div className="create-levels">
      <div className="category-level1">
        <form id="form2">
          <Row className="category-sec">
            <Col md={12}>
              <p>Level 1*</p>
            </Col>
          </Row>
          <CategorySec onChange={(e) => handleChange(e, 1)} />
          <EnableEmailSec
            altEmail={altEmail}
            onChange={(e) => onChangeAltMail()}
          />
          <DateSec
            type={"text"}
            onChange={(e) => handleChange(e, 1)}
            onlyAddconditon={onlyAddconditon("Add")}
          />
          <CommentSec readonly={false} onChange={(e) => handleChange(e, 1)} />
        </form>
      </div>
      {labelLayout.map((layout, index) => {
        return (
          <div key={index}>
            {layout.labelClicked <= 2 && (
              <div className="category-level2">
                <Row className="category-sec">
                  <Col md={12}>
                    <p>Level 2*</p>
                  </Col>
                </Row>
                <CategorySec
                  onlyAdd={{ isClicked: true, labelValue: 2 }}
                  labelAdd={labelAdd}
                  onChange={(e) => handleChange(e, 2)}
                />
                <DefaultCommunicationModes
                  mail={commChannels.mail}
                  post={commChannels.post}
                  call={commChannels.call}
                  sms={commChannels.sms}
                  default={commChannels.default}
                  onDefaultCommChecked={(e) => onCommChecked(e)}
                  onChecked={(e) => onInputChecked(e)}
                  onlyDelete={optionType === "Delete"}
                />
                <DateSec onChange={(e) => handleChange(e, 2)} />
                <CommentSec
                  readonly={false}
                  onChange={(e) => handleChange(e, 2)}
                />
              </div>
            )}
            {layout.labelClicked <= 3 && (
              <div className="category-level3">
                <Row className="category-sec">
                  <Col md={12}>
                    <p>Level 3*</p>
                  </Col>
                </Row>
                <CategorySec
                  onlyAdd={{ isClicked: true, labelValue: 3 }}
                  labelAdd={labelAdd}
                  onChange={(e) => handleChange(e, 3)}
                />
                <DateSec onChange={(e) => handleChange(e, 3)} />
                <FinalSelection onChecked={(e) => onInputChecked(e)} />
                <CommentSec
                  readonly={false}
                  onChange={(e) => handleChange(e, 3)}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
const ForPermission = ({
  handleChange,
  altEmail,
  onChangeAltMail,
  labelLayout,
  commChannels,
  onInputChecked,
  labelAdd,
  onCommChecked,
  optionType,
}) => {
  return (
    <div className="create-levels">
      <div className="category-level1">
        <form id="form2">
          <Row className="category-sec">
            <Col md={12}>
              <p>Level 1*</p>
            </Col>
          </Row>
          <CategorySec onChange={(e) => handleChange(e, 1)} />
          <DescriptionSec onChange={(e) => handleChange(e, 1)} />
          <EnableEmailSec
            altEmail={altEmail}
            onChange={(e) => onChangeAltMail()}
          />
          <DefaultCommunicationModes
            mail={commChannels.mail}
            post={commChannels.post}
            call={commChannels.call}
            sms={commChannels.sms}
            default={commChannels.default}
            onDefaultCommChecked={(e) => onCommChecked(e)}
            onChecked={(e) => onInputChecked(e)}
            onlyDelete={optionType === "Delete"}
          />
          <DateSec
            type={"text"}
            onChange={(e) => handleChange(e, 1)}
            onlyAddconditon={onlyAddconditon("Add")}
          />
          <CommentSec readonly={false} onChange={(e) => handleChange(e, 1)} />
        </form>
      </div>
      {labelLayout.map((layout, index) => {
        return (
          <div key={index}>
            {layout.labelClicked <= 2 && (
              <div className="category-level2">
                <Row className="category-sec">
                  <Col md={12}>
                    <p>Level 2*</p>
                  </Col>
                </Row>
                <CategorySec
                  onlyAdd={{ isClicked: true, labelValue: 2 }}
                  labelAdd={labelAdd}
                  onChange={(e) => handleChange(e, 2)}
                />
                <DescriptionSec onChange={(e) => handleChange(e, 2)} />
                <DateSec onChange={(e) => handleChange(e, 2)} />
                <CommentSec
                  readonly={false}
                  onChange={(e) => handleChange(e, 2)}
                />
              </div>
            )}
            {layout.labelClicked <= 3 && (
              <div className="category-level3">
                <Row className="category-sec">
                  <Col md={12}>
                    <p>Level 3*</p>
                  </Col>
                </Row>
                <CategorySec
                  onlyAdd={{ isClicked: true, labelValue: 3 }}
                  labelAdd={labelAdd}
                  onChange={(e) => handleChange(e, 3)}
                />
                <DescriptionSec onChange={(e) => handleChange(e, 3)} />
                <DateSec onChange={(e) => handleChange(e, 3)} />
                <FinalSelection onChecked={(e) => onInputChecked(e)} />
                <CommentSec
                  readonly={false}
                  onChange={(e) => handleChange(e, 3)}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
function AddNewCategory(props) {
  const [levelOneData, setLevelOneData] = useState({});
  const [levelTwoData, setLevelTwoData] = useState([]);
  const [levelThreeData, setLevelThreeData] = useState([]);
  const [preferencelevelOneData, setPreferenceLevelOneData] = useState({});
  const [preferencelevelTwoData, setPreferenceLevelTwoData] = useState([]);
  const [preferencelevelThreeData, setPreferenceLevelThreeData] = useState([]);
  const [levelFourData, setLevelFourData] = useState([]);
  const [levelFiveData, setLevelFiveData] = useState([]);
  const [altEmail, setAltMail] = useState(false);
  const [commChannels, setCommChannels] = useState({
    mail: false,
    post: false,
    call: false,
    sms: false,
    default: [],
  });

  const [{ Permission, Preference }, setCategory] = useState({
    Permission: true,
    Preference: false,
  });
  const [labelLayout, setLabelLayout] = useState([
    {
      labelClicked: 2,
    },
  ]);
  const [preferencelabelLayout, setPreferenceLabelLayout] = useState([
    {
      labelClicked: 2,
    },
  ]);

  const labelAdd = (e) => {
    const arr = [...labelLayout];
    arr.push({ labelClicked: e });
    setLabelLayout(arr);
  };
  const preferencelabelAdd = (e) => {
    const arr = [...preferencelabelLayout];
    arr.push({ labelClicked: e });
    setPreferenceLabelLayout(arr);
  };

  const handleChange = (e, level) => {
    if (Permission) {
      if (level === 1) {
        setLevelOneData({
          ...levelOneData,
          brand: props.brand,
          level: level,
          rank: level,
          enableAlternateEmailId: altEmail,
          [e.target.name]:
            e.target.type === "checked" ? e.target.checked : e.target.value,
          ...commChannels,
          subCategory: [],
        });
      } else if (level === 2) {
        setLevelTwoData({
          ...levelTwoData,
          [e.target.name]:
            e.target.type === "checked" ? e.target.checked : e.target.value,
          level: level,
          rank: labelLayout.length,
          subCategory: [],
        });
      } else if (level === 3) {
        setLevelThreeData({
          ...levelThreeData,
          [e.target.name]:
            e.target.type === "checked" ? e.target.checked : e.target.value,
          level: level,
          rank: labelLayout.length,
          subCategory: [],
        });
      } else if (level === 4) {
        setLevelFourData({
          ...levelFourData,
          [e.target.name]:
            e.target.type === "checked" ? e.target.checked : e.target.value,
          level: level,
          rank: labelLayout.length,
          subCategory: [],
        });
      } else {
        setLevelFiveData({
          ...levelFiveData,
          [e.target.name]:
            e.target.type === "checked" ? e.target.checked : e.target.value,
          level: level,
          rank: labelLayout.length,
        });
      }
    } else {
      if (level == 1) {
        setPreferenceLevelOneData({
          ...preferencelevelOneData,
          level: level,

          [e.target.name]:
            e.target.type === "checked" ? e.target.checked : e.target.value,
        });
      } else if (level == 2) {
        setPreferenceLevelTwoData({
          ...preferencelevelTwoData,
          [e.target.name]:
            e.target.type === "checked" ? e.target.checked : e.target.value,
          level: level,
          rank: labelLayout.length,
        });
      } else if (level == 3) {
        setPreferenceLevelThreeData({
          ...preferencelevelThreeData,
          [e.target.name]:
            e.target.type === "checked" ? e.target.checked : e.target.value,
          level: level,
          rank: labelLayout.length,
        });
      }
    }
  };

  const onInputChecked = (e) => {
    setCommChannels({
      ...commChannels,
      [e.target.id]: e.target.checked,
    });
  };

  const onCommChecked = (e) => {
    if (!e.target.checked) {
      const index = commChannels.default.indexOf(e.target.name);
      commChannels.default.splice(index, 1);
      setCommChannels({
        ...commChannels,
        default: [...Array.from(new Set(commChannels.default))],
      });
    } else {
      setCommChannels({
        ...commChannels,
        default: [...commChannels.default, e.target.name],
      });
    }
  };

  const onChangeAltMail = () => {
    setAltMail(!altEmail);
  };

  const onChangeCategory = (e) => {
    setCategory({
      [e.target.id]: e.target.checked,
    });
  };

  const onResetAll = () => {
    handleClose();
  };
  const handleClose = () => props.onClose();
  const onFormSubmit = async () => {
    const comments = [];
    levelOneData.startDate = dateFormat(levelOneData.startDate);
    levelTwoData.startDate = dateFormat(levelTwoData.startDate);
    levelThreeData.startDate = dateFormat(levelThreeData.startDate);
    levelOneData.endDate = dateFormat(levelOneData.endDate);
    levelTwoData.endDate = dateFormat(levelTwoData.endDate);
    levelThreeData.endDate = dateFormat(levelThreeData.endDate);

    let { adminMetaData: level1 } = jsondata({
      ...levelOneData,
      comments,
      func: "add",
    });
    let { adminMetaData: level2 } = jsondata({
      ...levelTwoData,
      comments,
      func: "add",
    });
    let { adminMetaData: level3 } = jsondata({
      ...levelThreeData,
      comments,
      func: "add",
    });
    level2 = { ...level2, subCategory: [level3] };
    level1 = { ...level1, subCategory: [level2] };
    const finalData = {
      adminMetaData: level1,
    };
    console.log(finalData.adminMetaData);
    const getMetaData = await AxiosCreateNewPost(finalData);
    console.log(getMetaData);
  };

  return (
    <Modal
      className="modalpopup modal-newcategory"
      show={props.show}
      onHide={onResetAll}
    >
      <Modal.Header closeButton>
        <p>Add New Category</p>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={8}>
            <ToggleButtonGroup
              className="category-options"
              name="alternative-email-toggle"
              type="radio"
            >
              <ToggleButton
                variant={Permission ? "dark" : "light"}
                name="permission-category"
                id="Permission"
                checked={Permission}
                type="radio"
                onChange={(e) => onChangeCategory(e)}
                value="Permission"
                className="shadow-none"
              >
                Permission
              </ToggleButton>

              <ToggleButton
                variant={Preference ? "dark" : "light"}
                name="alternative-email"
                id="Preference"
                type="radio"
                checked={Preference}
                onChange={(e) => onChangeCategory(e)}
                value="Preference"
                className="shadow-none"
              >
                Preference
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
          <Col md={4}>
            <div className="help-sec">
              <span className="help-icon">
                <FaRegQuestionCircle varient="red" />
              </span>
              <p>Help</p>
            </div>
            <div className="status-codes">
              <ul>
                <li className="live">Completed</li>
                <li className="pending-approval">In Progress</li>
                <li className="pending-go-live">In Complete</li>
                <li className="expiring-soon">Yet to Start</li>
              </ul>
            </div>
          </Col>
        </Row>
        {Permission && (
          <ForPermission
            handleChange={handleChange}
            altEmail={altEmail}
            onChangeAltMail={onChangeAltMail}
            labelLayout={labelLayout}
            commChannels={commChannels}
            onInputChecked={onInputChecked}
            labelAdd={labelAdd}
            onCommChecked={onCommChecked}
            optionType={props.optionType}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Container fluid className="button-options">
          <Button variant="primary" size="sm" onClick={() => onResetAll()}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="secondary"
            size="sm"
            onClick={(e) => onFormSubmit(e)}
          >
            Submit for Approval
          </Button>
        </Container>
      </Modal.Footer>
    </Modal>
  );
}

export default AddNewCategory;
