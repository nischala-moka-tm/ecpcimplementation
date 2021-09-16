import { React } from "react";
import { Row, Col } from "react-bootstrap";
import Logout from "./Logout";

function Header(props) {
  return (
    <div className="header">
      <Row>
        <Col>
          <div className="logo"></div>
        </Col>

        <Col>
         {props.dashboard && <Logout />}
        </Col>
      </Row>
    </div>
  );
}

export default Header;
