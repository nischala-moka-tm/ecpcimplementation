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

import CommunicationChannel from "../../CommunicationChannel/js/CommunicationChannel";

export const iterateComments = (comment) => {
  return `${comment.user} \n ${comment.time}  \n ${comment.comment}`;
};

export const editOrDelete = (optionType) => {
  return optionType ? optionType === "Edit" || optionType === "Delete" : false;
};

export function dateFormat(date) {
  return date !== "-" ? Moment(date).format("DD/MM/YYYY hh:mm:ss a") : "-";
}

export const editcondtion = (optionType) =>
  optionType === "Edit" ? "Update Permission" : "Delete Permission";

export const propcondition = (category) => {
  return {
    startDate: editOrDelete(category.optionType)
      ? Moment(category.category.startDate).format("YYYY-MM-DDTHH:mm")
      : "",
    endDate: editOrDelete(category.optionType)
      ? Moment(category.category.endDate).format("YYYY-MM-DDTHH:mm")
      : "",
    commentText:
      editOrDelete(category.optionType) && category.category.comments
        ? category.category.comments.map((d) => iterateComments(d))
        : "",
    editCommentText: "",
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
          name="alternative-email-toggle"
          type="radio"
        >
          <ToggleButton
            variant={props.altEmailYes ? "dark" : "light"}
            name="alternative-email"
            id="altEmailYes"
            checked={props.altEmailYes}
            type="radio"
            onChange={props.onChange}
            value="YES"
            className="shadow-none"
          >
            Yes
          </ToggleButton>

          <ToggleButton
            variant={props.altEmailNo ? "dark" : "light"}
            name="alternative-email"
            id="altEmailNo"
            type="radio"
            checked={props.altEmailNo}
            onChange={props.onChange}
            value="NO"
            className="shadow-none"
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
    <Row>
      <Col>
        <textarea
          placeholder="Comments"
          value={props.commentText}
          onChange={props.onChange}
          readOnly={props.readOnly}
        ></textarea>
      </Col>
    </Row>
  );
};

export const DateSec = (props) => {
  return (
    <Row className="date-wrap">
      <Col md={5}>
        <FormControl
          type={props.type}
          name="fromdate"
          id="fromdate"
          placeholder="Start date & Time*"
          onFocus={props.onFocus}
          required={true}
          onChange={props.onChange}
          value={props.startDate}
        />
      </Col>
      <Col md={5}>
        <FormControl
          type={props.type}
          name="todate"
          id="todate"
          placeholder="End Date & Time*"
          required={true}
          onFocus={props.onFocus}
          value={props.endDate}
          onChange={props.onChange}
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
              id="commchannel1"
              Checked={props.commchannel1}
              value={"1"}
              onChecked={props.onChecked}
              checkedimgSrc={"mail-white.svg"}
              imgSrc={"mail-dark.svg"}
              desc={"email"}
            />

            <CommunicationChannel
              id="commchannel2"
              Checked={props.commchannel2}
              value={"2"}
              onChecked={props.onChecked}
              checkedimgSrc={"post-white.svg"}
              imgSrc={"post-dark.svg"}
              desc={"post"}
            />

            <CommunicationChannel
              id="commchannel3"
              Checked={props.commchannel3}
              value={"3"}
              onChecked={props.onChecked}
              checkedimgSrc={"Icon feather-phone-call.png"}
              imgSrc={"Icon feather-phone-call-unchecked.png"}
              desc={"call"}
            />

            <CommunicationChannel
              id="commchannel4"
              Checked={props.commchannel4}
              value={"4"}
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
          <input name="email" type="checkbox" id="email" />
          <label htmlFor="email"></label>
          <input name="post" type="checkbox" id="post" />
          <label htmlFor="post"></label>
          <input name="call" type="checkbox" id="call" />
          <label htmlFor="call"></label>
          <input name="message" type="checkbox" id="message" />
          <label htmlFor="message"></label>
        </Col>
      </Row>
    </div>
  );
}

export const FinalSelection = (props) => {
  return (
    <Row className="selection">
      <Col md={12}>
        <input
          name="finallevel"
          type="checkbox"
          id="finallevel"
          onChange={props.handlChange}
        />
        <label htmlFor="finallevel">Is this final level</label>
      </Col>
    </Row>
  );
}

export const datevalue = "datetime-local";
