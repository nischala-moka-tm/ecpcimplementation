import { Button } from "react-bootstrap";
import React from "react";
import Header from "../../Header/js/Header";
import "./../scss/Disclaimer.scss";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authconfig";
function Disclaimer() {
  const { instance } = useMsal();
  const onClickAgree = async () => {
    await instance.handleRedirectPromise();
    const acounts = instance.getAllAccounts();
    if (acounts.length === 0) {
      await instance.loginRedirect(loginRequest);
    }
  };
  return (
    <>
      <Header />
      <div className="disclaimer-wrap">
        {/* <div className="logo-wrap">
          <img src={toyotalogo} alt="Toyota-logo" />
          <img src={lexuslogo} alt="Lexus Logo" />
        </div> */}
        <div className="disclaimer-inner">
          <p>
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum vLorem Ipsum vLorem
            Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
          </p>
          <ol>
            <li>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</li>{" "}
            <li>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</li>{" "}
            <li>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</li>{" "}
            <li>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</li>
          </ol>
          <p>
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum vLorem Ipsum vLorem
            Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
          </p>
          <Button variant="primary" onClick={onClickAgree}>
            I Agree
          </Button>
        </div>
      </div>
    </>
  );
}

export default Disclaimer;
