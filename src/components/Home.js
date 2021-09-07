import React  from 'react';
import { Link } from 'react-router-dom';
import { Container,Row,Col,Card } from 'react-bootstrap';
import './Home.css';
import Header from './Header';
import Footer from './Footer';
function Home() {
  return (
    <div className="home">
        <Header/>
        <div className="home-body">
            <Card className="Card">
                <Container fluid="md">
                    <Row>
                        <Col md={12} className="user-logo">
                            
                        </Col>
                        <Col md={12}> 
                                You can use your Lexus Drivers or Toyota Owners account information to log in.
                        </Col>
                        <Col md={12}> 
                                <Link to="/signin" className="Signin-btn">
                                    Sign In
                                </Link>
                        </Col>
                        <Col md={12}>
                            <div className="or-seperation">
                                <hr/>
                                <span>or</span>
                                <hr/>
                            </div>
                        </Col>
                        <Col md={12}>
                            <Link to="/guest-details" className="Guest-btn">
                                Continue as Guest
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </div>
       <Footer/>
    </div>  
  );
}

export default Home;
