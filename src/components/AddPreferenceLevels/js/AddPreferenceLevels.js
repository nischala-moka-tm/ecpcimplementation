import React, { useState } from "react";
import { Row, Col, Modal, Form } from "react-bootstrap";

import {
  editOrDelete,
  datevalue,
  editcondtionPreference,
  propcondition,
  HelpSection,
  CategorySec,
  DateSec,
  CommentSec,
  FinalSelection,
  levelcommonprops,
  jsondataForPreference,
  ImageSec,
  ButtonSec,
  onlyDeleteconditon,
  onlyAddconditon,
  apicall,
  DeleteText,
  onlyEditconditon,
  onlyView,
  deleteOrView,
} from "../../CommonBlocks/js/CommonBlock";
function AddPreferenceLevels(props) {
  const id = props.category.id;
  let userData = {
    ...propcondition(props),
    ...levelcommonprops(props),
    id,
  };
  if (props.level === 4) {
    userData = {
      imageFlag: true,
      uploadImage: "image",
      ...userData,
      isFinalLevel: false,
    };
  }

  const [requestData, setRequestData] = useState(userData);

  const handlePreferenceChange = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]:
        e.target.type === "checked" ? e.currentTarget.checked : e.target.value,
    });
  };
  const onChecked = (e) => {
    setRequestData({
      ...requestData,
      [e.target.id]: e.currentTarget.checked,
    });
  };
  const handlePrefrenceSubmit = (e) => {
    e.preventDefault();
    getPars("add");
  };
  const handlePreferenceEditSubmit = (e) => {
    e.preventDefault();
    getPars("edit");
  };
  const getPars = (func) => {
    const comments = props.category.comments;
    const finaldata = jsondataForPreference({
      ...requestData,
      comments,
      func,
    });
    apicall(finaldata, func, props.onClose, props.notify, props.brand);
  };

  const fileChangedHandler = (event) => {
    const formData = new FormData();
    console.log(formData);
  };
  return (
    <Modal
      className="modalpopup modal-preference"
      show={props.show}
      onHide={() => props.onClose()}
    >
      <Modal.Header closeButton>
        <p>
          {onlyAddconditon(props.optionType)
            ? "Add New Preference"
            : editcondtionPreference(props.optionType)}
        </p>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="form1"
          onSubmit={
            onlyAddconditon(props.optionType)
              ? handlePrefrenceSubmit
              : handlePreferenceEditSubmit
          }
        >
          <Row>
            <Col md={12}>
              <DeleteText {...props} />
              <p>Level {props.level}</p>
            </Col>
            <HelpSection />
          </Row>
          <CategorySec
            category={requestData.categoryname}
            onChange={(e) => handlePreferenceChange(e)}
            onlyDelete={deleteOrView}
          />
          {props.level === 4 && (
            <ImageSec
              fileChangedHandler={fileChangedHandler}
              onlyDelete={
                onlyDeleteconditon(props.optionType) ||
                onlyView(props.optionType)
              }
            />
          )}
          <DateSec
            startDate={requestData.startDate}
            endDate={requestData.endDate}
            type={editOrDelete(props.optionType) ? datevalue : "text"}
            onChange={(e) => handlePreferenceChange(e)}
            onlyDelete={deleteOrView}
          />
          {props.level === 4 && (
            <FinalSelection
              onChange={(e) => onChecked(e)}
              onlyDelete={deleteOrView}
            />
          )}
          <CommentSec
            commentText={requestData.commentText}
            onChange={(e) => handlePreferenceChange(e)}
            editOrDelete={
              onlyDeleteconditon(props.optionType) ||
              onlyEditconditon(props.optionType)
            }
            onlyDelete={deleteOrView}
          />
          <ButtonSec {...props} />
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default AddPreferenceLevels;
