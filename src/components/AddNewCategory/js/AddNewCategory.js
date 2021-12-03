import React, { useState } from "react";
import {
  Row,
  Col,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Container,
  Button,
} from "react-bootstrap";
import "../scss/AddNewCategory.scss";
import { FaRegQuestionCircle } from "react-icons/fa";
import AddNewPermissionList from "../../AddNewPermissionList/js/AddNewPermissionList";
import AddNewPreferenceList from "../../AddNewPreferenceList/js/AddNewPreferenceList";
import { ButtonSec } from "../../CommonBlocks/js/CommonBlock";

function AddNewCategory(props) {
  const [{ Permission, Preference }, setCategory] = useState({
    Permission: true,
    Preference: false,
  });
  const onChangeCategory = (e) => {
    setCategory({
      [e.target.id]: e.target.checked,
    });
  };
  const onResetAll = () => {
    handleClose();
  };
  const handleClose = () => props.onClose();

  return (
    <Modal
      className="modalpopup modal-newcategory"
      show={props.show}
      onHide={onResetAll}
    >
      <Modal.Header closeButton>
        <p>Add New Category</p>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={8}>
            <ToggleButtonGroup
              className="category-options"
              name="alternative-email-toggle"
              type="radio"
            >
              <ToggleButton
                variant={Permission ? "dark" : "light"}
                name="permission-category"
                id="Permission"
                checked={Permission}
                type="radio"
                onChange={(e) => onChangeCategory(e)}
                value="Permission"
                className="shadow-none"
              >
                Permission
              </ToggleButton>

              <ToggleButton
                variant={Preference ? "dark" : "light"}
                name="alternative-email"
                id="Preference"
                type="radio"
                checked={Preference}
                onChange={(e) => onChangeCategory(e)}
                value="Preference"
                className="shadow-none"
              >
                Preference
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
          <Col md={4}>
            <div className="help-sec">
              <span className="help-icon">
                <FaRegQuestionCircle varient="red" />
              </span>
              <p>Help</p>
            </div>
            <div className="status-codes">
              <ul>
                <li className="live">Completed</li>
                <li className="pending-approval">In Progress</li>
                <li className="pending-go-live">In Complete</li>
                <li className="expiring-soon">Yet to Start</li>
              </ul>
            </div>
          </Col>
        </Row>
        {Permission ? (
          <AddNewPermissionList onClose={onResetAll} />
        ) : (
          <AddNewPreferenceList onClose={onResetAll} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Container fluid className="button-options">
          <Button variant="primary" size="sm" onClick={() => onResetAll()}>
            Cancel
          </Button>

          <Button type="submit" variant="secondary" size="sm">
            Submit for Approval
          </Button>
        </Container>
        {/* <ButtonSec optionType={"delete"}/> */}
      </Modal.Footer>
    </Modal>
  );
}

export default AddNewCategory;
