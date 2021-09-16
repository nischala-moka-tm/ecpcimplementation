import React from "react";
import { Modal, Button } from "react-bootstrap";

const EdiProfile = () => {
    return (
        <Modal>
            <div className="form-container">
            <h5 className="heading">Your Contact information</h5>
            <Row>
              <Col md={5}>
                <label>
                  First Name<sup>*</sup>
                </label>
                <FormControl
                  type="text"
                  name="firstname"
                  value={firstname}
                  placeholder="First Name"
                  onChange={handleChange}
                ></FormControl>
              </Col>
              <Col md={2}>
                <label>Mid initial</label>
                <FormControl
                  type="text"
                  name="midname"
                  value={midname}
                  placeholder="Mid initial"
                  onChange={handleChange}
                ></FormControl>
              </Col>
              <Col md={5}>
                <label>
                  Last Name<sup>*</sup>
                </label>
                <FormControl
                  type="text"
                  name="lastname"
                  value={lastname}
                  placeholder="Last Name"
                  onChange={handleChange}
                ></FormControl>
              </Col>
              <Col md={12}>
                <label>
                  Address<sup>*</sup>
                </label>
                <FormControl
                  type="text"
                  name="address"
                  value={address}
                  placeholder="Address Line 1"
                  onChange={handleChange}
                ></FormControl>
              </Col>
              <Col md={4}>
                <label>
                  Zipcode<sup>*</sup>
                </label>
                <FormControl
                  type="text"
                  name="zipcode"
                  value={zipcode}
                  placeholder="Zip Code"
                  onChange={handleChange}
                ></FormControl>
              </Col>
              <Col md={4}>
                <label>
                  City<sup>*</sup>
                </label>
                <FormControl
                  type="text"
                  name="city"
                  value={city}
                  placeholder="City"
                  onChange={handleChange}
                ></FormControl>
              </Col>
              <Col md={4}>
                <label>State</label>
                <FormSelect aria-label="state-select" value={state}>
                  <option>State</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </FormSelect>
              </Col>
              <Col md={4}>
                <label>Country Code</label>
                <FormControl
                  type="text"
                  name="code"
                  value={code}
                  placeholder="+ 1"
                  onChange={handleChange}
                ></FormControl>
              </Col>
              <Col md={8}>
                <label>
                  Phone<sup>*</sup>
                </label>
                <FormControl
                  type="text"
                  name="phone"
                  value={phone}
                  placeholder="Phone number"
                  onChange={handleChange}
                ></FormControl>
              </Col>
              <Col md={12}>
                <label>
                  Email<sup>*</sup>
                </label>
                <FormControl
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email*"
                  onChange={handleChange}
                ></FormControl>
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
        </Modal>
    )
}

export default EdiProfile;