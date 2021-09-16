import { React, useState } from "react";
import { Row, Col, Container, FormControl, FormSelect } from "react-bootstrap";
import "./Guest-user-form.scss";
import Header from "./Header";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import FloatingLabel from "react-bootstrap-floating-label";

function UserForm() {
  let history = useHistory();
  const [
    {
      firstname,
      midname,
      lastname,
      address,
      zipcode,
      city,
      state,
      code,
      phone,
      email,
    },
    setValues,
  ] = useState([]);

  const handleChange = (event) => {
    setValues({
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    history.push("/preferences");
  };
  return (
    <div className="guest-information">
      <Header />
      <Container fluid className="jumbotron-wrap">
        <div className="jumbotron">
          <div className="form-container">
            <h5 className="heading">Your Contact information</h5>
            <div className="sub-head">
              <p>
                All information you provide shall be held in strict accordance
                with Toyota's <a href="/">Privacy Policy.</a>
              </p>
            </div>
            <Row>
              <Col md={5}>
                <FloatingLabel
                  className="required-field"
                  controlId="firstname"
                  label="First Name"
                >
                  <FormControl
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={handleChange}
                  ></FormControl>
                </FloatingLabel>
              </Col>
              <Col md={2}>
                <FloatingLabel controlId="midname" label="Mid Name">
                  <FormControl
                    type="text"
                    name="midname"
                    value={midname}
                    onChange={handleChange}
                  ></FormControl>
                </FloatingLabel>
              </Col>
              <Col md={5}>
                <FloatingLabel controlId="lastname" label="Last Name">
                  <FormControl
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={handleChange}
                  ></FormControl>
                </FloatingLabel>
              </Col>
              <Col md={12}>
                <FloatingLabel controlId="address" label="Address Line 1">
                  <FormControl
                    type="text"
                    name="address"
                    value={address}
                    placeholder="Address Line 1"
                    onChange={handleChange}
                  ></FormControl>
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="zipcode" label="Zip Code">
                  <FormControl
                    type="text"
                    name="zipcode"
                    value={zipcode}
                    onChange={handleChange}
                  ></FormControl>
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="city" label="City">
                  <FormControl
                    type="text"
                    name="city"
                    value={city}
                    onChange={handleChange}
                  ></FormControl>
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FormSelect aria-label="state-select" value={state}>
                  <option>State</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </FormSelect>
              </Col>
              <Col md={2}>
                <FloatingLabel controlId="code" label="Code">
                  <FormControl
                    type="text"
                    name="code"
                    value={code}
                    placeholder="+ 1"
                    pattern="[A-Za-z]{3}"
                    onChange={handleChange}
                  ></FormControl>
                </FloatingLabel>
              </Col>
              <Col md={10}>
                <FloatingLabel controlId="phone" label="Phone">
                  <FormControl
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                  ></FormControl>
                </FloatingLabel>
              </Col>
              <Col md={12}>
                <FloatingLabel controlId="email" label="Email">
                  <FormControl
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                  ></FormControl>
                </FloatingLabel>
              </Col>
              <Col md={12} className="submit-btn-wrap">
                <button
                  className="btn btn-danger-submit"
                  onClick={handleSubmit}
                  type="button"
                >
                  Submit Request
                </button>
              </Col>
              <Col md={12} className="text-disclaimer">
                <p>
                  <span className="text-red">Disclaimer </span> : This
                  information is only used to save the Preferences Settings
                </p>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default UserForm;
