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
import "../scss/AddPermissionLevel3.scss";
import { AxiosPost } from "../../AxiosMethods/ApiCalls";
import {
  editOrDelete,
  dateFormat,
  datevalue,
  editcondtion,
  propcondition,
  HelpSection,
  CategorySec,
  DateSec,
  FinalSelection,
  CommentSec,
} from "../../CommonBlocks/js/CommonBlock";

function AdminCreateNewPermission3(props) {
  const [requestData, setRequestData] = useState({ selectableOptions: "1" });
  const onResetAll = () => {
    handleClose();
  };
  const handlChange = (event) => {
    setRequestData({
      ...requestData,
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
        subCategoryName: "Sales Events",
        parentId: "VEHICLE_COMMUNICATIONS",
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
      className="modalpopup modal-permissionlevel3"
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
            <p>Level 3</p>
          </Col>
          <HelpSection />
        </Row>
        <Form id="form1" onSubmit={onSubmit}>
          {/* <Row className="category-sec">
            <Col md={10}>
              <FormControl
                type="text"
                name="categoryname"
                placeholder="Category Name*"
                required={true}
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
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
          {/* <Row className="selection">
            <Col md={12}>
              <input
                name="finallevel"
                type="checkbox"
                id="finallevel"
                onChange={handlChange}
              />
              <label htmlFor="finallevel">Is this final level</label>
            </Col>
          </Row> */}
          <FinalSelection />
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
export default AdminCreateNewPermission3;
