import { React } from "react";
import { Row, Col } from "react-bootstrap";
import Logout from "./Logout";

function Header() {
  return (
    <div className="header">
      <Row>
        <Col>
          <div className="logo"></div>
        </Col>

        <Col>
          <Logout />
        </Col>
      </Row>
    </div>
  );
}

export default Header;
