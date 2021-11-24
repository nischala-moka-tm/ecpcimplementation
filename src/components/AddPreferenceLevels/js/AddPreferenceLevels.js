import React, { useState } from "react";
import { Row, Col, Modal, Form } from "react-bootstrap";

import {
  editOrDelete,
  datevalue,
  editcondtionPreference,
  propcondition,
  HelpSection,
  CategorySec,
  DateSec,
  CommentSec,
  FinalSelection,
  levelcommonprops,
  jsondataForPreference,
  ImageSec,
  ButtonSec,
  onlyDeleteconditon,
  onlyAddconditon,
  apicall,
  DeleteText,
  onlyEditconditon,
  deleteOrView,
} from "../../CommonBlocks/js/CommonBlock";
function AddPreferenceLevels(props) {
  const id = props.category.id;
  let userData = {
    ...propcondition(props),
    ...levelcommonprops(props),
    id,
  };
  if (props.level === 4) {
    userData = {
      imageFlag: true,
      uploadImage: "image",
      ...userData,
      isFinalLevel: false,
    };
  }

  const [requestData, setRequestData] = useState(userData);

  const handlePreferenceChange = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]:
        e.target.type === "checked" ? e.currentTarget.checked : e.target.value,
    });
  };
  const onChecked = (e) => {
    setRequestData({
      ...requestData,
      [e.target.id]: e.currentTarget.checked,
    });
  };
  const onSaveClick = () => {
		getPars("add", "save");
	};
  const handlePrefrenceSubmit = (e) => {
    e.preventDefault();
    getPars("add", "submit");
  };
  const handlePreferenceEditSubmit = (e) => {
    e.preventDefault();
    getPars("edit", "submit");
  };
  const getPars = (func, action) => {
		const comments = props.category.comments;
		const finaldata = jsondataForPreference({
			...requestData,
			comments,
			func,
		});
		apicall(finaldata, func, props.onClose, props.notify, props.brand, action);
	};

  const fileChangedHandler = (event) => {
    const formData = new FormData();
    console.log(formData);
  };
  return (
		<Modal
			className="modalpopup modal-preference"
			show={props.show}
			onHide={() => props.onClose()}
		>
			<Modal.Header closeButton>
				<p>
					{onlyAddconditon(props.optionType)
						? "Add New Preference"
						: editcondtionPreference(props.optionType)}
				</p>
			</Modal.Header>
			<Modal.Body>
				<Form
					id="form1"
					onSubmit={
						onlyAddconditon(props.optionType)
							? handlePrefrenceSubmit
							: handlePreferenceEditSubmit
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
						onChange={(e) => handlePreferenceChange(e)}
						onlyDelete={deleteOrView(props.optionType)}
					/>
					{props.level === 4 && (
						<ImageSec
							fileChangedHandler={fileChangedHandler}
							onlyDelete={deleteOrView(props.optionType)}
						/>
					)}
					<DateSec
						startDate={requestData.startDate}
						endDate={requestData.endDate}
						type={editOrDelete(props.optionType) ? datevalue : "text"}
						onChange={(e) => handlePreferenceChange(e)}
						onlyDelete={deleteOrView(props.optionType)}
					/>
					{props.level === 4 && (
						<FinalSelection
							onChange={(e) => onChecked(e)}
							onlyDelete={deleteOrView(props.optionType)}
						/>
					)}
					<CommentSec
						commentText={requestData.commentText}
						onChange={(e) => handlePreferenceChange(e)}
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
export default AddPreferenceLevels;
