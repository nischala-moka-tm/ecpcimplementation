import React, { useState } from "react";
import { Button, Row, Col, Modal, Container, Form } from "react-bootstrap";

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
} from "../../CommonBlocks/js/CommonBlock";
import { AxiosPost, AxiosPut } from "../../AxiosMethods/ApiCalls";
function AddPreferenceLevels(props) {
  const id = props.category.id ? props.category.id : "";
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

  const handleChange = (e) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const type = "subCategory";
    getPars("add", type);
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    let type = "subCategory";
    props.level === 1 && (type = "Preference");
    getPars("edit", type);
  };
  const getPars = (func, type) => {
    const comments = props.category.comments;
    const finaldata = jsondataForPreference({
      ...requestData,
      comments,
      func,
    });
    apicall(finaldata, type, func);
  };
  const apicall = async (finaldata, type, func) => {
    console.log(finaldata);
    const brand = props.brand;
    const postData = { finaldata, type, brand };
    let resText = "";
    const result =
      func === "add" ? await AxiosPost(postData) : await AxiosPut(postData);
    if (result.code === "200") {
      props.onClose();
      resText = result.messages[0].description;
      props.notify(resText, "success");
    } else {
      result.messages.map((i) => {
        resText += `${i.description}\n`;
      });
      props.notify(resText, "error");
    }
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
          {props.optionType === "Add"
            ? "Add New Preference"
            : editcondtionPreference(props.optionType)}
        </p>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="form1"
          onSubmit={
            props.optionType === "Add" ? handleSubmit : handleEditSubmit
          }
        >
          <Row>
            <Col md={12}>
              <p className="delete-txt">
                {props.optionType === "Delete" &&
                  "Deleting this item will delete from production and remove any levels under it. To proceed please enter end date, enter comments and submit delete for approval."}
              </p>
              <p>Level {props.level}</p>
            </Col>
            <HelpSection />
          </Row>

          <CategorySec
            category={requestData.categoryname}
            onChange={(e) => handleChange(e)}
            onlyDelete={props.optionType === "Delete"}
          />
          {props.level === 4 && (
            <ImageSec
              fileChangedHandler={fileChangedHandler}
              onlyDelete={props.optionType === "Delete"}
            />
          )}
          <DateSec
            startDate={requestData.startDate}
            endDate={requestData.endDate}
            type={editOrDelete(props.optionType) ? datevalue : "text"}
            onChange={(e) => handleChange(e)}
            onlyDelete={props.optionType === "Delete"}
          />

          {props.level === 4 && (
            <FinalSelection
              onChange={(e) => onChecked(e)}
              onlyDelete={props.optionType === "Delete"}
            />
          )}

          <CommentSec
            commentText={requestData.commentText}
            onChange={(e) => handleChange(e)}
            editOrDelete={editOrDelete(props.optionType)}
          />

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
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default AddPreferenceLevels;
