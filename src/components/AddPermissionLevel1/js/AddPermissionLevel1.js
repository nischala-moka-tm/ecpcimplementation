import React, { useState } from "react";
import { Button, Row, Col, Modal, Container } from "react-bootstrap";
import "../scss/AddPermissionLevel1.scss";
import {
  editOrDelete,
  dateFormat,
  datevalue,
  editcondtion,
  propcondition,
  HelpSection,
  CategorySec,
  EnableEmailSec,
  DateSec,
  CommentSec,
  formatParentID,
} from "../../CommonBlocks/js/CommonBlock";
import { AxiosPost } from "../../AxiosMethods/ApiCalls";
function AddPermissionLevel1(props) {
  const userData = {
    brand: props.brand,
    categoryname: editOrDelete(props.optionType)
      ? props.category.categoryName
      : "",
    ...propcondition(props),
  };
  const [altEmail, setAltMail] = useState(false);
  const [requestData, setRequestData] = useState(userData);
  const onResetAll = () => {
    setAltMail(false);
    handleClose();
  };
  const handleChange = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]:
        e.target.type === "checked" ? e.target.checked : e.target.value,
    });
  };
  const onChangeAltMail = () => {
    setAltMail(!altEmail);
  };
  const handleClose = () => props.onClose();

  const handleSubmit = (e) => {
    const jsondata = {
      adminMetaData: {
        brand: requestData.brand,
        categoryName: formatParentID(requestData.categoryname),
        level: 1,
        rank: 1,
        enableAlternateEmailId: altEmail,
        startDate: dateFormat(requestData.startDate),
        endDate: dateFormat(requestData.endDate),
        comments: [
          {
            time: dateFormat(),
            user: "abc@xyz.com",
            comment: requestData.commentText,
          },
        ],
      },
    };
    AxiosPost({ jsondata, type: "category" });
    console.log(jsondata);
  };

  return (
    <Modal
      className="modalpopup modal-permissionlevel1"
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
          <Col md={12}>
            <p>Level 1*</p>
          </Col>
          <HelpSection />
        </Row>
        <CategorySec
          category={requestData.categoryname}
          onChange={(e) => handleChange(e)}
          onlyDelete={props.optionType === "Delete"}
        />
        <EnableEmailSec
          altEmail={altEmail}
          onChange={(e) => onChangeAltMail()}
          onlyDelete={props.optionType === "Delete"}
        />
        <DateSec
          startDate={requestData.startDate}
          endDate={requestData.endDate}
          type={editOrDelete(props.optionType) ? datevalue : "text"}
          onChange={(e) => handleChange(e)}
          onlyDelete={props.optionType === "Delete"}
        />
        <CommentSec
          commentText={requestData.commentText}
          onChange={(e) => handleChange(e)}
          editOrDelete={editOrDelete(props.optionType)}
        />

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
      </Modal.Body>
    </Modal>
  );
}
export default AddPermissionLevel1;
