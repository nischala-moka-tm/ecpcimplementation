import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "../scss/LeftNavigation.scss";

function LeftNavigation(props) {
  const [SubC1, setSubC1] = useState(false);
  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
    setSubC1(!SubC1);
  };
  return (
    <Nav
      defaultActiveKey={`#${
        window.location.pathname.split("/")[2]
          ? window.location.pathname.split("/")[2]
          : "dashboard"
      }`}
      className="flex-column"
    >
      <Nav.Item>
        <Nav.Link
          href="#dashboard"
          onClick={() => {
            props.onClickTab(`${props.path}/dashboard`);
            setSubC1(false);
            setActive(false);
          }}
        >
          Dashboard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="#manage"
          onClick={() => {
            props.onClickTab(`${props.path}/manage`);
            setSubC1(false);
            setActive(false);
          }}
        >
          Manage Permissions/Preferences
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className={isActive ? "right-arrow open" : "right-arrow"}
          onClick={handleToggle}
        >
          Reports
        </Nav.Link>
      </Nav.Item>
      {SubC1 && (
        <Nav className="sub-dropdown">
          <Nav.Item>
            <Nav.Link
              eventKey="report-1"
              href="#report-perm"
              onClick={() => props.onClickTab(`${props.path}/report-perm`)}
            >
              Permission/Preference
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="report-2"
              href="#report-audit"
              onClick={() => props.onClickTab(`${props.path}/report-audit`)}
            >
              Audit Trail
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )}
    </Nav>
  );
}

export default LeftNavigation;
