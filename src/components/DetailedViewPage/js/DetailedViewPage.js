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
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { CommentSec, DescriptionSec } from "../../CommonBlocks/js/CommonBlock";
import { LoadingCog } from "react-bootstrap-floating-label";

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
          {props.loading ? props.loading :
            <p className="plusmenu-danger" onClick={() => setSubC1(!SubC1)}>
              {props.expandContent || SubC1 ? <FaMinusCircle /> : <FaPlusCircle />}
              {props.categoryName}
            </p>}
        </Col>
      </Row>
      {(props.expandContent || SubC1) && (
        <div className="sub-wrap">
          <div className="demoBoarder">
            <DescriptionSec DescriptionText={props.description} />
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
            <DateBlock startDate={props.startDate} endDate={props.endDate} readOnly />
            <CommentSec
              commentText={forEachComments(props.comments)}
              onChange={(e) => e.preventDefault()}
              readOnly />
          </div>
          {props.subCategory &&
            props.subCategory.map((subdata, key) => {
              return <Level2 key={key} {...subdata} expandContent={props.expandContent} />;
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
            {props.expandContent || SubC2 ? <FaMinusCircle /> : <FaPlusCircle />}
            {props.subCategoryName}
          </p>
        </Col>
      </Row>
      {(props.expandContent || SubC2) && (
        <div className="sub-wrap">
          <div className="demoBoarder">
          <DescriptionSec DescriptionText={props.description} />
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
                      Checked=
                      {props.modeOfCommunication === undefined ? false : props.modeOfCommunication.email}
                      value={"Email"}
                      checkedimgSrc={"mail-white.svg"}
                      imgSrc={"mail-dark.svg"}
                      desc={"email"}
                      readOnly
                    />

                    <CommunicationChannel
                      id="post"
                      Checked=
                      {props.modeOfCommunication === undefined ? false : props.modeOfCommunication.mail}
                      value={"Post"}
                      checkedimgSrc={"post-white.svg"}
                      imgSrc={"post-dark.svg"}
                      desc={"post"}
                      readOnly
                    />

                    <CommunicationChannel
                      id="call"
                      Checked=
                      {props.modeOfCommunication === undefined ? false : props.modeOfCommunication.call}
                      value={"Call"}
                      checkedimgSrc={"Icon feather-phone-call.png"}
                      imgSrc={"Icon feather-phone-call-unchecked.png"}
                      desc={"call"}
                      readOnly
                    />

                    <CommunicationChannel
                      id="sms"
                      Checked=
                      {props.modeOfCommunication === undefined ? false : props.modeOfCommunication.sms}
                      value={"SMS"}
                      checkedimgSrc={"msg-icon-checked.png"}
                      imgSrc={"Icon material-textsms.png"}
                      desc={"SMS"}
                      readOnly
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
                    checked={props.modeOfCommunication === undefined ? false : props.modeOfCommunication.email}
                    readOnly={true}
                  />
                  <label htmlFor="email"></label>
                  <input
                    name="post"
                    type="checkbox"
                    id="post"
                    checked={props.modeOfCommunication === undefined ? false : props.modeOfCommunication.mail}
                    readOnly={true}
                  />
                  <label htmlFor="post"></label>
                  <input
                    name="call"
                    type="checkbox"
                    id="call"
                    checked={props.modeOfCommunication === undefined ? false : props.modeOfCommunication.call}
                    readOnly={true}
                  />
                  <label htmlFor="call"></label>
                  <input
                    name="message"
                    type="checkbox"
                    id="message"
                    checked={props.modeOfCommunication === undefined ? false : props.modeOfCommunication.sms}
                    readOnly={true}
                  />
                  <label htmlFor="message"></label>
                </Col>
              </Row>
            </div>
          )}
          <CommentSec 
          commentText={forEachComments(props.comments)}
          onChange={(e) => e.preventDefault()}
          readOnly={true} />
          </div>
          {props.subCategory &&
            props.subCategory.map((subdata, key) => {
              return <Level3 key={key} {...subdata} expandContent={props.expandContent} />;
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
            {props.expandContent || SubC3 ? <FaMinusCircle /> : <FaPlusCircle />}
            {props.subCategoryName}
          </p>
        </Col>
      </Row>
      {(props.expandContent || SubC3) && (
        <div className="sub-wrap">
          <div className="demoBoarder">
          <DescriptionSec DescriptionText={props.description} />
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
          <CommentSec 
            commentText={forEachComments(props.comments)}
            onChange={(e) => e.preventDefault()}
            readOnly />
          </div>
          {props.subCategory &&
            props.subCategory.map((subdata, key) => {
              return <Level3 key={key} {...subdata} expandContent={props.expandContent} />;
            })}
        </div>
      )}
    </div>
  );
};

function DetailedViewPage(props) {
  const handleClose = () => props.onClose();
  const [text, setText] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [detailedCategoryList, setDetailedCategoryList] = useState([]);
  const handleExpand = () => {
    setText(!text);
  };
  useEffect(() => {
    getApiCall();
  }, [props.brand, "metaDataList"]);
  const getApiCall = () => {
    setLoading(true);
    const getDataApi = AxiosGet({
      brand: props.brand,
      type: "metaDataList"
    });
    getDataApi.then((result) => {
      setLoading(false);
      setDetailedCategoryList(result.data.data);
    });
  };

  return (
    <Modal
      className="modalpopup modal-detailedview"
      show={props.show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <p>Detailed View</p>
      </Modal.Header>
      <Modal.Body>
        <p className="collapse-fun" onClick={() => handleExpand()}>
          {text ? "Collapse All" : "Expand All"}
        </p>


        {isLoading ? <Level1 loading={"Loading..."} />
          : detailedCategoryList.map((data, key) => {
            return props.category.categoryName==data.categoryName && <Level1 key={key} {...data} expandContent={text}/>;
          })}
      </Modal.Body>
    </Modal>
  );
}

export default DetailedViewPage;
