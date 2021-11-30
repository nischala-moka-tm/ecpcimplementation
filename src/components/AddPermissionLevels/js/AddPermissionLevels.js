import React, { useState } from "react";
import { Row, Col, Modal, Form } from "react-bootstrap";
import {
  editOrDelete,
  datevalue,
  editcondtion,
  propcondition,
  HelpSection,
  CategorySec,
  EnableEmailSec,
  DateSec,
  CommentSec,
  FinalSelection,
  DefaultCommunicationModes,
  level1props,
  level2props,
  levelcommonprops,
  jsondata,
  ButtonSec,
  onlyAddconditon,
  onlyDeleteconditon,
  apicall,
  DeleteText,
  onlyEditconditon,
  onlyView,
  deleteOrView,
  DescriptionSec,
} from "../../CommonBlocks/js/CommonBlock";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const notify = () => {
  toast.error("Atleast one mode of communication has to be selected");
};

function AddPermissionLevels(props) {
  const id = props.category.id;
  let userData = {
    ...propcondition(props),
  };
  if (props.level === 1) {
    userData = { ...level1props(props), ...userData, id };
  } else if (props.level === 2) {
    userData = { ...level2props(props), ...userData };
  } else {
    userData = { ...levelcommonprops(props), ...userData };
  }
  const [requestData, setRequestData] = useState(userData);

  const handleChange = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]:
        e.target.type === "checked" ? e.target.checked : e.target.value,
    });
  };
  const onChangeAltMail = () => {
    setRequestData({
      ...requestData,
      enableAlternateEmailId: !requestData.enableAlternateEmailId,
    });
  };
  const onInputChecked = (e) => {
    setRequestData({
      ...requestData,
      [e.target.id]: e.target.checked,
    });
  };
  const onDefaultCommChecked = (e) => {
    if (!e.target.checked) {
      const index = requestData.default.indexOf(e.target.name);
      requestData.default.splice(index, 1);
      setRequestData({
        ...requestData,
        default: [...Array.from(new Set(requestData.default))],
      });
    } else {
      setRequestData({
        ...requestData,
        default: [...requestData.default, e.target.name],
      });
    }
  };

  const onSaveClick = () => {
    var form = document.getElementById("form1");
    if (form.reportValidity()) {
      getPars("add", "save");
    }
  };

  const editDeleteCondition = (optionType) => {
    return onlyEditconditon(optionType) ? handleEditSubmit : handleDeleteSubmit;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var checkedOne = Array.prototype.slice
      .call(checkboxes)
      .some((x) => x.checked);
    checkedOne = props.level === 2 ? checkedOne : true;
    if (checkedOne) {
      getPars("add", "submit");
    } else {
      {
        notify();
      }
    }
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var checkedOne = Array.prototype.slice
      .call(checkboxes)
      .some((x) => x.checked);
    checkedOne = props.level === 2 ? checkedOne : true;
    if (checkedOne) {
      getPars("edit", "update");
    } else {
      {
        notify();
      }
    }
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    getPars("delete", "delete");
  };

  const getPars = (func, action) => {
    const comments = props.category.comments;
    const finaldata = jsondata({
      ...requestData,
      comments,
      func,
    });
    const type =
      finaldata.adminMetaData.level === 1 ? "category" : "subCategory";
    apicall(
      finaldata,
      func,
      props.onClose,
      props.notify,
      props.brand,
      action,
      type
    );
  };

  return (
    <Modal
      className="modalpopup modal-permissionlevel1"
      show={props.show}
      onHide={() => props.onClose()}
    >
      <Modal.Header closeButton>
        <p>
          {onlyAddconditon(props.optionType)
            ? "Add New Permission"
            : editcondtion(props.optionType)}
        </p>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="form1"
          onSubmit={
            onlyAddconditon(props.optionType)
              ? handleSubmit
              : editDeleteCondition(props.optionType)
          }
        >
          <Row>
            <Col md={12}>
              <DeleteText {...props} />
              <p>Level {props.level}</p>
            </Col>
            <HelpSection />
          </Row>

          <CategorySec
            category={requestData.categoryname}
            onChange={(e) => handleChange(e)}
            onlyDelete={deleteOrView(props.optionType)}
          />
          <DescriptionSec
            description={requestData.description}
            onChange={(e) => handleChange(e)}
            onlyDelete={deleteOrView(props.optionType)}
          />
          {props.level === 1 && (
            <EnableEmailSec
              altEmail={requestData.enableAlternateEmailId}
              onChange={(e) => onChangeAltMail()}
              onlyDelete={deleteOrView(props.optionType)}
            />
          )}

          {props.level === 2 && (
            <DefaultCommunicationModes
              mail={requestData.mail}
              post={requestData.post}
              call={requestData.call}
              sms={requestData.sms}
              default={requestData.default}
              onChecked={(e) => onInputChecked(e)}
              onDefaultCommChecked={(e) => onDefaultCommChecked(e)}
              onlyDelete={deleteOrView(props.optionType)}
            />
          )}

          <DateSec
            startDate={requestData.startDate}
            endDate={requestData.endDate}
            type={editOrDelete(props.optionType) ? datevalue : "text"}
            onChange={(e) => handleChange(e)}
            onlyDelete={onlyDeleteconditon(props.optionType)}
            onlyView={onlyView(props.optionType)}
            onlyAddconditon={onlyAddconditon(props.optionType)}
          />

          {props.level > 2 && (
            <FinalSelection
              onlyDelete={deleteOrView(props.optionType)}
              onChecked={(e) => onInputChecked(e)}
            />
          )}
          <CommentSec
            commentText={requestData.commentText}
            onChange={(e) => handleChange(e)}
            editOrDelete={
              onlyDeleteconditon(props.optionType) ||
              onlyEditconditon(props.optionType)
            }
            onlyDelete={deleteOrView(props.optionType)}
          />
          <ButtonSec {...props} onSaveClick={onSaveClick} />
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default AddPermissionLevels;
