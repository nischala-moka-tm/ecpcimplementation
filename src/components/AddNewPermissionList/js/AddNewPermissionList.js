import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import {
  CategorySec,
  EnableEmailSec,
  DateSec,
  CommentSec,
  FinalSelection,
  DefaultCommunicationModes,
  ImageSec,
} from "../../CommonBlocks/js/CommonBlock";

const LoopLevel = (level) => {
  let array = [];
  for (let i = level.level; i <= 5; i++) {
    array = [...array, i];
  }
  console.log(array);
  return (
    <>
      {array.map((lvl, index) => {
        return <LevelCommon key={index} level={lvl} type="Permission" />;
      })}
    </>
  );
};
export const LevelCommon = (props) => {
  const [newLevel, setNewLevel] = useState(false);
  return (
    <div className="sublevel">
      <Row>
        <Col md={12} className="subhead">
          <p>Level {props.level}</p>
          <button
            variant="primary"
            className="plusmenu-danger"
            onClick={() => setNewLevel(true)}
          >
            <FaPlus />
          </button>
        </Col>
      </Row>
      <CategorySec />
      {props.level === 1 && props.type === "Permission" && <EnableEmailSec />}
      {props.level === 2 && props.type === "Permission" && (
        <DefaultCommunicationModes />
      )}
      {props.level === 3 && props.type === "Preference" && <ImageSec />}
      <DateSec />
      {props.level !== 1 &&
        props.level !== 2 &&
        props.type === "Permission" && <FinalSelection />}
      <CommentSec />
      {newLevel && <LoopLevel level={props.level} />}
    </div>
  );
};

function AddNewPermissionList() {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((level, index) => {
        return <LevelCommon key={index} level={level} type="Permission" />;
      })}
    </div>
  );
}

export default AddNewPermissionList;
