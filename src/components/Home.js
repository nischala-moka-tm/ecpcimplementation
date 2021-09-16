import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Home.scss";
// import Header from "./Header";
import Footer from "./Footer";
function Home() {
  const handleClick = () => {
    window.location.href = "https://account.toyota.com/";
  };
  return (
    <div className="home">
      {/* <Header/> */}
      <div className="home-body">
        <Card className="Card">
          <Container fluid="md">
            <Row>
              <Col md={12} className="user-logo"></Col>
              <Col md={12}>
                <p>
                  You can use your Lexus Drivers or Toyota Owners account
                  information to log in.
                </p>
              </Col>
              <Col md={12}>
                <button onClick={handleClick} className="Signin-btn">
                  Sign In
                </button>
              </Col>
              <Col md={12}>
                <div className="or-seperation">Or</div>
              </Col>
              <Col md={12}>
                <Link to="/guest-information" className="Guest-btn">
                  Continue as Guest
                </Link>
              </Col>
            </Row>
          </Container>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
