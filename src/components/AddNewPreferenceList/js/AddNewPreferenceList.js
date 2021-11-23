import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  DateSec,
  FinalSelection,
  CategorySec,
  CommentSec,
  ImageSec,
} from "../../CommonBlocks/js/CommonBlock";

const fileChangedHandler = (event) => {
  const formData = new FormData();
  console.log(formData);
};

function AddNewPreferenceList(props) {
  const [labelLayout, setLabelLayout] = useState([
    {
      labelClicked: 2,
    },
  ]);

  function labelAdd(e) {
    let arr = [...labelLayout];
    arr.push({ labelClicked: e });
    setLabelLayout(arr);
  }

  return (
    <div>
      <div className="category-level1">
        <Row className="category-sec">
          <Col md={12}>
            <p>Level 1*</p>
          </Col>
        </Row>
        <CategorySec />
        <DateSec />
        <CommentSec readonly={false} />
      </div>
      {labelLayout.map((layout, index) => {
        return (
          <>
            {layout.labelClicked <= 2 ? (
              <div className="category-level2">
                <Row className="category-sec">
                  <Col md={12}>
                    <p>Level 2*</p>
                  </Col>
                </Row>
                <CategorySec
                  onlyAdd={{ isClicked: true, labelValue: 2 }}
                  labelAdd={labelAdd}
                />
                <DateSec />
                <CommentSec readonly={false} />
              </div>
            ) : (
              ""
            )}
            {layout.labelClicked <= 3 ? (
              <div className="category-level3">
                <Row className="category-sec">
                  <Col md={12}>
                    <p>Level 3*</p>
                  </Col>
                </Row>

                <CategorySec
                  onlyAdd={{ isClicked: true, labelValue: 3 }}
                  labelAdd={labelAdd}
                />
                <ImageSec
                  fileChangedHandler={fileChangedHandler}
                  onlyDelete={props.optionType === "Delete"}
                />
                <DateSec />
                <FinalSelection />
                <CommentSec readonly={false} />
              </div>
            ) : (
              ""
            )}
          </>
        );
      })}
    </div>
  );
}

export default AddNewPreferenceList;
