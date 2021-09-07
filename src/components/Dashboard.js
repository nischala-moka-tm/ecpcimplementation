import React, { useState } from 'react';
import './Dashboard.css';
import { FaCommentAlt, FaPhoneVolume, FaEnvelope, FaMinusCircle, FaPlusCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { Row, Col, Container, Navbar, Accordion, FormControl, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
const AccordionSelection = () => {

    const [isCommnctonsVisible, setComunicationVisible] = useState(false);

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header><h5>Marketing </h5></Accordion.Header>
                <Accordion.Body>
                    <Row>
                        <Col><h6>Would you like to receive marketing communications?</h6></Col>
                        <Col>
                            <label className="switch">
                                <input type="checkbox" checked={isCommnctonsVisible} onChange={(e) => setComunicationVisible(e.currentTarget.checked)} />
                                <span className="slider round"></span>
                            </label>
                        </Col>
                    </Row>
                    {isCommnctonsVisible && <Communications />}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header><h5>Survey</h5></Accordion.Header>
                <Accordion.Body>
                    Survey section
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header><h5>Services</h5></Accordion.Header>
                <Accordion.Body>
                    Service section
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header><h5>Category 4</h5></Accordion.Header>
                <Accordion.Body>
                    Category 4 Section
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
                <Accordion.Header><h5>Category 5</h5></Accordion.Header>
                <Accordion.Body>
                    Category 5 Section
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
const ProfileCard = () => {
    return (
        <div className="profile-card">
            <h6>Your personal information</h6>
            <Row>
                <Col sm={3} className="info-card">
                    <span className="text-Color"> John Smith </span><span>40392483</span>
                </Col>
                <Col sm={3} className="info-card">
                    <span>Email</span><span>john_smith@toyota.com </span><span><a href="#">Add email</a></span>
                </Col>
                <Col sm={3} className="info-card">
                    <span> Primary </span> <span> (310)-699-0221 </span>
                </Col>
                <Col sm={3} className="info-card">
                    <span className="text-danger"> <FaMapMarkerAlt size={20} /> </span> <span> 3002 carolwood LN Torrance, CA 90505-7110 </span>
                </Col>
            </Row>
        </div>
    )
}
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
                            <ToggleButton className="mt-2"
                                id="toggle-check-atsign"
                                type="checkbox"
                                variant={channelAtSign ? "danger" : "light"}
                                checked={channelAtSign}
                                value="1"
                                onChange={(e) => setchannelAtSign(e.currentTarget.checked)}
                            >
                                <i className="at-the-rate"></i>
                            </ToggleButton>
                        </Col>
                        <Col>
                            <ToggleButton className="mt-2"
                                id="toggle-check-mail"
                                type="checkbox"
                                variant={channelMail ? "danger" : "light"}
                                checked={channelMail}
                                value="2"
                                onChange={(e) => setchannelMail(e.currentTarget.checked)}
                            >
                                <FaEnvelope />
                            </ToggleButton>
                        </Col>
                        <Col>
                            <ToggleButton className="mt-2"
                                id="toggle-check-phone"
                                type="checkbox"
                                variant={channelPhone ? "danger" : "light"}
                                checked={channelPhone}
                                value="3"
                                onChange={(e) => setchannelPhone(e.currentTarget.checked)}
                            >
                                <FaPhoneVolume />
                            </ToggleButton>
                        </Col>
                        <Col>
                            <ToggleButton className="mt-2"
                                id="toggle-check-textmsg"
                                type="checkbox"
                                variant={channelTextMassage ? "danger" : "light"}
                                checked={channelTextMassage}
                                value="4"
                                onChange={(e) => setchannelTextMassage(e.currentTarget.checked)}
                            >
                                <FaCommentAlt />
                            </ToggleButton>
                        </Col>
                    </Row>
                </ToggleButtonGroup>
                <Row>
                    <Col sm={4}>
                        <FormControl type="text"></FormControl> <i className="edit">edit</i>
                    </Col>
                </Row>
            </Container>
            <hr />
            <h6>
                <button className="plusmenu-danger" onClick={() => setSMClick(!SM_clicked)}>
                    {SM_clicked ? <FaMinusCircle /> : <FaPlusCircle />} </button> &nbsp;
                Service Marketing
            </h6>

            {SM_clicked && <SubCommuncations />}

        </div>
    )
}

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
                        <ToggleButton className="mt-2"
                            id="toggle-check-subatsign"
                            type="checkbox"
                            variant={subchannelAtSign ? "danger" : "light"}
                            checked={subchannelAtSign}
                            value="1"
                            onChange={(e) => setsubchannelAtSign(e.currentTarget.checked)}
                        >
                            <i className="at-the-rate"></i>
                        </ToggleButton>
                    </Col>
                    <Col>
                        <ToggleButton className="mt-2"
                            id="toggle-check-subphone"
                            type="checkbox"
                            variant={subchannelPhone ? "danger" : "light"}
                            checked={subchannelPhone}
                            value="3"
                            onChange={(e) => setsubchannelPhone(e.currentTarget.checked)}
                        >
                            <FaPhoneVolume />
                        </ToggleButton>
                    </Col>
                    <Col>
                        <ToggleButton className="mt-2"
                            id="toggle-check-subtextmsg"
                            type="checkbox"
                            variant={subchannelTextMassage ? "danger" : "light"}
                            checked={subchannelTextMassage}
                            value="4"
                            onChange={(e) => setsubchannelTextMsg(e.currentTarget.checked)}
                        >
                            <FaCommentAlt />
                        </ToggleButton>
                    </Col>
                </Row>
            </ToggleButtonGroup>

            <h6>Sub sub Category 1</h6>
            <ToggleButtonGroup type="checkbox">
                <Row>
                    <Col>
                        <ToggleButton className="mt-2 fontsmall"
                            id="toggle-check-ConsVehicl"
                            type="checkbox"
                            variant={ConsVehicl ? "danger" : "light"}
                            checked={ConsVehicl}
                            value="3"
                            onChange={(e) => setConsVehicl(e.currentTarget.checked)}
                        >
                            Future &amp; Concept vehicles
                        </ToggleButton>
                    </Col>
                    <Col>
                        <ToggleButton className="mt-2 fontsmall"
                            id="toggle-check-MscEntrment"
                            type="checkbox"
                            variant={MscEntrment ? "danger" : "light"}
                            checked={MscEntrment}
                            value="4"
                            onChange={(e) => setMscEntrment(e.currentTarget.checked)}
                        >
                            Music Entertinment
                        </ToggleButton>
                    </Col>
                </Row>
            </ToggleButtonGroup>
        </Container>

    )
}
function Dashboard() {
    const clickedToyota = (elem) => {

    }
    return (
        <div className="home">
            <Header />
            <Container fluid className="dashboard-container">
                <ProfileCard />
                <Navbar>
                    <Navbar.Brand className="active" name="Toyota" href="#" onClick={(e) => clickedToyota(e)}>Toyota</Navbar.Brand>
                    <Navbar.Brand href="#" name="Lexus" onClick={(e) => clickedToyota(e)}>Lexus</Navbar.Brand>
                </Navbar>
                <AccordionSelection />
            </Container>
            <Footer />
        </div>


    )

}

export default Dashboard;