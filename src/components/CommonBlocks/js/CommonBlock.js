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
    createdBy: "user",
    createdDate: dateFormat(),
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
  };
};

export const level1props = (props) => {
  return {
    brand: props.brand,
    categoryname: editOrDelete(props.optionType)
      ? props.category.categoryName
      : "",
    enableAlternateEmailId: false,
  };
};

export const level2props = (props) => {
  return {
    categoryname: editOrDelete(props.optionType)
      ? props.category.subCategoryName
      : "",
    mail: editOrDelete(props.optionType)
      ? props.category.modeOfCommunication.email
      : false,
    post: editOrDelete(props.optionType)
      ? props.category.modeOfCommunication.mail
      : false,
    call: editOrDelete(props.optionType)
      ? props.category.modeOfCommunication.call
      : false,
    sms: editOrDelete(props.optionType)
      ? props.category.modeOfCommunication.sms
      : false,
    parentId: props.category.id,
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
          time: dateFormat(),
          user: "abc@xyz.com",
          comment: categoryData.commentText,
        },
      ]
    : [
        ...categoryData.comments,
        {
          time: dateFormat(),
          user: "abc@xyz.com",
          comment: categoryData.editCommentText,
        },
      ];
};
export const jsondata = (categoryData) => {
  let resData = {
    level: categoryData.level,
    rank: categoryData.rank ? categoryData.rank : 1,
    createdBy: "user",
    createdDate: dateFormat(),
    startDate: dateFormat(categoryData.startDate).toString(),
    endDate: dateFormat(categoryData.endDate).toString(),
    comments: getComments(categoryData),
  };
  if (categoryData.level === 1) {
    resData = {
      ...resData,
      brand: categoryData.brand,
      categoryName: categoryData.categoryname,
      enableAlternateEmailId: categoryData.enableAlternateEmailId,
    };
    if (categoryData.level === 1 && categoryData.func === "edit") {
      resData = {
        ...resData,
        id: categoryData.id,
      };
    }
  } else if (categoryData.level === 2) {
    resData = {
      ...resData,
      subCategoryName: categoryData.categoryname,
      modeOfCommunication: {
        email: categoryData.mail,
        mail: categoryData.post,
        call: categoryData.call,
        sms: categoryData.sms,
        default: [],
      },
    };
    if (categoryData.func === "add") {
      resData = {
        ...resData,
        parentId: categoryData.parentId,
      };
    } else {
      resData = {
        ...resData,
        id: categoryData.parentId,
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
        parentId: categoryData.parentId,
      };
    } else {
      resData = {
        ...resData,
        id: categoryData.parentId,
      };
    }
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
    createdDate: dateFormat(),
    startDate: dateFormat(categoryData.startDate).toString(),
    endDate: dateFormat(categoryData.endDate).toString(),
    subCategoryName: categoryData.categoryname,
    parentId: categoryData.parentId,
    comments: getComments(categoryData),
  };
  if (categoryData.func === "edit") {
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
    console.log(e);
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
        />
      </Col>
    </Row>
  );
};

export const DefaultCommunicationModes = (props) => {
  return (
    <div className="select-default-modes">
      <Row className="comm-mode">
        <Col md={6}>
          <p style={{ whiteSpace: "nowrap", fontSize: "14px" }}>
            Mode of communication allowed<sup>*</sup>
          </p>
        </Col>
        <Col md={6}>
          <ToggleButtonGroup type="checkbox" readOnly={props.onlyDelete}>
            <CommunicationChannel
              id="mail"
              Checked={props.mail}
              value={"mail"}
              onChecked={props.onChecked}
              checkedimgSrc={"mail-white.svg"}
              imgSrc={"mail-dark.svg"}
              desc={"mail"}
            />

            <CommunicationChannel
              id="post"
              Checked={props.post}
              value={"post"}
              onChecked={props.onChecked}
              checkedimgSrc={"post-white.svg"}
              imgSrc={"post-dark.svg"}
              desc={"post"}
            />

            <CommunicationChannel
              id="call"
              Checked={props.call}
              value={"call"}
              onChecked={props.onChecked}
              checkedimgSrc={"Icon feather-phone-call.png"}
              imgSrc={"Icon feather-phone-call-unchecked.png"}
              desc={"call"}
            />

            <CommunicationChannel
              id="sms"
              Checked={props.sms}
              value={"sms"}
              onChecked={props.onChecked}
              checkedimgSrc={"msg-icon-checked.png"}
              imgSrc={"Icon material-textsms.png"}
              desc={"sms"}
            />
          </ToggleButtonGroup>
        </Col>
      </Row>
      <Row className="default-mode" readOnly={props.onlyDelete}>
        <Col md={6}>
          <p style={{ whiteSpace: "nowrap", fontSize: "13px" }}>
            Select default for new or guest customer<sup>*</sup>
          </p>
        </Col>
        <Col md={6}>
          <input
            name="email"
            type="checkbox"
            id="mailselected"
            readOnly={props.onlyDelete}
          />
          <label htmlFor="mailselected"></label>
          <input
            name="post"
            type="checkbox"
            id="postselected"
            readOnly={props.onlyDelete}
          />
          <label htmlFor="postselected"></label>
          <input
            name="call"
            type="checkbox"
            id="callselected"
            readOnly={props.onlyDelete}
          />
          <label htmlFor="callselected"></label>
          <input
            name="message"
            type="checkbox"
            id="smsselected"
            readOnly={props.onlyDelete}
          />
          <label htmlFor="smsselected"></label>
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
          onChange={props.onChange}
          readOnly={props.onlyDelete}
        />
        <label htmlFor="isFinalLevel">Is this final level</label>
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
            <Button variant="primary" size="sm">
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

export const apicall = async (finaldata, func, onclose, notify, brand) => {
  const postData = { finaldata, type: "subCategory", brand };
  let resText = "";
  const result =
    func === "add" ? await AxiosPost(postData) : await AxiosPut(postData);
  if (result.code === "200") {
    onclose();
    resText = result.messages[0].description;
    notify(resText, "success");
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
