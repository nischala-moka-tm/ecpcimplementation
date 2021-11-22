import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Modal,
  ToggleButtonGroup,
  Container,
} from "react-bootstrap";
import {
  FinalSelection,
  CategorySec,
  EnableEmailSec,
  CommentSec
} from "../../CommonBlocks/js/CommonBlock";
import CommunicationChannel from "../../CommunicationChannel/js/CommunicationChannel";
import { DateBlock } from "../../AddNewPreferenceList/js/AddNewPreferenceList";
import "../scss/AddNewPermissionList.scss";

function AddNewPermissionList(props) {
  const [altEmail, setAltMail] = useState({
    altEmailYes: true,
    altEmailNo: false,
  });
  const [commchannel1, setchannel1] = useState(false);
  const [commchannel2, setchannel2] = useState(false);
  const [commchannel3, setchannel3] = useState(false);
  const [commchannel4, setchannel4] = useState(false);
  const onResetAll = () => {
    setchannel1(false);
    setchannel2(false);
    setchannel3(false);
    setchannel4(false);
    setAltMail({
      altEmailYes: false,
      altEmailNo: false,
    });
    handleClose();
  };
  const handleClose = () => props.onClose();

  const onChangeAltMail = (e) => {
    setAltMail({
      [e.target.id]: e.target.checked,
    });
  };

  const [labelLayout, setLabelLayout] = useState([{
    labelClicked: 2
  }])

  function labelAdd(e){
     let arr = [...labelLayout];
     arr.push({labelClicked:e});
     setLabelLayout(arr);
  }

  return (
    <div>
      <Modal.Body>
        <div className="category-level1" >
          <Row className="category-sec">
            <Col md={12}>
              <p>Level 1*</p>
            </Col>
          </Row>
          <CategorySec />

          <EnableEmailSec
            altEmailYes={altEmail.altEmailYes}
            altEmailNo={altEmail.altEmailNo}
            onChange={(e) => onChangeAltMail(e)}
          />
          <DateBlock />
          <CommentSec
            readonly={false}
          />
        </div>

        {labelLayout.map((layout, index) => {
          return (<div key={index}>
            {layout.labelClicked <=2 ?  (
              <div className="category-level2">
                <Row className="category-sec">
                  <Col md={12}>
                    <p>Level 2*</p>
                  </Col>
                </Row>
                <CategorySec onlyAdd={{isClicked:true,labelValue:2}} labelAdd={labelAdd}/>
                <div className="select-default-modes">
                  <Row className="comm-mode">
                    <Col md={6}>
                      <p style={{ whiteSpace: "nowrap", fontSize: "14px" }}>
                        Mode of communication allowed<sup>*</sup>
                      </p>
                    </Col>
                    <Col md={6}>
                      <ToggleButtonGroup type="checkbox">
                        <CommunicationChannel
                          id="commchannel1"
                          Checked={commchannel1}
                          value={"1"}
                          onChecked={(e) => setchannel1(e.currentTarget.checked)}
                          checkedimgSrc={"mail-white.svg"}
                          imgSrc={"mail-dark.svg"}
                          desc={"email"}
                        />

                        <CommunicationChannel
                          id="commchannel2"
                          Checked={commchannel2}
                          value={"2"}
                          onChecked={(e) => setchannel2(e.currentTarget.checked)}
                          checkedimgSrc={"post-white.svg"}
                          imgSrc={"post-dark.svg"}
                          desc={"post"}
                        />

                        <CommunicationChannel
                          id="commchannel3"
                          Checked={commchannel3}
                          value={"3"}
                          onChecked={(e) => setchannel3(e.currentTarget.checked)}
                          checkedimgSrc={"Icon feather-phone-call.png"}
                          imgSrc={"Icon feather-phone-call-unchecked.png"}
                          desc={"call"}
                        />

                        <CommunicationChannel
                          id="commchannel4"
                          Checked={commchannel4}
                          value={"4"}
                          onChecked={(e) => setchannel4(e.currentTarget.checked)}
                          checkedimgSrc={"msg-icon-checked.png"}
                          imgSrc={"Icon material-textsms.png"}
                          desc={"SMS"}
                        />
                      </ToggleButtonGroup>
                    </Col>
                  </Row>
                  <Row className="default-mode">
                    <Col md={6}>
                      <p style={{ whiteSpace: "nowrap", fontSize: "13px" }}>
                        Select default for new or guest customer<sup>*</sup>
                      </p>
                    </Col>
                    <Col md={6}>
                      <input name="email" type="checkbox" id="email" />
                      <label htmlFor="email"></label>
                      <input name="post" type="checkbox" id="post" />
                      <label htmlFor="post"></label>
                      <input name="call" type="checkbox" id="call" />
                      <label htmlFor="call"></label>
                      <input name="message" type="checkbox" id="message" />
                      <label htmlFor="message"></label>
                    </Col>
                  </Row>
                </div>
                <DateBlock />
                <CommentSec
                  readonly={false}
                />
              </div>) : '' 
            }
            {layout.labelClicked <= 3 ?  (
              <div className="category-level3">
                <Row className="category-sec">
                  <Col md={12}>
                    <p>Level 3*</p>
                  </Col>
                </Row>
                <CategorySec onlyAdd={{isClicked:true,labelValue:3}} labelAdd={labelAdd}/>

                <DateBlock />

                <FinalSelection />

                <CommentSec
                  readonly={false}
                />
              </div>) : ''
            }
            {layout.labelClicked <= 4 ?  (
              <div className="category-level4">
                <Row className="category-sec">
                  <Col md={12}>
                    <p>Level 4*</p>
                  </Col>
                </Row>
                <CategorySec onlyAdd={{isClicked:true,labelValue:4}} labelAdd={labelAdd}/>

                <DateBlock />

                <FinalSelection />

                <CommentSec
                  readonly={false}
                />
              </div>) : ''
            }
            {layout.labelClicked <= 5 ? (
              <div className="category-level5">
                <Row className="category-sec">
                  <Col md={12}>
                    <p>Level 5*</p>
                  </Col>
                </Row>
                <CategorySec onlyAdd={{isClicked:true,labelValue:5}} labelAdd={labelAdd}/>

                <DateBlock />

                <FinalSelection />

                <CommentSec
                  readonly={false}
                />
              </div>) : ''
            }
          </div>)
        })}
      </Modal.Body>
      {/* <Modal.Footer>
        <Container fluid className="button-options">
          <Button variant="primary" size="sm" onClick={() => onResetAll()}>
            Cancel
          </Button>

          <Button type="submit" variant="secondary" size="sm">
            Submit for Approval
          </Button>
        </Container>
      </Modal.Footer> */}
    </div>
  );
}

export default AddNewPermissionList;
