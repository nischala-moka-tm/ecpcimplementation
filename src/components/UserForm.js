import React,{ useState,useEffect } from 'react';
import './UserForm.css';
function UserForm() {
const [{firstname,lastname,salutation,email,primaryphone,textphone,address1,address2,zipcode,city,state},setValues]=useState([]);    

useEffect(()=>{
        console.log("UserForm");
},[]);
const handleChange=(event)=>{
    const target =event.target;
        const {name,value}=target;
       setValues({
            [name]:value
        })
    }
  const handleClick = ()=>{
    alert(firstname+' '+lastname);
  }
  return (
       <div>
           <div className="userform-header">
            <span>
                Toyota Img
            </span>
            &nbsp;
            &nbsp;
            <span>
                Lexus Img
            </span>
           </div>
           <div className="userform-body">
               {/* <form name="userData"> */}
                <div className="disclaimer">
                    <span className="text-red">Disclaimer </span>: This Information only used to save the ECPC Settings
                </div>

                <h2>Help us stay in touch</h2>
               <div className="block">
                <div className="form-group">
                    <label for="salutation">Salutation</label>
                    <div className="dropdown-salutation">
                    <select name="salutation"  value={salutation} className="form-control" onChange={handleChange}>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                    </select>
                    </div>
    
                </div>
               <br/>
                <div className="form-group">
                    <label for="firstname">
                        First Name <sup>*</sup>
                    </label>
                    <input name="firstname" type="text" value={firstname} className="form-control" onChange={handleChange} />
                </div>
               
                <div className="form-group">
                    <label for="lastname">
                        Last Name <sup>*</sup>
                    </label>
                    <input name="lastname" type="text" value={lastname} className="form-control" onChange={handleChange} />
                </div>
               
                <div className="form-group">
                    <label for="email">
                        Email <sup>*</sup>
                    </label>
                    <input name="email" type="text" value={email} className="form-control" onChange={handleChange} />
                </div>
                
                <div className="form-group">
                    <label for="primaryphone">
                        Primary Phone <sup>*</sup>
                    </label>
                    <input name="primaryphone" type="text" value={primaryphone} className="form-control" onChange={handleChange}  />
                </div>
               
                <div className="form-group">
                    <label for="textphone">
                        Text Phone  
                    </label>
                    <input name="textphone" type="text" value={textphone} className="form-control" onChange={handleChange}/>
                </div>
                </div>
                
                <hr/>
                <h2>Get the marketing materials at your door step!</h2>
               
                <div className="block">
                     <div className="form-group address">
                    <label for="address1">
                        Address Line 1 <sup>*</sup> 
                    </label>
                    <input name="address1" type="text" value={address1} className="form-control" onChange={handleChange}/>
                </div>
                
                <div className="form-group address">
                    <label for="address2">
                        Address Line 2 <sup>*</sup> 
                    </label>
                    <input name="address2" type="text" value={address2} className="form-control" onChange={handleChange} />
                </div>
               
                <div className="form-group">
                    <label for="zipcode">
                        Zip Code <sup>*</sup> 
                    </label>
                    <input name="zipcode" type="text" value={zipcode} className="form-control" onChange={handleChange} />
                </div>
               
                <div className="form-group">
                    <label for="city">
                       City <sup>*</sup> 
                    </label>
                    <div className="dropdown">
                        <select name="city" className="form-control" value={city} className="form-control" onChange={handleChange}>
                            <option>Select</option>
                        </select>
                    </div>
                </div>
               
                <div className="form-group">
                    <label for="state">
                       State <sup>*</sup> 
                    </label>
                    <div className="dropdown">
                        <select name="state" className="form-control" value={state} className="form-control" onChange={handleChange}>
                            <option>Select</option>
                        </select>
                    </div>
                </div>
               
                <div className="btn-group">
                    <button className="btn btn-cancel" onClick={handleClick}>Cancel</button>
                    <button className="btn btn-submit" onClick={handleClick}>Submit</button>
                </div>
                </div>
                {/* </form> */}
           </div>
           <div className="userform-footer">
                <span className="footer-left">
                    &copy;2021 Toyota Motor Sales, U.S.A.,Inc.
                </span>
                <span className="footer-right">
                    <span className="text-red">
                        Your Privacy Rights
                    </span>
                    &nbsp; |&nbsp;
                    <span className="text-red"> 
                        Legal Terms
                    </span> 
                </span>
           </div> 
       </div>
  );
}

export default UserForm;
