import { React,useState } from 'react'; 
import { Row,Col,Container,FormControl } from 'react-bootstrap';
import './Guest-user-form.css';
import  Header  from './Header';
import  Footer  from './Footer';
import { useHistory } from 'react-router-dom';
function  UserForm(){
    let history = useHistory();
    const [{firstname,midname,lastname,email,phone,address,city,zipcode},setValues]=useState([]);
   
    const handleChange= (event)=>{

        setValues({
            [event.target.name]:event.target.value
        })
    }
    const handleSubmit = ()=> {
        history.push('/dashboard');
    }
    return (
        <div className="home">
             <Header />
             <Container fluid className="jumbotron">  
                 <div className="form-container">
                    <h5 className="heading">Your Contact information</h5>
                     
                    <Row>
                        <Col md={5}>
                            <label>
                            First Name<sup>*</sup>
                            </label>
                            <FormControl type="text" name="firstname" value={firstname} onChange={handleChange}></FormControl>
                        </Col>
                        <Col md={2}>
                            <label>
                                Mid initial
                            </label>
                            <FormControl type="text" name="midname" value={midname} onChange={handleChange}></FormControl>
                        </Col>
                        <Col md={5}>
                            <label>
                                Last Name<sup>*</sup>
                            </label>
                            <FormControl type="text" name="lastname" value={lastname} onChange={handleChange}></FormControl>
                        </Col>
                        <Col md={12}>
                            <label>
                                Email<sup>*</sup>
                            </label>
                            <FormControl type="email" name="email" value={email} onChange={handleChange}></FormControl>
                        </Col>
                        <Col md={12}>
                            <label>
                                Phone<sup>*</sup>
                            </label>
                            <FormControl type="text" name="phone" value={phone} onChange={handleChange}></FormControl>
                        </Col>
                        <Col md={12}>
                            <label>
                                Address<sup>*</sup>
                            </label>
                            <FormControl type="text" name="address" value={address} onChange={handleChange}></FormControl>
                        </Col>
                        <Col md={6}>
                            <label>
                                City<sup>*</sup>
                            </label>
                            <FormControl type="text" name="city" value={city} onChange={handleChange}></FormControl>
                        </Col>
                        <Col md={6}>
                            <label>
                                Zipcode<sup>*</sup>
                            </label>
                            <FormControl type="text" name="zipcode" value={zipcode} onChange={handleChange}></FormControl>
                        </Col>
                        <Col md={12}>
                           <button className="btn btn-danger-submit" onClick={handleSubmit} type="button">Submit Request</button>
                        </Col>
                        <Col md={12} className="text-disclaimer">
                           <p><span className="text-red">Disclaimer </span> : This information is only used to save the Preferences Settings</p>
                        </Col>
                    </Row>
                     
                 </div>
             </Container>
             <Footer />
        </div>
    )
}

export default UserForm;