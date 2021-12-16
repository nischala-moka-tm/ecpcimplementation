import React from "react";
import {
  Col,
  Row,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  Container,
  Button,
} from "react-bootstrap";

import Moment from "moment";
import MomentTimeZone from "moment-timezone";
import { FaRegQuestionCircle, FaPlus } from "react-icons/fa";
import { BsCardImage } from "react-icons/bs";
import CommunicationChannel from "../../CommunicationChannel/js/CommunicationChannel";
import { AxiosPost, AxiosPut } from "../../AxiosMethods/ApiCalls";

export const datevalue = "datetime-local";

export const iterateComments = (comment) => {
  return `${comment.user} \n ${comment.time}  \n ${comment.comment} \n \n`;
};

export const editOrDelete = (optionType) => {
  return optionType
    ? optionType === "Edit" || optionType === "Delete" || optionType === "View"
    : false;
};

export const deleteOrView = (optionType) => {
  return onlyDeleteconditon(optionType) || onlyView(optionType);
};

export function dateFormat(date) {
  return Moment(date).format("MM/DD/YYYY hh:mm:ss A");
}

export function cstDateFormat(date) {
  const cstdate = MomentTimeZone(date).tz("America/Regina");
  return Moment(cstdate).format("MM/DD/YYYY hh:mm:ss A");
}

export const onlyAddconditon = (optionType) => {
  return optionType === "Add";
};

export const onlyEditconditon = (optionType) => {
  return optionType === "Edit";
};

export const onlyDeleteconditon = (optionType) => {
  return optionType === "Delete";
};

export const onlyView = (optionType) => {
  return optionType === "View";
};

export const editcondtion = (optionType) => {
  if (onlyEditconditon(optionType)) {
    return "Update Permission";
  } else if (onlyView(optionType)) {
    return "View Permission";
  } else {
    return "Delete Permission";
  }
};

export const editcondtionPreference = (optionType) => {
  if (onlyEditconditon(optionType)) {
    return "Update Preference";
  } else if (onlyView(optionType)) {
    return "View Preference";
  } else {
    return "Delete Preference";
  }
};

export const formatParentID = (id) => {
  return id.trim().replace(/ /g, "_").toUpperCase();
};

export const forEachComments = (comments) => {
  let eachComment = "";
  comments.map((d) => (eachComment += iterateComments(d)));
  return eachComment;
};
export const propcondition = (category) => {
  return {
    level: category.level,
    rank: category.category.rank,
    brand: category.category.brand,
    createdBy: "user",
    createdDate: cstDateFormat(),
    startDate: editOrDelete(category.optionType)
      ? Moment(category.category.startDate).format("YYYY-MM-DDTHH:mm:ss")
      : "",
    endDate: editOrDelete(category.optionType)
      ? Moment(category.category.endDate).format("YYYY-MM-DDTHH:mm:ss")
      : "",
    commentText:
      editOrDelete(category.optionType) && category.category.comments
        ? forEachComments(category.category.comments)
        : "",
    editCommentText:
      editOrDelete(category.optionType) && category.category.editCommentText,
    status: category.category.status,
    description:
      editOrDelete(category.optionType) && category.category.description
        ? category.category.description
        : "",
  };
};

export const level1props = (props) => {
  return {
    categoryname: editOrDelete(props.optionType)
      ? props.category.categoryName
      : "",
    enableAlternateEmailId: props.category.enableAlternateEmailId,
    mail:
      editOrDelete(props.optionType) && props.category.modeOfCommunication
        ? props.category.modeOfCommunication.email
        : false,
    post:
      editOrDelete(props.optionType) && props.category.modeOfCommunication
        ? props.category.modeOfCommunication.mail
        : false,
    call:
      editOrDelete(props.optionType) && props.category.modeOfCommunication
        ? props.category.modeOfCommunication.call
        : false,
    sms:
      editOrDelete(props.optionType) && props.category.modeOfCommunication
        ? props.category.modeOfCommunication.sms
        : false,
    default:
      editOrDelete(props.optionType) && props.category.modeOfCommunication
        ? props.category.modeOfCommunication.default
        : [],
  };
};

export const levelcommonprops = (props) => {
  return {
    categoryname: editOrDelete(props.optionType)
      ? props.category.subCategoryName
      : "",
    parentId: props.category.id,
  };
};

export const levelDashboardCommonprops = (props) => {
  return {
    categoryname: editOrDelete(props.optionType)
      ? props.category.categoryName
      : "",
    parentId: props.category.id,
  };
};

export const getComments = (categoryData) => {
  return categoryData.func === "add"
    ? [
        {
          time: cstDateFormat(),
          user: "abc@xyz.com",
          comment: categoryData.commentText ? categoryData.commentText : "",
        },
      ]
    : [
        ...categoryData.comments,
        {
          time: cstDateFormat(),
          user: "abc@xyz.com",
          comment: categoryData.editCommentText
            ? categoryData.editCommentText
            : "",
        },
      ];
};
export const jsondata = (categoryData) => {
  let resData = {
    level: categoryData.level,
    rank: categoryData.rank ? categoryData.rank : 1,
    createdBy: "user",
    createdDate: cstDateFormat(),
    startDate: 
      categoryData.action === "save" && categoryData.startDate === "" ? 
        "" : cstDateFormat(categoryData.startDate).toString(),
    endDate: 
      categoryData.action === "save" && categoryData.endDate === "" ? 
        "" : cstDateFormat(categoryData.endDate).toString(),
    comments: getComments(categoryData),
    description: categoryData.description,
  };
  if (categoryData.level === 1) {
    resData = {
      ...resData,
      brand: categoryData.brand,
      categoryName: categoryData.categoryname,
      enableAlternateEmailId: categoryData.enableAlternateEmailId,
      modeOfCommunication: {
        email: categoryData.mail,
        mail: categoryData.post,
        call: categoryData.call,
        sms: categoryData.sms,
        default: categoryData.default,
      },
    };
    if (
      categoryData.level === 1 &&
      (categoryData.func === "edit" || categoryData.func === "delete")
    ) {
      resData = {
        ...resData,
        id: categoryData.id,
      };
    }
  } else {
    resData = {
      ...resData,
      subCategoryName: categoryData.categoryname,
    };
    if (categoryData.func === "add") {
      resData = {
        ...resData,
      };
      if (categoryData.parentId) {
        resData = {
          ...resData,
          parentId: categoryData.parentId,
        };
      }
    } else {
      resData = {
        ...resData,
        id: categoryData.parentId,
      };
    }
  }
  if (categoryData.func === "delete") {
    resData = {
      ...resData,
      status: categoryData.status,
      brand: categoryData.brand,
    };
  }
  
  return {
    adminMetaData: {
      ...resData,
    },
  };
};
export const jsondataForPreference = (categoryData) => {
  let resData = {
    level: categoryData.level,
    rank: categoryData.rank ? categoryData.rank : 1,
    createdBy: "user",
    createdDate: cstDateFormat(),
    startDate: cstDateFormat(categoryData.startDate).toString(),
    endDate: cstDateFormat(categoryData.endDate).toString(),
    subCategoryName: categoryData.categoryname,
    parentId: categoryData.parentId,
    comments: getComments(categoryData),
    description: categoryData.description,
  };
  if (categoryData.func === "edit" || categoryData.func === "delete") {
    resData = {
      ...resData,
      id: categoryData.id,
    };
  }
  if (categoryData.level === 4) {
    resData = {
      ...resData,
      imageFlag: categoryData.imageFlag,
      uploadImage: categoryData.uploadImage,
      isFinalLevel: categoryData.isFinalLevel,
    };
  }
  if (categoryData.func === "delete") {
    resData = {
      ...resData,
      status: categoryData.status,
      brand: categoryData.brand,
    };
  } else {
    resData = {
      ...resData,
    };
  }
  return {
    adminMetaData: {
      ...resData,
    },
  };
};
export const HelpSection = () => {
  return (
    <Col md={6}>
      <div className="help-sec">
        <span className="help-icon">
          <FaRegQuestionCircle varient="red" />
        </span>
        <p>Help</p>
      </div>
    </Col>
  );
};

export const CategorySec = (props) => {
  function buttonCliked(e) {
    props.labelAdd(props.onlyAdd.labelValue);
  }
  return (
    <Row className="category-sec">
      <Col md={10}>
        <FormControl
          type="text"
          name="categoryname"
          placeholder="Catergory Name*"
          required={true}
          value={props.category}
          onChange={props.onChange}
          readOnly={props.onlyDelete}
        />
      </Col>
      {props.onlyAdd?.isClicked ? (
        <Col md={2} className="add-icon">
          <button className="plusmenu-danger" onClick={(e) => buttonCliked(e)}>
            {<FaPlus />}
          </button>
        </Col>
      ) : (
        ""
      )}
    </Row>
  );
};

export const EnableEmailSec = (props) => {
  return (
    <Row>
      <Col md={5}>Enable alternate email address</Col>
      <Col md={5}>
        <ToggleButtonGroup
          className="email-options"
          name="altEmail"
          type="radio"
          value={props.altEmail ? "YES" : "NO"}
          onChange={props.onChange}
          readOnly={props.onlyDelete}
        >
          <ToggleButton
            variant={props.altEmail ? "dark" : "light"}
            value="YES"
            className="shadow-none"
            name="altEmail"
            id="altEmailYes"
          >
            Yes
          </ToggleButton>

          <ToggleButton
            variant={props.altEmail ? "light" : "dark"}
            value="NO"
            className="shadow-none"
            name="altEmail"
            id="altEmailNo"
          >
            No
          </ToggleButton>
        </ToggleButtonGroup>
      </Col>
    </Row>
  );
};

export const CommentSec = (props) => {
  return (
    <>
      <Row>
        <Col>
          <textarea
            placeholder="Comments*"
            name="commentText"
            value={props.commentText}
            readOnly={props.editOrDelete || props.onlyDelete}
            onChange={props.onChange}
            required={true}
          ></textarea>
        </Col>
      </Row>
      {props.editOrDelete && (
        <Row>
          <Col>
            <textarea
              placeholder="Comments*"
              name="editCommentText"
              value={props.editCommentText}
              onChange={props.onChange}
              required={true}
            ></textarea>
          </Col>
        </Row>
      )}
    </>
  );
};

export const DateSec = (props) => {
  return (
    <Row className="date-wrap">
      <Col md={5}>
        <FormControl
          type={props.type}
          name="startDate"
          id="startDate"
          placeholder="Start date & Time*"
          onFocus={(e) => (e.target.type = datevalue)}
          required={true}
          onChange={props.onChange}
          value={props.startDate}
          readOnly={props.onlyDelete || props.onlyView}
          min={props.onlyAddconditon ? Moment().format("YYYY-MM-DDTHH:mm") : ""}
        />
      </Col>
      <Col md={5}>
        <FormControl
          type={props.type}
          name="endDate"
          id="endDate"
          placeholder="End Date & Time*"
          required={true}
          onFocus={(e) => (e.target.type = datevalue)}
          value={props.endDate}
          onChange={props.onChange}
          readOnly={props.onlyView}
          min={props.onlyDelete ? Moment().format("YYYY-MM-DDTHH:mm") : ""}
        />
      </Col>
    </Row>
  );
};

export const DefaultCommunications = ({
  name,
  id,
  onDefaultCommChecked,
  onlyDelete,
  defaultChecked,
}) => {
  return (
    <>
      <input
        name={name}
        type="checkbox"
        id={id}
        readOnly={onlyDelete}
        onChange={onDefaultCommChecked}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={id}></label>
    </>
  );
};

export const DefaultCommunicationModes = (props) => {
  const checkDefaultComm = (paramvalue) => {
    return props.default.some((d) => d === paramvalue);
  };

  return (
    <div className="select-default-modes" readOnly={props.onlyDelete}>
      <Row className="comm-mode">
        <Col md={6}>
          <p style={{ whiteSpace: "nowrap", fontSize: "14px" }}>
            Mode of communication allowed<sup>*</sup>
          </p>
        </Col>
        <Col md={6}>
          <ToggleButtonGroup type="checkbox">
            <CommunicationChannel
              id="mail"
              Checked={props.mail}
              value={"Mail"}
              onChecked={props.onChecked}
              checkedimgSrc={"mail-white.svg"}
              imgSrc={"mail-dark.svg"}
              desc={"Mail"}
            />

            <CommunicationChannel
              id="post"
              Checked={props.post}
              value={"Post"}
              onChecked={props.onChecked}
              checkedimgSrc={"post-white.svg"}
              imgSrc={"post-dark.svg"}
              desc={"Post"}
            />

            <CommunicationChannel
              id="call"
              Checked={props.call}
              value={"Call"}
              onChecked={props.onChecked}
              checkedimgSrc={"Icon feather-phone-call.png"}
              imgSrc={"Icon feather-phone-call-unchecked.png"}
              desc={"Call"}
            />

            <CommunicationChannel
              id="sms"
              Checked={props.sms}
              value={"SMS"}
              onChecked={props.onChecked}
              checkedimgSrc={"msg-icon-checked.png"}
              imgSrc={"Icon material-textsms.png"}
              desc={"SMS"}
            />
          </ToggleButtonGroup>
        </Col>
      </Row>
      <Row className="default-mode">
        <Col md={6}>
          <p style={{ whiteSpace: "nowrap", fontSize: "13px" }}>
            Select default for new or guest customer<sup>*</sup>
          </p>
        </Col>
        <Col md={6}>
          <DefaultCommunications
            name="email"
            id="mailselected"
            onlyDelete={props.onlyDelete}
            onDefaultCommChecked={props.onDefaultCommChecked}
            defaultChecked={checkDefaultComm("email")}
          />
          <DefaultCommunications
            name="post"
            id="postselected"
            onlyDelete={props.onlyDelete}
            onDefaultCommChecked={props.onDefaultCommChecked}
            defaultChecked={checkDefaultComm("post")}
          />
          <DefaultCommunications
            name="call"
            id="callselected"
            onlyDelete={props.onlyDelete}
            onDefaultCommChecked={props.onDefaultCommChecked}
            defaultChecked={checkDefaultComm("call")}
          />
          <DefaultCommunications
            name="sms"
            id="smsselected"
            onlyDelete={props.onlyDelete}
            onDefaultCommChecked={props.onDefaultCommChecked}
            defaultChecked={checkDefaultComm("sms")}
          />
        </Col>
      </Row>
    </div>
  );
};

export const ImageSec = (props) => {
  return (
    <Row className="image-upload">
      <Col md={4}>
        <label htmlFor="car-image" readOnly={props.onlyDelete}>
          <BsCardImage /> Upload Image
        </label>
      </Col>
      <Col md={6}>
        <FormControl
          type="file"
          id="car-image"
          name="car-image"
          accept="image/png, image/jpeg"
          onChange={props.fileChangedHandler}
          readOnly={props.onlyDelete}
        />
      </Col>
    </Row>
  );
};
export const FinalSelection = (props) => {
  return (
    <Row className="selection">
      <Col md={12}>
        <FormControl
          name="isFinalLevel"
          type="checkbox"
          id="isFinalLevel"
          defaultChecked={props.onChecked}
          readOnly={props.onlyDelete}
        />
        <label htmlFor="isFinalLevel">Is this final level</label>
      </Col>
    </Row>
  );
};

export const DescriptionSec = (props) => {
  return (
    <Row>
      <Col>
        <textarea
          placeholder="Add the Description here.."
          name="description"
          defaultValue={props.description}
          readOnly={props.onlyDelete}
          onChange={props.onChange}
        ></textarea>
      </Col>
    </Row>
  );
};

export const ButtonSec = (props) => {
  return (
    <>
      {props.optionType !== "View" && (
        <Container fluid className="button-options">
          <Button variant="primary" size="sm" onClick={() => props.onClose()}>
            Cancel
          </Button>

          {!editOrDelete(props.optionType) && (
            <Button variant="primary" size="sm" onClick={props.onSaveClick}>
              Save for Later
            </Button>
          )}
          <Button type="submit" variant="secondary" size="sm">
            {props.optionType === "Delete"
              ? "Submit Delete for Approval"
              : "Submit for Approval"}
          </Button>
        </Container>
      )}
    </>
  );
};

export const apicall = async (
  finaldata,
  func,
  onclose,
  notify,
  brand,
  action,
  leveltype
) => {
  const type = finaldata.adminMetaData.level === 1 ? leveltype : "subCategory";
  const postData = { finaldata, type, brand, action };
  let resText = "";
  const result =
    func === "add" ? await AxiosPost(postData) : await AxiosPut(postData);
  if (result.code === "200") {
    onclose();
    resText = result.messages[0].description;
    notify(resText, "success");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  } else {
    result.messages.map((i) => {
      resText += `${i.description}\n`;
    });
    notify(resText, "error");
  }
};

export const DeleteText = (props) => {
  return (
    <p className="delete-txt">
      {onlyDeleteconditon(props.optionType) &&
        "Deleting this item will delete from production and remove any levels under it. To proceed please enter end date, enter comments and submit delete for approval."}
    </p>
  );
};
