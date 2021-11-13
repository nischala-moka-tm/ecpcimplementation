import React from "react";
import { Row, Col } from "react-bootstrap";
import AdminLogout from "../../AdminLogout/js/AdminLogout";
import "../scss/Header.scss";

import toyotalogo from "./../../../assets/Toyota-logo.svg";
import lexuslogo from "./../../../assets/Lexus-logo.svg";

function Header(props) {
  return (
    <div className="header">
      <Row className="header-wrap">
        <Col>
          <div className="logo-wrap">
            <a
              href="https://www.toyota.com/"
              className="toyota-logo"
              rel="noopener"
              target="_blank"
            >
              <img src={toyotalogo} alt="Toyota-logo" />
            </a>
            <a
              href="https://www.lexus.com/"
              className="lexus-logo"
              rel="noopener"
              target="_blank"
            >
              <img src={lexuslogo} alt="Lexus Logo" />
            </a>
          </div>
        </Col>
        <Col>{props.DashboardAdmin && <AdminLogout />}</Col>
      </Row>
    </div>
  );
}

export default Header;
