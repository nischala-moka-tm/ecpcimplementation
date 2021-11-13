import React, { useState } from "react";
import {
  FormControl,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Container,
  ToggleButtonGroup,
} from "react-bootstrap";
import CommunicationChannel from "../../CommunicationChannel/js/CommunicationChannel";
import "../scss/AddPermissionLevel2.scss";
import { AxiosPost } from "../../AxiosMethods/ApiCalls";

import {
  editOrDelete,
  dateFormat,
  datevalue,
  editcondtion,
  propcondition,
  HelpSection,
  CategorySec,
  DefaultCommunicationModes,
  DateSec,
  CommentSec,
} from "../../CommonBlocks/js/CommonBlock";

function AdminCreateNewPermission2(props) {
  console.log(props);

  const onResetAll = () => {
    handleClose();
  };

  const handleClose = () => props.onClose();
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const [commchannel1, setchannel1] = useState(false);
  const [commchannel2, setchannel2] = useState(false);
  const [commchannel3, setchannel3] = useState(false);
  const [commchannel4, setchannel4] = useState(false);

  const [subCategory, setSubCategory] = useState(
    editOrDelete(props.optionType) ? props.category.subCategoryName : ""
  );

  const [startDate, setStartDate] = useState(propcondition(props).startDate);
  const [endDate, setEndDate] = useState(propcondition(props).endDate);
  const [commentText, setCommentText] = useState(
    propcondition(props).commentText
  );
  const [editCommentText, setEditCommentText] = useState(
    propcondition(props).editCommentText
  );

  const handleSubmit = (e) => {
    setSubCategory(subCategory);
    setStartDate(dateFormat(startDate));
    setEndDate(dateFormat(endDate));
    setCommentText(commentText);
    console.log(subCategory);
    console.log(startDate);
    console.log(endDate);
    console.log(commentText);
    console.log(editCommentText);
    const jsondata = {
      adminMetaData: {
        subCategoryName: "Service Communications",
        parentId: "MARKETING",
        level: 2,
        rank: 2,
        startDate: "01/12/2021 10:00 AM",
        endDate: "01/12/2021 10:00 AM",
        comments: [
          {
            time: "09/07/2021 08:33pm",
            user: "abc@xyz.com",
            comment: "Test Sample Comment 1",
          },
        ],
      },
    };

    const type = "subCategory";
    AxiosPost({ jsondata, type });
  };

  return (
    <Modal
      className="modalpopup modal-permissionlevel2"
      show={props.show}
      onHide={onResetAll}
    >
      <Modal.Header closeButton>
        <p>
          {props.optionType === "Add"
            ? "Add New Permission"
            : editcondtion(props.optionType)}
        </p>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <p>Level {props.category.level}</p>
          </Col>
          <HelpSection />
        </Row>
        <Form id="form1" onSubmit={onSubmit}>
          {/* <Row className="category-sec">
            <Col md={10}>
              <FormControl
                type="text"
                name="categoryname"
                placeholder="Sub Category Name*"
                required={true}
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </Col>
          </Row> */}
          <CategorySec
            category={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          />
          {/* <div className="select-default-modes">
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
                    Checked={commchannel1}
                    value={"1"}
                    onChecked={(e) => setchannel1(e.currentTarget.checked)}
                    checkedimgSrc={"mail-white.svg"}
                    imgSrc={"mail-dark.svg"}
                    desc={"email"}
                  />

                  <CommunicationChannel
                    id="commchannel2"
                    Checked={commchannel2}
                    value={"2"}
                    onChecked={(e) => setchannel2(e.currentTarget.checked)}
                    checkedimgSrc={"post-white.svg"}
                    imgSrc={"post-dark.svg"}
                    desc={"post"}
                  />

                  <CommunicationChannel
                    id="commchannel3"
                    Checked={commchannel3}
                    value={"3"}
                    onChecked={(e) => setchannel3(e.currentTarget.checked)}
                    checkedimgSrc={"Icon feather-phone-call.png"}
                    imgSrc={"Icon feather-phone-call-unchecked.png"}
                    desc={"call"}
                  />

                  <CommunicationChannel
                    id="commchannel4"
                    Checked={commchannel4}
                    value={"4"}
                    onChecked={(e) => setchannel4(e.currentTarget.checked)}
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
          </div> */}
          <DefaultCommunicationModes />
          {/* <Row className="date-wrap">
            <Col md={5}>
              <FormControl
                type={editOrDelete(props.optionType) ? datevalue : "text"}
                name="fromdate"
                id="fromdate"
                placeholder="Start Date & Time*"
                onFocus={(e) => (e.target.type = datevalue)}
                required={true}
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
              />
            </Col>
            <Col md={5}>
              <FormControl
                type={editOrDelete(props.optionType) ? datevalue : "text"}
                name="todate"
                id="todate"
                placeholder="End Date & Time*"
                onFocus={(e) => (e.target.type = datevalue)}
                required={true}
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
              />
            </Col>
          </Row> */}
          <DateSec
            startDate={startDate}
            endDate={endDate}
            onFocus={(e) => (e.target.type = datevalue)}
            //onChange={(e) => setEndDate(e.target.value)}
          />
          {/* <Row>
            <Col>
              <textarea
                name="commentSec"
                placeholder="Comments*"
                required={true}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                readOnly={editOrDelete(props.optionType)}
              ></textarea>
            </Col>
          </Row> */}
          <CommentSec />
          {editOrDelete(props.optionType) && (
            <Row>
              <Col>
                <textarea
                  placeholder="Comments"
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                ></textarea>
              </Col>
            </Row>
          )}
          <Container fluid className="button-options">
            <Button variant="primary" size="sm" onClick={() => onResetAll()}>
              Cancel
            </Button>

            {!editOrDelete(props.optionType) && (
              <Button variant="primary" size="sm">
                Save for Later
              </Button>
            )}
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              onClick={(e) => handleSubmit(e)}
            >
              Submit for Approval
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default AdminCreateNewPermission2;
