import React from "react";
import {
  FormControl,
  Button,
  Row,
  Col,
  Modal,
  Container,
} from "react-bootstrap";
import "../scss/AddNewPreference.scss";
import { datevalue } from "../../CommonBlocks/js/CommonBlock";

export const DateBlock = () => {
  return (
    <Row className="date-wrap">
      <Col md={5}>
        <FormControl
          type="text"
          name="fromdate"
          id="fromdate"
          placeholder="Start date & Time*"
          onFocus={(e) => (e.target.type = datevalue)}
        />
      </Col>
      <Col md={5}>
        <FormControl
          type="text"
          name="todate"
          id="todate"
          placeholder="End Date & Time*"
          onFocus={(e) => (e.target.type = datevalue)}
        />
      </Col>
    </Row>
  );
};
function AddNewPreference(props) {
  const onResetAll = () => {
    handleClose();
  };
  const handleClose = () => props.onClose();

  return (
    <div>
      <Modal.Body>
        <div className="category-level1">
          <Row className="category-sec">
            <Col md={12}>
              <p>Level 1*</p>
            </Col>
            <Col md={10}>
              <FormControl
                type="text"
                name="categoryname"
                placeholder="Category Name*"
              />
            </Col>
          </Row>
          <DateBlock />
          <Row>
            <Col>
              <textarea placeholder="Comments"></textarea>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
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
      </Modal.Footer>
    </div>
  );
}

export default AddNewPreference;
