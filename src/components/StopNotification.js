import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import './StopNotification.scss';

import {
  Row,
  Container, 
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
const Communications = () => {
    const [oneMonth, setoneMonth] = useState(false);
    const [oneQuater, setoneQuater] = useState(false);
    const [sixMonths, setsixMonths] = useState(false);
    const [oneYear, setoneYear] = useState(false);

    return (
        <Container fluid className="multi-options">
          <ToggleButtonGroup type="checkbox">
            <Row>
              <ToggleButton
                className="mt-2"
                id="toggle-check-onemonth"
                type="checkbox"
                variant={oneMonth ? "dark" : "light"}
                checked={oneMonth}
                value="1"
                onChange={(e) => setoneMonth(e.currentTarget.checked)}
              >
                <i
                  className={
                    oneMonth ? "oneMonth-checked" : "oneMonth-unchecked"
                  }
                >
                  One Month
                </i>
              </ToggleButton>
            </Row>
            <Row>
              <ToggleButton
                className="mt-2"
                id="toggle-check-onequater"
                type="checkbox"
                variant={oneQuater ? "dark" : "light"}
                checked={oneQuater}
                value="2"
                onChange={(e) => setoneQuater(e.currentTarget.checked)}
              >
                <i
                  className={
                    oneQuater ? "oneQuater-checked" : "oneQuater-unchecked"
                  }
                >
                  One Quater
                </i>
              </ToggleButton>
            </Row>
            <Row>
              <ToggleButton
                className="mt-2"
                id="toggle-check-sixmonths"
                type="checkbox"
                variant={sixMonths ? "dark" : "light"}
                checked={sixMonths}
                value="4"
                onChange={(e) => setsixMonths(e.currentTarget.checked)}
              >
                <i
                  className={
                    sixMonths ? "sixMonths-checked" : "sixMonths-unchecked"
                  }
                >
                  Six Months
                </i>
              </ToggleButton>
            </Row>
            <Row>
              <ToggleButton
                className="mt-2"
                id="toggle-check-oneyear"
                type="checkbox"
                variant={oneYear ? "dark" : "light"}
                checked={oneYear}
                value="4"
                onChange={(e) => setoneYear(e.currentTarget.checked)}
              >
                <i
                  className={oneYear ? "oneYear-checked" : "oneYear-unchecked"}
                >
                  One Year
                </i>
              </ToggleButton>
            </Row>
          </ToggleButtonGroup>
        </Container>
    );
  };
const StopNotification = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  return (
    <Modal className="profile-exists" show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <p className="txt-box box">Do you want to fine tune your permissions</p>
        <p className="or">Or</p>
        <p className="dark-box box">Do you want to Stop all the notification for</p>
        <Communications />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StopNotification;
