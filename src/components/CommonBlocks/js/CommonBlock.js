import React from "react";
import {
  Col,
  Row,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import Moment from "moment";
import { FaRegQuestionCircle } from "react-icons/fa";
import { BsCardImage } from "react-icons/bs";

import CommunicationChannel from "../../CommunicationChannel/js/CommunicationChannel";

export const datevalue = "datetime-local";

export const iterateComments = (comment) => {
  return `${comment.user} \n ${comment.time}  \n ${comment.comment}`;
};

export const editOrDelete = (optionType) => {
  return optionType ? optionType === "Edit" || optionType === "Delete" : false;
};

export function dateFormat(date) {
  return Moment(date).format("MM/DD/YYYY hh:mm:ss A");
}

export const editcondtion = (optionType) =>
  optionType === "Edit" ? "Update Permission" : "Delete Permission";

export const formatParentID = (id) => {
  return id.trim().replace(/ /g, "_").toUpperCase();
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
        ? category.category.comments.map((d) => iterateComments(d))
        : "",
    editCommentText: "",
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
    mail: false,
    post: false,
    call: false,
    sms: false,
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

export const jsondata = (categoryData) => {
  let resData = {
    level: categoryData.level,
    rank: categoryData.rank,
    createdBy: "user",
    createdDate: dateFormat(),
    startDate: dateFormat(categoryData.startDate).toString(),
    endDate: dateFormat(categoryData.endDate).toString(),
    comments: [
      {
        time: dateFormat(),
        user: "abc@xyz.com",
        comment: categoryData.commentText,
      },
    ],
  };
  if (categoryData.level === 1) {
    resData = {
      ...resData,
      brand: categoryData.brand,
      categoryName: categoryData.categoryname,
      enableAlternateEmailId: categoryData.enableAlternateEmailId,
    };
  } else if (categoryData.level === 2) {
    resData = {
      ...resData,
      subCategoryName: categoryData.categoryname,
      parentId: categoryData.parentId,
      modeOfCommunication: {
        email: categoryData.mail,
        mail: categoryData.post,
        call: categoryData.call,
        sms: categoryData.sms,
        default: [],
      },
    };
  } else {
    resData = {
      ...resData,
      subCategoryName: categoryData.categoryname,
      parentId: categoryData.parentId,
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
        >
          <ToggleButton
            variant={props.altEmail ? "dark" : "light"}
            value="YES"
            className="shadow-none"
            name="altEmail"
            id="altEmailYes"
            readOnly={props.onlyDelete}
          >
            Yes
          </ToggleButton>

          <ToggleButton
            variant={props.altEmail ? "light" : "dark"}
            value="NO"
            className="shadow-none"
            name="altEmail"
            id="altEmailNo"
            readOnly={props.onlyDelete}
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
            readOnly={props.editOrDelete}
            onChange={props.onChange}
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
          readOnly={props.onlyDelete}
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
          readOnly={props.onlyDelete}
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
          <ToggleButtonGroup type="checkbox">
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
      <Row className="default-mode">
        <Col md={6}>
          <p style={{ whiteSpace: "nowrap", fontSize: "13px" }}>
            Select default for new or guest customer<sup>*</sup>
          </p>
        </Col>
        <Col md={6}>
          <input name="email" type="checkbox" id="mailselected" />
          <label htmlFor="mailselected"></label>
          <input name="post" type="checkbox" id="postselected" />
          <label htmlFor="postselected"></label>
          <input name="call" type="checkbox" id="callselected" />
          <label htmlFor="callselected"></label>
          <input name="message" type="checkbox" id="smsselected" />
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
        <label htmlFor="car-image">
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
        <input name="finallevel" type="checkbox" id="finallevel" />
        <label htmlFor="finallevel">Is this final level</label>
      </Col>
    </Row>
  );
};
