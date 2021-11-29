import React, { useState, useEffect } from "react";
import {
  FormControl,
  Row,
  Col,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import "../scss/DetailedViewPage.scss";
import { AxiosGet } from "../../AxiosMethods/ApiCalls";

import CommunicationChannel from "../../CommunicationChannel/js/CommunicationChannel";
import DetailedCategoryList from "./DetailedCategoryList";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { CommentSec } from "../../CommonBlocks/js/CommonBlock";

const DateBlock = (props) => {
  return (
    <Row className="date-wrap">
      <Col md={5}>
        <FormControl
          type="text"
          name="fromdate"
          id="fromdate"
          placeholder="Start date & Time*"
          value={props.startDate}
          readOnly
        />
      </Col>
      <Col md={5}>
        <FormControl
          type="text"
          name="todate"
          id="todate"
          placeholder="End Date & Time*"
          value={props.endDate}
          readOnly
        />
      </Col>
    </Row>
  );
};
const iterateComments = (comment) => {
  return `${comment.user} \n ${comment.time}  \n ${comment.comment} \n \n`;
};
const forEachComments = (comments) => {
  let eachComment = "";
  comments.map((d) => (eachComment += iterateComments(d)));
  return eachComment;
};
const Level1 = (props) => {
  const [SubC1, setSubC1] = useState(false);
  
  return (
    <div className="level1">
      <Row className="category-sec">
        <Col md={12}>
          <p className="plusmenu-danger" onClick={() => setSubC1(!SubC1)}>
            {SubC1 ? <FaMinusCircle /> : <FaPlusCircle />}
            {props.categoryName}
          </p>
        </Col>
      </Row>
      {SubC1 && (
        <div className="sub-wrap">
          <Row>
            <Col md={5}>Enable alternate email address</Col>
            <Col md={5}>
              <ToggleButtonGroup
                className="email-options"
                name="alternative-email-toggle"
                type="radio"
              >
                <ToggleButton
                  variant={props.enableAlternateEmailId ? "dark" : "light"}
                  name="alternative-email"
                  id="altEmailYes"
                  checked={props.enableAlternateEmailId}
                  type="radio"
                  value="YES"
                  className="shadow-none"
                  readOnly={true}
                >
                  Yes
                </ToggleButton>

                <ToggleButton
                  variant={props.enableAlternateEmailId ? "light" : "dark"}
                  name="alternative-email"
                  id="altEmailNo"
                  type="radio"
                  checked={props.enableAlternateEmailId}
                  value="NO"
                  className="shadow-none"
                  readOnly={true}
                >
                  No
                </ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>
          <DateBlock startDate={props.startDate} endDate={props.endDate} readOnly/>
          <CommentSec commentText={forEachComments(props.comments)} readOnly/>

          {props.subCategory &&
            props.subCategory.map((subdata, key) => {
              return <Level2 key={key} {...subdata} />;
            })}
        </div>
      )}
    </div>
  );
};

const Level2 = (props) => {
  const [SubC2, setSubC2] = useState(false);
  return (
    <div className="level2">
      <Row className="category-sec">
        <Col md={12}>
          <p className="plusmenu-danger" onClick={() => setSubC2(!SubC2)}>
            {SubC2 ? <FaMinusCircle /> : <FaPlusCircle />}
            {props.subCategoryName}
          </p>
        </Col>
      </Row>
      {SubC2 && (
        <div className="sub-wrap">
          <DateBlock startDate={props.startDate} endDate={props.endDate} />
          {props.subCategoryName !== "Preferences" && (
            <div className="select-default-modes">
              <Row className="comm-mode">
                <Col md={6}>
                  Mode of communication<sup>*</sup>
                </Col>
                <Col md={6}>
                  <ToggleButtonGroup type="checkbox">
                    <CommunicationChannel
                      id="mail"
                      Checked={props.modeOfCommunication.email}
                      value={"1"}
                      checkedimgSrc={"mail-white.svg"}
                      imgSrc={"mail-dark.svg"}
                      desc={"email"}
                    />

                    <CommunicationChannel
                      id="post"
                      Checked={props.modeOfCommunication.mail}
                      value={"2"}
                      checkedimgSrc={"post-white.svg"}
                      imgSrc={"post-dark.svg"}
                      desc={"post"}
                      readOnly
                    />

                    <CommunicationChannel
                      id="call"
                      Checked={props.modeOfCommunication.call}
                      value={"3"}
                      checkedimgSrc={"Icon feather-phone-call.png"}
                      imgSrc={"Icon feather-phone-call-unchecked.png"}
                      desc={"call"}
                    />

                    <CommunicationChannel
                      id="sms"
                      Checked={props.modeOfCommunication.sms}
                      value={"4"}
                      checkedimgSrc={"msg-icon-checked.png"}
                      imgSrc={"Icon material-textsms.png"}
                      desc={"SMS"}
                    />
                  </ToggleButtonGroup>
                </Col>
              </Row>
              <Row className="default-mode">
                <Col md={6}>
                  Select default for new or guest customer<sup>*</sup>
                </Col>
                <Col md={6}>
                  <input
                    name="email"
                    type="checkbox"
                    id="email"
                    checked={props.modeOfCommunication.email} 
                  />
                  <label htmlFor="email"></label>
                  <input
                    name="post"
                    type="checkbox"
                    id="post"
                    checked={props.modeOfCommunication.mail}
                  />
                  <label htmlFor="post"></label>
                  <input
                    name="call"
                    type="checkbox"
                    id="call"
                    checked={props.modeOfCommunication.call}
                  />
                  <label htmlFor="call"></label>
                  <input
                    name="message"
                    type="checkbox"
                    id="message"
                    checked={props.modeOfCommunication.sms}
                  />
                  <label htmlFor="message"></label>
                </Col>
              </Row>
            </div>
          )}
          <CommentSec commentText={forEachComments(props.comments)} readOnly/>
          {props.subCategory &&
            props.subCategory.map((subdata, key) => {
              return <Level3 key={key} {...subdata} />;
            })}
        </div>
      )}
    </div>
  );
};

const Level3 = (props) => {
  const [SubC3, setSubC3] = useState(false);
  return (
    <div className="level3">
      <Row className="category-sec">
        <Col md={12}>
          <p className="plusmenu-danger" onClick={() => setSubC3(!SubC3)}>
            {SubC3 ? <FaMinusCircle /> : <FaPlusCircle />}
            {props.subCategoryName}
          </p>
        </Col>
      </Row>
      {SubC3 && (
        <div className="sub-wrap">
          <Row className="date-wrap">
            <Col md={5}>
              <FormControl
                type="text"
                name="fromdate"
                id="fromdate"
                placeholder="Start date & Time*"
                value={props.startDate}
                readOnly
              />
            </Col>
            <Col md={5}>
              <FormControl
                type="text"
                name="todate"
                id="todate"
                placeholder="End Date & Time*"
                value={props.endDate}
                readOnly
              />
            </Col>
          </Row>
          <CommentSec commentText={forEachComments(props.comments)} readOnly/>
          {props.subCategory &&
            props.subCategory.map((subdata, key) => {
              return <Level3 key={key} {...subdata} />;
            })}
        </div>
      )}
    </div>
  );
};

function DetailedViewPage(props) {
  console.log(props);
  const handleClose = () => props.onClose();
  const [text, setText] = useState(true);
  const [detailedCategoryList, setDetailedCategoryList] = useState([]);
  const handleExpand = () => {
    setText(!text);
    // setSubC1(true);
  };
  useEffect(() => {
    getApiCall();
  }, [props.brand, "metaDataList"]);
  const getApiCall = () => {
    const getDataApi = AxiosGet({
      brand: props.brand,
      type: "metaDataList"
    });
    getDataApi.then((result) => {
      result.data.data && LoadData(result.data.data);
      // console.log(result);
    });
  };
  const LoadData = (data) => {
    setDetailedCategoryList(data);
  };
  console.log(detailedCategoryList);
  return (
    <Modal
      className="modalpopup modal-detailedview"
      show={props.show && detailedCategoryList}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <p>Detailed View</p>
      </Modal.Header>
      <Modal.Body>
        <p className="collapse-fun" onClick={() => handleExpand()}>
          {text ? "Expand All" : "Collapse All"}
        </p>

        {/* {DetailedCategoryList[0].metadataListExpectedResult.map((data, key) => {
          return <Level1 key={key} {...data} />;
        })} */}
        {detailedCategoryList.map((data, key) => {
          return <Level1 key={key} {...data} expandContent={text}/>;
        })} 
      </Modal.Body>
    </Modal>
      );
}

export default DetailedViewPage;
