import React, { useState } from "react";
import "./Dashboard.css";
import {
  FaCommentAlt,
  FaPhoneVolume,
  FaEnvelope,
  FaMinusCircle,
  FaPlusCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  Row,
  Col,
  Container,
  Navbar,
  Nav,
  Accordion,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import { style } from "dom-helpers";
const AccordionSelection = () => {
  const [isCommnctonsVisible, setComunicationVisible] = useState(false);

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h5>Marketing </h5>
        </Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col>
              <h6>Would you like to receive marketing communications?</h6>
            </Col>
            <Col>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isCommnctonsVisible}
                  onChange={(e) =>
                    setComunicationVisible(e.currentTarget.checked)
                  }
                />
                <span className="slider"></span>
              </label>
            </Col>
          </Row>
          {isCommnctonsVisible && <Communications />}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <h5>Survey</h5>
        </Accordion.Header>
        <Accordion.Body>Survey section</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>
          <h5>Services</h5>
        </Accordion.Header>
        <Accordion.Body>Service section</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>
          <h5>Category 4</h5>
        </Accordion.Header>
        <Accordion.Body>Category 4 Section</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>
          <h5>Category 5</h5>
        </Accordion.Header>
        <Accordion.Body>Category 5 Section</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
const ProfileCard = () => {
  return (
    <div className="profile-card">
      <h6>Your personal information</h6>
      <Row>
        <Col sm={3} className="info-card">
          <span className="text-Color"> John Smith </span>
          <span>40392483</span>
        </Col>
        <Col sm={3} className="info-card">
          <span>Email</span>
          <span>john_smith@toyota.com </span>
          <span>
            <a href="#">Add email</a>
          </span>
        </Col>
        <Col sm={3} className="info-card">
          <span> Primary </span> <span> (310)-699-0221 </span>
        </Col>
        <Col sm={3} className="info-card">
          <span className="text-danger">
            {" "}
            <FaMapMarkerAlt />{" "}
          </span>{" "}
          <span> 3002 carolwood LN Torrance, CA 90505-7110 </span>
        </Col>
      </Row>
    </div>
  );
};
const Communications = () => {
  const [channelPhone, setchannelPhone] = useState(false);
  const [channelMail, setchannelMail] = useState(false);
  const [channelTextMassage, setchannelTextMassage] = useState(false);
  const [channelAtSign, setchannelAtSign] = useState(false);
  const [SM_clicked, setSMClick] = useState(false);
  return (
    <div>
      <Container fluid className="px-4">
        <ToggleButtonGroup type="checkbox">
          <Row>
            <Col>
              <ToggleButton
                className="mt-2"
                id="toggle-check-atsign"
                type="checkbox"
                variant={channelAtSign ? "dark" : "light"}
                checked={channelAtSign}
                value="1"
                onChange={(e) => setchannelAtSign(e.currentTarget.checked)}
              >
                <i
                  className={
                    channelAtSign ? "at-the-rate-checked" : "at-the-rate"
                  }
                ></i>
              </ToggleButton>
            </Col>
            <Col>
              <ToggleButton
                className="mt-2"
                id="toggle-check-mail"
                type="checkbox"
                variant={channelMail ? "dark" : "light"}
                checked={channelMail}
                value="2"
                onChange={(e) => setchannelMail(e.currentTarget.checked)}
              >
                <i
                  className={channelMail ? "email-icon-checked" : "email-icon"}
                ></i>
              </ToggleButton>
            </Col>
            <Col>
              <ToggleButton
                className="mt-2"
                id="toggle-check-phone"
                type="checkbox"
                variant={channelPhone ? "dark" : "light"}
                checked={channelPhone}
                value="3"
                onChange={(e) => setchannelPhone(e.currentTarget.checked)}
              >
                <i
                  className={channelPhone ? "phone-icon-checked" : "phone-icon"}
                ></i>
              </ToggleButton>
            </Col>
            <Col>
              <ToggleButton
                className="mt-2"
                id="toggle-check-textmsg"
                type="checkbox"
                variant={channelTextMassage ? "dark" : "light"}
                checked={channelTextMassage}
                value="4"
                onChange={(e) => setchannelTextMassage(e.currentTarget.checked)}
              >
                <i
                  className={
                    channelTextMassage ? "msg-icon-checked" : "msg-icon"
                  }
                ></i>
              </ToggleButton>
            </Col>
          </Row>
        </ToggleButtonGroup>
        <Row>
          <Col className="mail" sm={4}>
            <FormControl type="text" className="edit-mail"></FormControl>{" "}
            <i className="edit-icon"></i>
          </Col>
        </Row>
      </Container>
      <hr />
      <h6>
        <button
          className="plusmenu-danger"
          onClick={() => setSMClick(!SM_clicked)}
        >
          <i className={SM_clicked ? "minus-checked" : "plus-checked"}></i>
        </button>{" "}
       Vehicle Communications
      </h6>

      {SM_clicked && <SubCommuncations />}
    </div>
  );
};

const SubCommuncations = () => {
  const [subchannelPhone, setsubchannelPhone] = useState(false);
  const [subchannelTextMassage, setsubchannelTextMsg] = useState(false);
  const [subchannelAtSign, setsubchannelAtSign] = useState(false);
  const [ConsVehicl, setConsVehicl] = useState(false);
  const [MscEntrment, setMscEntrment] = useState(false);
  return (
    <Container fluid className="px-4">
      <ToggleButtonGroup type="checkbox">
        <Row>
          <Col>
            <ToggleButton
              className="mt-2"
              id="toggle-check-subatsign"
              type="checkbox"
              variant={subchannelAtSign ? "dark" : "light"}
              checked={subchannelAtSign}
              value="1"
              onChange={(e) => setsubchannelAtSign(e.currentTarget.checked)}
            >
              <i
                className={
                  subchannelAtSign ? "at-the-rate-checked" : "at-the-rate"
                }
              ></i>
            </ToggleButton>
          </Col>
          <Col>
            <ToggleButton
              className="mt-2"
              id="toggle-check-subphone"
              type="checkbox"
              variant={subchannelPhone ? "dark" : "light"}
              checked={subchannelPhone}
              value="3"
              onChange={(e) => setsubchannelPhone(e.currentTarget.checked)}
            >
              <i
                className={
                  subchannelPhone ? "phone-icon-checked" : "phone-icon"
                }
              ></i>
            </ToggleButton>
          </Col>
          <Col>
            <ToggleButton
              className="mt-2"
              id="toggle-check-subtextmsg"
              type="checkbox"
              variant={subchannelTextMassage ? "dark" : "light"}
              checked={subchannelTextMassage}
              value="4"
              onChange={(e) => setsubchannelTextMsg(e.currentTarget.checked)}
            >
              <i
                className={
                  subchannelTextMassage ? "msg-icon-checked" : "msg-icon"
                }
              ></i>
            </ToggleButton>
          </Col>
        </Row>
      </ToggleButtonGroup>
<br />
      <ToggleButtonGroup className="options" type="checkbox">
        <Row>
          <Col>
            <ToggleButton
              className="mt-2 fontsmall preferences"
              id="toggle-check-ConsVehicl"
              type="checkbox"
              variant={ConsVehicl ? "secondary" : "light"}
              checked={ConsVehicl}
              value="3"
              onChange={(e) => setConsVehicl(e.currentTarget.checked)}
            >
              {ConsVehicl && <i className="check-mark"></i>} News Letters
            </ToggleButton>
          </Col>
          <Col>
            <ToggleButton
              className="mt-2 fontsmall preferences"
              id="toggle-check-MscEntrment"
              type="checkbox"
              variant={MscEntrment ? "secondary" : "light"}
              checked={MscEntrment}
              value="4"
              onChange={(e) => setMscEntrment(e.currentTarget.checked)}
            >
              {MscEntrment && <i className="check-mark"></i>} Sales Events
            </ToggleButton>
          </Col>
        </Row>
      </ToggleButtonGroup>
    </Container>
  );
};
function Dashboard() {
  const root = document.documentElement;

  // const clickedToyota = (elem)=>{

  // }
  return (
    <div className="home">
      <Header />
      <Container fluid className="dashboard-container">
        <ProfileCard />
        {/* <Navbar>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Nav>
                        <Nav.Link  name="Toyota" href="#" onClick={(e)=>clickedToyota(e)}>Toyota</Nav.Link>
                        <Nav.Link  href="#" name="Lexus" onClick={(e)=> clickedToyota(e)}>Lexus</Nav.Link>
                    </Nav>
                </Navbar> */}
        <Navbar>
          <Nav className="me-auto" defaultActiveKey="#toyota">
            <Nav.Link activeClassName="active" href="#toyota">
              Toyota
            </Nav.Link>
            <Nav.Link href="#lexus">Lexus</Nav.Link>
          </Nav>
        </Navbar>
        <AccordionSelection />
      </Container>
      <Footer />
    </div>
  );
}

export default Dashboard;
