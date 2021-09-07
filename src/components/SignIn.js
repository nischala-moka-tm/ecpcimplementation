import React from 'react';
import './SignIn.css';
import { Container, InputGroup, Row, Col, NavLink, Nav } from 'react-bootstrap';
function SignIn() {
  // const [{userId},setUserId]=useState([]);
  // const handleChange = (event)=>{
  //     const target= event.target;
  //     const {name,value}=target;
  //     setUserId({
  //         [name]:value
  //     })
  // }
  // const handleClick = ()=>{
  //     alert('clicked');
  // }
  return (
    <Container fluid className="signin-container">
      <div className="signIn-sec">
        <span className="legend-label">Owners</span>
        <h2>Sign in</h2>
        <Row>
          <Col md={6} className="sec-left">
            <span className="or-sep">or</span>
            <InputGroup>
              <label>
                Use your email or mobile number
              </label>
              <input type="text" className="form-control"></input>
            </InputGroup>
            <Row>
              <Col>
                <button className="Sigin-btns Creat-acc">
                  Create account
                </button>
              </Col>
              <Col>
                <button className="Sigin-btns next-step">
                  Next step
                </button>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="sec-right">
            <label>Continue with Single Sign-On</label>
            <div>
              Continue with Apple
            </div >
            <div>
              Continue with Google
            </div>
            <div>
              Continue with Facebook
            </div>
          </Col>
        </Row>
        <Container fluid className="signin-footer">
          <div className="signin-footer-l">You can use your Lexus Drivers or Toyota Owners account information to log in</div>
          <div className="signin-footer-r">
            <Nav>
              <NavLink>
                Active Account
              </NavLink>
              <NavLink>
                Support
              </NavLink>
            </Nav>
          </div>
        </Container>
      </div>

    </Container>
  );
}

export default SignIn;
