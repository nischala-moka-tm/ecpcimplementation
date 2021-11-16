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
import { BsCardImage } from "react-icons/bs";
import "../scss/AddPreferencesLevel4.scss";
import {
  editOrDelete,
  propcondition,
  HelpSection,
  CategorySec,
  DateSec,
  CommentSec,
  datevalue,
  FinalSelection,
  dateFormat,
  formatParentID,
} from "../../CommonBlocks/js/CommonBlock";

function AddPreferencesLevel4(props) {
  const PreferData4 = {
    categoryname: editOrDelete(props.optionType)
      ? props.category.subCategoryName
      : "",
    ...propcondition(props),
  };
  const [categoryPreferData4, setcategoryPreferData4] = useState(PreferData4);
  const onResetAll = () => {
    handleClose();
  };
  const onPreferChange = (e) => {
    setcategoryPreferData4({
      ...categoryPreferData4,
      [e.target.name]:
        e.target.type === "checked" ? e.target.checked : e.target.value,
    });
  };
  const handleClose = () => props.onClose();
  const onPrefSubmit = (e) => {
    console.log(categoryPreferData4);
    e.preventDefault();
  };

  const fileChangedHandler = (event) => {
    const formData = new FormData();
    console.log(formData);
  };
  const handleSubmit = (e) => {
    const jsondata = {
      adminMetaData: {
        subCategoryName: categoryPreferData4.categoryname,
        parentId: formatParentID(categoryPreferData4.categoryname),
        level: 2,
        rank: 2,
        startDate: dateFormat(categoryPreferData4.startDate),
        endDate: dateFormat(categoryPreferData4.endDate),
        comments: [
          {
            time: dateFormat(),
            user: "abc@xyz.com",
            comment: categoryPreferData4.commentText,
          },
        ],
      },
    };
    console.log(jsondata);
    //AxiosPost({ jsondata, type: "subCategory" });
  };
  return (
    <Modal
      className="modalpopup modal-preference4"
      show={props.show}
      onHide={onResetAll}
    >
      <Modal.Header closeButton>
        <p>Add New Preference</p>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <p>Level {props.category.level}</p>
          </Col>
          <HelpSection />
        </Row>
        <Form id="form1" onSubmit={onPrefSubmit}>
          <CategorySec
            category={categoryPreferData4.categoryname}
            onChange={(e) => onPreferChange(e)}
            onlyDelete={props.optionType === "Delete"}
          />

          <Row className="image-upload">
            <Col md={4}>
              <label htmlFor="car-image">
                <BsCardImage /> Upload Image
              </label>
            </Col>
            <Col md={6}>
              <FormControl
                type="file"
                id="car-image"
                name="car-image"
                accept="image/png, image/jpeg"
                onChange={fileChangedHandler}
                onlyDelete={props.optionType === "Delete"}
              />
            </Col>
          </Row>

          <DateSec
            startDate={categoryPreferData4.startDate}
            endDate={categoryPreferData4.endDate}
            type={editOrDelete(props.optionType) ? datevalue : "text"}
            onChange={(e) => onPreferChange(e)}
            onlyDelete={props.optionType === "Delete"}
          />

          <FinalSelection />

          <CommentSec
            commentText={categoryPreferData4.commentText}
            onChange={(e) => onPreferChange(e)}
            readonly={false}
            editOrDelete={editOrDelete(props.optionType)}
          />
          <Container fluid className="button-options">
            <Button variant="primary" size="sm" onClick={() => onResetAll()}>
              Cancel
            </Button>

            <Button variant="primary" size="sm">
              Save for Later
            </Button>

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
export default AddPreferencesLevel4;
