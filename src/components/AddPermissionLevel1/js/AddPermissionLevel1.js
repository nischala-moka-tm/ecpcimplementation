import React, { useState } from "react";
import {
  FormControl,
  Button,
  Row,
  Col,
  Modal,
  Container,
} from "react-bootstrap";
import "../scss/AddPermissionLevel1.scss";
import { AxiosPost } from "../../AxiosMethods/ApiCalls";
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
} from "../../CommonBlocks/js/CommonBlock";

function AddPermissionLevel1(props) {
  const [{ altEmailYes, altEmailNo }, setAltMail] = useState({
    altEmailYes: props.category.enableAlternateEmailId,
    altEmailNo: !props.category.enableAlternateEmailId,
  });

  const onResetAll = () => {
    setAltMail({
      altEmailYes: false,
      altEmailNo: false,
    });
    handleClose();
  };

  const handleClose = () => props.onClose();

  const onChangeAltEmail = (e) => {
    setAltMail({
      [e.target.id]: e.target.checked,
    });
  };

  const userData = {
    categoryname: editOrDelete(props.optionType)
      ? props.category.categoryName
      : "",
    fromdate: propcondition(props).startDate,
    todate: propcondition(props).endDate,
    commentText: propcondition(props).commentText,
    editCommentText: propcondition(props).editCommentText,
  };
  const [requestData, setRequestData] = useState(userData);

  const handleSubmit = (e) => {
    setCategory(category);
    setStartDate(dateFormat(startDate));
    setEndDate(dateFormat(endDate));
    setCommentText(commentText);
    console.log(category);
    console.log(startDate);
    console.log(endDate);
    console.log(commentText);
    console.log(editCommentText);
    const jsondata = {
      adminMetaData: {
        brand: "Toyota",
        categoryName: "Marketing",
        level: 1,
        rank: 1,
        enableAlternateEmailId: true,
        startDate: "01/12/2021 10:00 AM",
        endDate: "01/12/2021 10:00 AM",
        comments: [
          {
            time: "09/07/2021 08:33pm",
            user: "abc@xyz.com",
            comment: "Sample Comment 1",
          },
        ],
      },
    };
    const type = "category";
    AxiosPost({ jsondata, type });
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
          category={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <EnableEmailSec
          altEmailYes={altEmailYes}
          altEmailNo={altEmailNo}
          onChange={(e) => onChangeAltEmail(e)}
        />
        {/* <Row className="date-wrap">
          <Col md={5}>
            <FormControl
              type={editOrDelete(props.optionType) ? datevalue : "text"}
              name="fromdate"
              id="fromdate"
              placeholder="Start date & Time*"
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
              required={true}
              onFocus={(e) => (e.target.type = datevalue)}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Col>
        </Row> */}
        <DateSec
          startDate={startDate}
          endDate={endDate}
          type={editOrDelete(props.optionType) ? datevalue : "text"}
          onFocus={(e) => (e.target.type = datevalue)}
          //onChange={(e) => setEndDate(e.target.value)}
        />
        {/* <Row>
          <Col>
            <textarea
              placeholder="Comments"
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
      </Modal.Body>
    </Modal>
  );
}
export default AddPermissionLevel1;
