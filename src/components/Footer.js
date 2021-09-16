import { React } from "react";
import { Row, Col, Container } from "react-bootstrap";
function Footer() {
  return (
    <Container fluid className="footer">
      <Row>
        <Col md={true}>
          <p>Privacy Policy | California Privacy | Legal Terms</p>
        </Col>
        <Col md={true}>
          <div className="footer-r">
            <p className="text-red">Do NOT SELL MY PERSONAL IMFORMATION</p>
            <p> Cookie Consent Options</p>
          </div>
        </Col>
        <Col md={12}>
          <p>
            &copy;2011-2020 Toyota Motor Sales, U.S.A., Inc. All rights
            reserved. All information contained herein applies to vehicles
            registered in the 48 U.S.-contiguous and Alaska. Privacy Policy
            Terms of Use applies, the Apple logo and iPhone are trademarks of
            Apple Inc., registered in the U.S. and other countries. App Store is
            a service mark of Apple Inc. Google Play<sup>TM</sup> is a
            registered trademark of Google LLC.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
