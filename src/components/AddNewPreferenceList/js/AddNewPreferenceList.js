import React, { useState } from "react";
import {
  FormControl,
  Button,
  Row,
  Col,
  Modal,
  Container,
} from "react-bootstrap";
import { BsCardImage } from "react-icons/bs";
import {
  datevalue,
  FinalSelection,
  CategorySec,
  CommentSec
} from "../../CommonBlocks/js/CommonBlock";
// import { datevalue } from "../../CommonBlocks/js/CommonBlock";



export const DateBlock = () => {
  return (
    <Row className="date-wrap">
      <Col md={5}>
        <FormControl
          type="text"
          name="fromdate"
          id="fromdate"
          placeholder="Start date & Time*"
          onFocus={(e) => (e.target.type = datevalue)}
        />
      </Col>
      <Col md={5}>
        <FormControl
          type="text"
          name="todate"
          id="todate"
          placeholder="End Date & Time*"
          onFocus={(e) => (e.target.type = datevalue)}
        />
      </Col>
    </Row>
  );
};
function AddNewPreferenceList(props) {
  const onResetAll = () => {
    handleClose();
  };
  const handleClose = () => props.onClose();

  const [labelLayout, setLabelLayout] = useState([{
    labelClicked: 2
  }])
  
  function labelAdd(e) {
    let arr = [...labelLayout];
    arr.push({ labelClicked: e });
    setLabelLayout(arr);
  }

  return (
    <div>
      <Modal.Body>
        <div className="category-level1">
          <Row className="category-sec">
            <Col md={12}>
              <p>Level 1*</p>
            </Col>
          </Row>
          <CategorySec />
          <DateBlock />
          <CommentSec
            readonly={false}
          />
        </div>
        {labelLayout.map((layout, index) => {
          return (<>
            {layout.labelClicked <= 2 ? (
              <div className="category-level2">
                <Row className="category-sec">
                  <Col md={12}>
                    <p>Level 2*</p>
                  </Col>
                </Row>
                <CategorySec onlyAdd={{ isClicked: true, labelValue: 2 }} labelAdd={labelAdd} />
                <DateBlock />
                <CommentSec
                  readonly={false}
                />
              </div>) : ''
            }
            {layout.labelClicked <= 3 ? (
              <div className="category-level3">
                <Row className="category-sec">
                  <Col md={12}>
                    <p>Level 3*</p>
                  </Col>
                </Row>

                <CategorySec onlyAdd={{ isClicked: true, labelValue: 3 }} labelAdd={labelAdd} />
                <Row className="image-upload">
                  <Col md={4}>
                    <label htmlFor="car-image">
                      <BsCardImage /> Upload Image
                    </label>
                  </Col>
                  <Col md={6}>
                    <FormControl
                      type="file"
                      id="car-image"
                      name="car-image"
                      accept="image/png, image/jpeg"
                    />
                  </Col>
                </Row>
                <DateBlock />
                <FinalSelection />
                <CommentSec
                  readonly={false}
                />
              </div>) : ''
            }
          </>)
        })}
      </Modal.Body>
      {/* <Modal.Footer>
        <Container fluid className="button-options">
          <Button variant="primary" size="sm" onClick={() => onResetAll()}>
            Cancel
          </Button> */}

          {/* <Button variant="primary" size="sm">
            Save for Later
          </Button> */}

          {/* <Button type="submit" variant="secondary" size="sm">
            Submit for Approval
          </Button> */}
        {/* </Container>
      </Modal.Footer> */}
    </div>
  );
}

export default AddNewPreferenceList;
