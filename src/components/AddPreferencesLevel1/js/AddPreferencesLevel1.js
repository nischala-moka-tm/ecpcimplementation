import React, { useState } from "react";
import {
  FormControl,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Container,
} from "react-bootstrap";
import "../scss/AddPreferencesLevel1.scss";

import {
  editOrDelete,
  datevalue,
  propcondition,
  HelpSection,
  CategorySec,
  DateSec,
  CommentSec,
} from "../../CommonBlocks/js/CommonBlock";
const iterateComments = (comment) => {
  return `${comment.user} \n ${comment.time}  \n ${comment.comment}`;
};
function AddPreferencesLevel1(props) {
  const userData = {
    categoryname: editOrDelete(props.optionType)
      ? props.category.subCategoryName
      : "",
    fromdate: propcondition(props).startDate,
    todate: propcondition(props).endDate,
    commentText: propcondition(props).commentText,
    editCommentText: propcondition(props).editCommentText,
  };
  const [requestData, setRequestData] = useState(userData);

  const onResetAll = () => {
    handleClose();
  };
  const handleChange = (event) => {
    setRequestData({
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };
  const handleClose = () => props.onClose();
  const onSubmit = (e) => {
    console.log(requestData);
    e.preventDefault();
  };
  return (
    <Modal
      className="modalpopup modal-preferenceslevel1"
      show={props.show}
      onHide={onResetAll}
    >
      <Modal.Header closeButton>
        <p>Add New Preference</p>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <p>Level 1</p>
          </Col>
          <HelpSection />
        </Row>
        <Form id="form1" onSubmit={onSubmit}>
          {/* <Row className="category-sec">
            <Col md={10}>
              <FormControl
                type="text"
                name="categoryname"
                placeholder="Catergory Name*"
                required={true}
                value={requestData.categoryname}
                onChange={handleChange}
              />
            </Col>
          </Row> */}
          <CategorySec />
          {/* <Row className="date-wrap">
            <Col md={5}>
              <FormControl
                type={editOrDelete(props.optionType) ? datevalue : "text"}
                name="fromdate"
                id="fromdate"
                placeholder="Start Date & Time*"
                onFocus={(e) => (e.target.type = datevalue)}
                required={true}
                value={requestData.fromdate}
                onChange={handleChange}
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
                value={requestData.todate}
                onChange={handleChange}
              />
            </Col>
          </Row> */}
          <DateSec />
          {/* <Row>
            <Col>
              <textarea
                name="commentText"
                placeholder="Comments*"
                onChange={handleChange}
                value={requestData.commentText}
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
                  value={requestData.editCommentText}
                  onChange={handleChange}
                ></textarea>
              </Col>
            </Row>
          )}
          <Container fluid className="button-options">
            <Button variant="primary" size="sm" onClick={() => onResetAll()}>
              Cancel
            </Button>

            <Button variant="primary" size="sm">
              Save for Later
            </Button>

            <Button type="submit" variant="secondary" size="sm">
              Submit for Approval
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default AddPreferencesLevel1;
