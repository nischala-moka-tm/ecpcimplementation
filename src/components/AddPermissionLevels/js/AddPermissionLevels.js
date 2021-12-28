import React, { useState, useEffect } from "react";
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
import { iteratechannels } from "../../AddNewLevels/js/AddNewLevels";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const checkComChannels = (level, data) => {
	return level === 1 ? iteratechannels(data.modeOfCommunication) : true;
};

function AddPermissionLevels(props) {
	const id = props.category.id;
	let userData = {
		...propcondition(props),
	};
	if (props.level === 1) {
		userData = { ...level1props(props), ...userData, id };
	} else {
		userData = { ...levelcommonprops(props), ...userData };
	}
	const [requestData, setRequestData] = useState(userData);
	const handleChange = (e) => {
		setRequestData({
			...requestData,
			[e.target.name]: e.target.value,
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

	const onSaveClick = (e) => {
		e.preventDefault();
		getPars("add", "save");
	};

	const editDeleteCondition = (optionType) => {
		return onlyEditconditon(optionType) ? handleEditSubmit : handleDeleteSubmit;
	};

	const checkValidity = (level, func, type) => {
		checkComChannels(level, requestData)
			? getPars(func, type)
			: toast.error("Atleast one mode of communication has to be selected");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		checkValidity(props.level, "add", "submit");
	};

	const handleEditSubmit = (e) => {
		e.preventDefault();
		checkValidity(props.level, "edit", "update");
	};

	const handleDeleteSubmit = (e) => {
		e.preventDefault();
		getPars("delete", "delete");
	};

	const getPars = (func, action) => {
		const comments = props.category.comments;
		const leveltype = "category";
		const finaldata = jsondata({
			...requestData,
			comments,
			func,
			action,
		});
		console.log(finaldata);
		if (action === "save" && finaldata.adminMetaData.subCategoryName === "") {
			toast.error("Please Enter Category Name");
		} else {
			apicall(
				finaldata,
				func,
				props.onClose,
				props.notify,
				props.brand,
				action,
				leveltype
			);
		}
	};
	const addcondition = onlyAddconditon(props.optionType);
	return (
		<Modal
			className="modalpopup modal-permissionlevel1"
			show={props.show}
			onHide={() => props.onClose()}
		>
			<Modal.Header closeButton>
				<p>
					{addcondition ? "Add New Permission" : editcondtion(props.optionType)}
				</p>
			</Modal.Header>
			<Modal.Body>
				<Form
					id="form1"
					onSubmit={
						addcondition ? handleSubmit : editDeleteCondition(props.optionType)
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
						<>
							<EnableEmailSec
								altEmail={requestData.enableAlternateEmailId}
								onChange={(e) => onChangeAltMail()}
								onlyDelete={deleteOrView(props.optionType)}
							/>

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
						</>
					)}

					<DateSec
						startDate={requestData.startDate}
						endDate={requestData.endDate}
						type={editOrDelete(props.optionType) ? datevalue : "text"}
						onChange={(e) => handleChange(e)}
						onlyDelete={onlyDeleteconditon(props.optionType)}
						onlyView={onlyView(props.optionType)}
						onlyAddconditon={addcondition}
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
						editOrDelete={editOrDelete(props.optionType)}
						onlyDelete={deleteOrView(props.optionType)}
					/>
					<ButtonSec {...props} onSaveClick={onSaveClick} />
				</Form>
			</Modal.Body>
		</Modal>
	);
}
export default AddPermissionLevels;
