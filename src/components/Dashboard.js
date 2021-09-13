import React, { useState, useEffect } from "react";
import Car from "./Car";
import "./Dashboard.scss";
import carDetails from "../Car-details";
import { FaMapMarkerAlt } from "react-icons/fa";
import Tooltip from "react-bootstrap/Tooltip";
import {
  Row,
  Col,
  Container,
  Navbar,
  Nav,
  Accordion,
  FormControl,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Dropdown,
} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
const AccordionSelection = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h5>Marketing </h5>
        </Accordion.Header>
        <Accordion.Body>
          <Row className="market-heading">
            <Col>
              <h6>Would you like to receive marketing communications?</h6>
            </Col>
          </Row>
          <Communications />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <h5>Survey</h5>
        </Accordion.Header>
        <Accordion.Body>Survey section</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
const ProfileCard = () => {
  return (
    <div className="profile-card">
      <h6>Your personal information</h6>
      <span className="edit-info">
        <i className="edit-icon"></i>
      </span>
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
          <i class="edit-icon"></i>
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
  const [SubC1, setSubC1] = useState(false);
  const [SubC2, setSubC2] = useState(false);
  const [SubC3, setSubC3] = useState(false);
  const [SubC4, setSubC4] = useState(false);
  return (
    <div className="market-communication">
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
        <button className="plusmenu-danger" onClick={() => setSubC1(!SubC1)}>
          <i className={SubC1 ? "minus-checked" : "plus-checked"}></i>
        </button>{" "}
        Vehicle Communications
      </h6>

      {SubC1 && <ForMarketing />}
      <hr />
      <h6>
        <button className="plusmenu-danger" onClick={() => setSubC2(!SubC2)}>
          <i className={SubC2 ? "minus-checked" : "plus-checked"}></i>
        </button>{" "}
        Service Communications
      </h6>

      {SubC2 && <ForServiceCommunications />}
      <hr />

      <h6>
        <button className="plusmenu-danger" onClick={() => setSubC3(!SubC3)}>
          <i className={SubC3 ? "minus-checked" : "plus-checked"}></i>
        </button>{" "}
        Telematics
      </h6>
      {SubC3 && <ForTelematics />}

      <hr />

      <h6>
        <button className="plusmenu-danger" onClick={() => setSubC4(!SubC4)}>
          <i className={SubC4 ? "minus-checked" : "plus-checked"}></i>
        </button>{" "}
        Preferences
      </h6>

      {SubC4 && <ForPreferences />}
      <Container fluid className="d-flex justify-content-md-end">
        <h6>Do you want to opt out of all marketing communications</h6>
        <label className="switch">
          <input
            type="checkbox"
            checked={true} // isCommnctonsVisible
            // onChange={(e) =>
            //   setComunicationVisible(e.currentTarget.checked)
            // }
          />
          <span className="slider"></span>
        </label>
      </Container>
    </div>
  );
};
const ForVehicleofInterest = () => {
  const [submail, setsubmail] = useState(false);
  const [subpost, setsubpost] = useState(false);
  let [checkedStates, setcheckedStates] = useState([]);
  checkedStates = carDetails;
  useEffect(() => {
    setcheckedStates(carDetails);
  }, [checkedStates]);

  const handleClickSelect = (pars, pos, imgpos) => {
    let updateitems = [...checkedStates];
    updateitems.map((value, index) => {
      if (index === pos) {
        updateitems[index].images[imgpos].checked =
          !updateitems[index].images[imgpos].checked;
      }
      checkEveryImg(value);
    });

    setcheckedStates(updateitems);
  };
  const onSelectAll = (pos) => {
    let updateitems = [...checkedStates];
    updateitems.map((value, index) => {
      if (index === pos) {
        value.checkedAllCategory = true;
        value.images.map((img) => (img.checked = true));
        checkEveryImg(value);
      }
    });
    setcheckedStates(updateitems);
  };
  const onDeselectAll = (pos) => {
    let updateitems = [...checkedStates];
    updateitems.map((value, index) => {
      if (index === pos) {
        value.checkedAllCategory = false;
        value.images.map((img) => (img.checked = false));
        checkEveryImg(value);
      }
    });
    setcheckedStates(updateitems);
  };
  const checkEveryImg = (item) => {
    const issomeSelected = item.images.some((d) => d.checked === true);
    const iseverySelected = item.images.every((d) => d.checked === true);
    if (issomeSelected) {
      item.checkedCategory = true;
      item.checkedAllCategory = true;
    } else {
      item.checkedCategory = false;
    }
    if (iseverySelected) {
      item.checkedAllCategory = true;
    } else {
      item.checkedAllCategory = false;
    }
  };
  return (
    <div>
      <ToggleButtonGroup type="checkbox">
        <Row className="mt-2">
          <Col>
            <ToggleButton
              className="mt-2"
              id="toggle-check-submail"
              type="checkbox"
              variant={submail ? "dark" : "light"}
              checked={submail}
              value="1"
              onChange={(e) => setsubmail(e.currentTarget.checked)}
            >
              <i
                className={submail ? "at-the-rate-checked" : "at-the-rate"}
              ></i>
            </ToggleButton>
          </Col>
          <Col>
            <ToggleButton
              className="mt-2"
              id="toggle-check-subpost"
              type="checkbox"
              variant={subpost ? "dark" : "light"}
              checked={subpost}
              value="1"
              onChange={(e) => setsubpost(e.currentTarget.checked)}
            >
              <i className={subpost ? "email-icon-checked" : "email-icon"}></i>
            </ToggleButton>
          </Col>
        </Row>
      </ToggleButtonGroup>
      <Container fluid className="car-preferences">
        {checkedStates.map((car, index) => {
          return (
            <Row key={index}>
              <Col md={4} className="vehicle-heading">
                <ToggleButton
                  className="mt-2 fontsmall  options preferences"
                  id={"vehicle-type-" + index}
                  type="checkbox"
                  variant={
                    checkedStates[index].checkedCategory ? "secondary" : "light"
                  }
                  checked={checkedStates[index].checkedCategory}
                  value={index}
                >
                  {car.checkedCategory && <i className="check-mark"></i>}{" "}
                  {car.category}
                </ToggleButton>
              </Col>
              <Col md={8}>
                <div className="select-wrap">
                  {(!car.checkedAllCategory || !car.checkedCategory) && (
                    <button
                      className="btn-selectAll"
                      onClick={(e) => onSelectAll(index)}
                    >
                      Select All
                    </button>
                  )}
                  {(car.checkedAllCategory || car.checkedCategory) && (
                    <button
                      className="btn-deselectAll"
                      onClick={(e) => onDeselectAll(index)}
                    >
                      Deselect All
                    </button>
                  )}
                </div>
              </Col>
              <Col md={12} className="vehicle-list">
                {car.images.map((imgs, imgindex) => {
                  return (
                    <Car
                      key={imgindex}
                      {...imgs}
                      isSelected={
                        checkedStates[index].images[imgindex].checked
                          ? "selected"
                          : "not-selected"
                      }
                      clickSelect={() =>
                        handleClickSelect(imgs.modelName, index, imgindex)
                      }
                    />
                  );
                })}
              </Col>
            </Row>
          );
        })}
      </Container>
    </div>
  );
};
const ForPreferences = () => {
  const [isinsteredIn, setinsteredIn] = useState(false);
  return (
    <Container fluid>
      <Navbar>
        <Nav className="me-auto" defaultActiveKey="#VehicleofInterest">
          <Nav.Link
            activeClassName="active"
            href="#VehicleofInterest"
            onClick={() => setinsteredIn(false)}
          >
            Vehicle of Interest
          </Nav.Link>
          <Nav.Link href="#lifestyle" onClick={() => setinsteredIn(true)}>
            {" "}
            Life Style{" "}
          </Nav.Link>
        </Nav>
      </Navbar>
      {isinsteredIn ? <ForLifeStyle /> : <ForVehicleofInterest />}

      <br />
    </Container>
  );
};
const ForLifeStyle = () => {
  const [submail, setsubmail] = useState(false);
  const [subpost, setsubpost] = useState(false);
  const [lsopt1, setlsopt1] = useState(false);
  const [lsopt2, setlsopt2] = useState(false);
  const [selectedAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectedAll);
    setlsopt1(!selectedAll);
    setlsopt2(!selectedAll);
  };
  return (
    <Container fluid>
      <ToggleButtonGroup type="checkbox">
        <Row className="mt-2">
          <Col>
            <ToggleButton
              className="mt-2"
              id="toggle-check-submail"
              type="checkbox"
              variant={submail ? "dark" : "light"}
              checked={submail}
              value="1"
              onChange={(e) => setsubmail(e.currentTarget.checked)}
            >
              <i
                className={submail ? "at-the-rate-checked" : "at-the-rate"}
              ></i>
            </ToggleButton>
          </Col>
          <Col>
            <ToggleButton
              className="mt-2"
              id="toggle-check-subpost"
              type="checkbox"
              variant={subpost ? "dark" : "light"}
              checked={subpost}
              value="1"
              onChange={(e) => setsubpost(e.currentTarget.checked)}
            >
              <i className={subpost ? "email-icon-checked" : "email-icon"}></i>
            </ToggleButton>
          </Col>
        </Row>
      </ToggleButtonGroup>
      <Container fluid>
        <ToggleButtonGroup className="options" type="checkbox">
          <ToggleButton
            className="mt-2 fontsmall preferences"
            id="toggle-check-ls-opt1"
            type="checkbox"
            variant={lsopt1 ? "secondary" : "light"}
            checked={lsopt1}
            value="1"
            onChange={(e) => setlsopt1(e.currentTarget.checked)}
          >
            {lsopt1 && <i className="check-mark"></i>} Sports
          </ToggleButton>

          <ToggleButton
            className="mt-2 fontsmall preferences"
            id="toggle-check-ls-opt2"
            type="checkbox"
            variant={lsopt2 ? "secondary" : "light"}
            checked={lsopt2}
            value="2"
            onChange={(e) => setlsopt2(e.currentTarget.checked)}
          >
            {lsopt2 && <i className="check-mark"></i>} Travel
          </ToggleButton>
        </ToggleButtonGroup>
      </Container>
      <div className="select-wrap">
        <button className="btn-selectAll" onClick={() => handleSelectAll()}>
          Select All
        </button>
        <button className="btn-deselectAll" onClick={() => handleSelectAll()}>
          Deselect All
        </button>
      </div>
    </Container>
  );
};
const ForMarketing = () => {
  const [subchannelPhone, setsubchannelPhone] = useState(false);
  const [subchannelTextMassage, setsubchannelTextMsg] = useState(false);
  const [subchannelAtSign, setsubchannelAtSign] = useState(false);
  const [opt1, setopt1] = useState(false);
  const [opt2, setopt2] = useState(false);
  const [opt3, setopt3] = useState(false);
  const [opt4, setopt4] = useState(false);
  const [opt5, setopt5] = useState(false);
  const [selectedAll, setSelectAll] = useState(false);
  const handleSelectAll = () => {
    setSelectAll(!selectedAll);
    setopt1(!selectedAll);
    setopt2(!selectedAll);
    setopt3(!selectedAll);
    setopt4(!selectedAll);
    setopt5(!selectedAll);
  };
  const [DeSelectAll, setDeSelectAll] = useState(true);
  const handleDeSelectAll = () => {
    setSelectAll(!DeSelectAll);
    setopt1(!DeSelectAll);
    setopt2(!DeSelectAll);
    setopt3(!DeSelectAll);
    setopt4(!DeSelectAll);
    setopt5(!DeSelectAll);
  };
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
      <div className="select-wrap">
        <button className="btn-selectAll" onClick={() => handleSelectAll()}>
          Select All
        </button>
        <button className="btn-deselectAll" onClick={() => handleDeSelectAll()}>
          Deselect All
        </button>
      </div>
      <br />
      <ToggleButtonGroup className="options" type="checkbox">
        <ToggleButton
          className="mt-2 fontsmall preferences"
          id="toggle-check-opt1"
          type="checkbox"
          variant={opt1 ? "secondary" : "light"}
          checked={opt1}
          value="1"
          onChange={(e) => setopt1(e.currentTarget.checked)}
        >
          {opt1 && <i className="check-mark"></i>} News Letter
        </ToggleButton>

        <ToggleButton
          className="mt-2 fontsmall preferences"
          id="toggle-check-opt2"
          type="checkbox"
          variant={opt2 ? "secondary" : "light"}
          checked={opt2}
          value="2"
          onChange={(e) => setopt2(e.currentTarget.checked)}
        >
          {opt2 && <i className="check-mark"></i>} Sales Events
        </ToggleButton>

        <ToggleButton
          className="mt-2 fontsmall preferences"
          id="toggle-check-opt3"
          type="checkbox"
          variant={opt3 ? "secondary" : "light"}
          checked={opt3}
          value="3"
          onChange={(e) => setopt3(e.currentTarget.checked)}
        >
          {opt3 && <i className="check-mark"></i>} New Product Reveals and News
        </ToggleButton>

        <ToggleButton
          className="mt-2 fontsmall preferences"
          id="toggle-check-opt4"
          type="checkbox"
          variant={opt4 ? "secondary" : "light"}
          checked={opt4}
          value="4"
          onChange={(e) => setopt4(e.currentTarget.checked)}
        >
          {opt4 && <i className="check-mark"></i>} Owner Communications
        </ToggleButton>

        <ToggleButton
          className="mt-2 fontsmall preferences"
          id="toggle-check-opt5"
          type="checkbox"
          variant={opt5 ? "secondary" : "light"}
          checked={opt5}
          value="5"
          onChange={(e) => setopt5(e.currentTarget.checked)}
        >
          {opt5 && <i className="check-mark"></i>} Shopping Communications
        </ToggleButton>
      </ToggleButtonGroup>
    </Container>
  );
};
const ForServiceCommunications = () => {
  const [subchannelAtSign, setsubchannelAtSign] = useState(false);
  const [scopt1, setscopt1] = useState(false);
  const [scopt2, setscopt2] = useState(false);

  return (
    <Container fluid className="px-4">
      <ToggleButtonGroup type="checkbox">
        <Row>
          <Col>
            <ToggleButton
              className="mt-2"
              id="toggle-service-subatsign"
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
        </Row>
      </ToggleButtonGroup>
      <br />
      <ToggleButtonGroup className="options" type="checkbox">
        <ToggleButton
          className="mt-2 fontsmall preferences"
          id="toggle-check-scopt1"
          type="checkbox"
          variant={scopt1 ? "secondary" : "light"}
          checked={scopt1}
          value="1"
          onChange={(e) => setscopt1(e.currentTarget.checked)}
        >
          {scopt1 && <i className="check-mark"></i>} Service Reminders
        </ToggleButton>

        <ToggleButton
          className="mt-2 fontsmall preferences"
          id="toggle-check-scopt2"
          type="checkbox"
          variant={scopt2 ? "secondary" : "light"}
          checked={scopt2}
          value="2"
          onChange={(e) => setscopt2(e.currentTarget.checked)}
        >
          {scopt2 && <i className="check-mark"></i>} Service Promotions
        </ToggleButton>
      </ToggleButtonGroup>
    </Container>
  );
};
const ForTelematics = () => {
  const [subchannelPhone, setsubchannelPhone] = useState(false);
  const [subchannelTextMassage, setsubchannelTextMsg] = useState(false);
  const [subchannelAtSign, setsubchannelAtSign] = useState(false);
  const [tmopt1, settmopt1] = useState(false);
  const [tmopt2, settmopt2] = useState(false);
  const [tmopt3, settmopt3] = useState(false);
  const [selectedAll, setSelectAll] = useState(false);
  const handleSelectAll = () => {
    setSelectAll(!selectedAll);
    settmopt1(!selectedAll);
    settmopt2(!selectedAll);
    settmopt3(!selectedAll);
  };
  const [DeSelectAll, setDeSelectAll] = useState(true);
  const handleDeSelectAll = () => {
    setSelectAll(!DeSelectAll);
    settmopt1(!DeSelectAll);
    settmopt2(!DeSelectAll);
    settmopt3(!DeSelectAll);
  };
  return (
    <Container fluid className="px-4">
      <ToggleButtonGroup type="checkbox">
        <Row>
          <Col>
            <ToggleButton
              className="mt-2"
              id="toggle-tele-subatsign"
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
      <div className="select-wrap">
        <button className="btn-selectAll" onClick={() => handleSelectAll()}>
          Select All
        </button>
        <button className="btn-deselectAll" onClick={() => handleDeSelectAll()}>
          Deselect All
        </button>
      </div>
      <ToggleButtonGroup className="options" type="checkbox">
        <ToggleButton
          className="mt-2 fontsmall preferences"
          id="toggle-check-tmopt1"
          type="checkbox"
          variant={tmopt1 ? "secondary" : "light"}
          checked={tmopt1}
          value="1"
          onChange={(e) => settmopt1(e.currentTarget.checked)}
        >
          {tmopt1 && <i className="check-mark"></i>} Lorem Ipsum
        </ToggleButton>

        <ToggleButton
          className="mt-2 fontsmall preferences"
          id="toggle-check-tmopt2"
          type="checkbox"
          variant={tmopt2 ? "secondary" : "light"}
          checked={tmopt2}
          value="2"
          onChange={(e) => settmopt2(e.currentTarget.checked)}
        >
          {tmopt2 && <i className="check-mark"></i>} Lorem Ipsum
        </ToggleButton>

        <ToggleButton
          className="mt-2 fontsmall preferences"
          id="toggle-check-tmopt3"
          type="checkbox"
          variant={tmopt3 ? "secondary" : "light"}
          checked={tmopt3}
          value="3"
          onChange={(e) => settmopt3(e.currentTarget.checked)}
        >
          {tmopt3 && <i className="check-mark"></i>} Lorem Ipsum
        </ToggleButton>
      </ToggleButtonGroup>
    </Container>
  );
};
const RecallMessage = () => {
  return (
    <div className="recall-message">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <p>Safety Recall related message</p>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Safety Recall related message Safety Recall related message Safety
              Recall related message
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
const ButtonSection = () => {
  const [isCommnctonsVisible, setComunicationVisible] = useState(false);
  return (
    <div className="buttons-wrap">
      <div className="button-options">
        <Button variant="primary" size="sm">
          Cancel
        </Button>
        <Button variant="secondary" size="sm">
          Save
        </Button>
      </div>
      <div className="manage-subscriptions">
        <Button variant="primary" size="sm">
          Privacy Hub
        </Button>
        <Button variant="secondary" size="sm">
          Manage Telematics Subscriptions
        </Button>
      </div>
      <div className="stop-notifications">
        <p>Stop receiving all Toyota communications</p>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            One Month
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">One Month</Dropdown.Item>
            <Dropdown.Item href="#">One Quater</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <label className="switch">
          <input
            type="checkbox"
            checked={isCommnctonsVisible}
            onChange={(e) => setComunicationVisible(e.currentTarget.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};
function Dashboard() {
  return (
    <div className="home">
      <Header dashboard={true} />
      <Container fluid className="dashboard-container">
        <ProfileCard />
        <RecallMessage />
        <Navbar>
          <Nav className="me-auto" defaultActiveKey="#toyota">
            <Nav.Link activeClassName="active" href="#toyota">
              Toyota
            </Nav.Link>
            <Nav.Link href="#lexus">Lexus</Nav.Link>
          </Nav>
        </Navbar>
        <AccordionSelection />
        <ButtonSection />
      </Container>
      <Footer />
    </div>
  );
}

export default Dashboard;
