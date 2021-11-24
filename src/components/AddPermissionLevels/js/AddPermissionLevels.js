import React, { useState } from "react";
import { Row, Col, Modal, Form } from "react-bootstrap";
import {
  editOrDelete,
  datevalue,
  editcondtion,
  propcondition,
  HelpSection,
  CategorySec,
  EnableEmailSec,
  DateSec,
  CommentSec,
  FinalSelection,
  DefaultCommunicationModes,
  level1props,
  level2props,
  levelcommonprops,
  jsondata,
  ButtonSec,
  onlyAddconditon,
  onlyDeleteconditon,
  apicall,
  deleteText,
} from "../../CommonBlocks/js/CommonBlock";

function AddPermissionLevels(props) {
  const id = props.category.id;
  let userData = {
    ...propcondition(props),
  };

  if (props.level === 1) {
    userData = { ...level1props(props), ...userData, id };
  } else if (props.level === 2) {
    userData = { ...level2props(props), ...userData };
  } else {
    userData = { ...levelcommonprops(props), ...userData };
  }

  const [requestData, setRequestData] = useState(userData);
  const handleChange = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]:
        e.target.type === "checked" ? e.target.checked : e.target.value,
    });
  };
  const onChangeAltMail = () => {
    setRequestData({
      ...requestData,
      enableAlternateEmailId: !requestData.enableAlternateEmailId,
    });
  };

  const onChecked = (e) => {
    setRequestData({
      ...requestData,
      [e.target.id]: e.currentTarget.checked,
    });
  };

  const onInputChecked = (e) => {
    setRequestData({
      ...requestData,
      [e.target.id]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPars("add");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    getPars("edit");
  };

  const getPars = (func) => {
    const comments = props.category.comments;
    const finaldata = jsondata({
      ...requestData,
      comments,
      func,
    });
    apicall(finaldata, func, props.onClose, props.notify, props.brand);
  };

  return (
    <Modal
      className="modalpopup modal-permissionlevel1"
      show={props.show}
      onHide={() => props.onClose()}
    >
      <Modal.Header closeButton>
        <p>
          {onlyAddconditon(props.optionType)
            ? "Add New Permission"
            : editcondtion(props.optionType)}
        </p>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="form1"
          onSubmit={
            onlyAddconditon(props.optionType) ? handleSubmit : handleEditSubmit
          }
        >
          <Row>
            <Col md={12}>
              <deleteText {...props} />
              <p>Level {props.level}</p>
            </Col>
            <HelpSection />
          </Row>

          <CategorySec
            category={requestData.categoryname}
            onChange={(e) => handleChange(e)}
            onlyDelete={onlyDeleteconditon(props.optionType)}
          />

          {props.level === 1 && (
            <EnableEmailSec
              altEmail={requestData.enableAlternateEmailId}
              onChange={(e) => onChangeAltMail()}
              onlyDelete={onlyDeleteconditon(props.optionType)}
            />
          )}

          {props.level === 2 && (
            <DefaultCommunicationModes
              mail={requestData.mail}
              post={requestData.post}
              call={requestData.call}
              sms={requestData.sms}
              onChecked={(e) => onInputChecked(e)}
              onlyDelete={onlyDeleteconditon(props.optionType)}
            />
          )}

          <DateSec
            startDate={requestData.startDate}
            endDate={requestData.endDate}
            type={editOrDelete(props.optionType) ? datevalue : "text"}
            onChange={(e) => handleChange(e)}
            onlyDelete={onlyDeleteconditon(props.optionType)}
          />

          {props.level > 2 && (
            <FinalSelection
              onChange={(e) => onChecked(e)}
              onlyDelete={onlyDeleteconditon(props.optionType)}
            />
          )}

          <CommentSec
            commentText={requestData.commentText}
            onChange={(e) => handleChange(e)}
            editOrDelete={editOrDelete(props.optionType)}
          />
          <ButtonSec {...props} />
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default AddPermissionLevels;
