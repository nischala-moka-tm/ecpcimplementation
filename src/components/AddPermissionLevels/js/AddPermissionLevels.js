import React, { useState } from "react";
import { Button, Row, Col, Modal, Container, Form } from "react-bootstrap";
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
} from "../../CommonBlocks/js/CommonBlock";
import { AxiosPost, AxiosPut } from "../../AxiosMethods/ApiCalls";
function AddPermissionLevels(props) {
	let userData = {
		...propcondition(props),
	};
	if (props.level === 1) {
		userData = { ...level1props(props), ...userData };
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

	const handleSubmit = (e) => {
		e.preventDefault();
		const type = "subCategory";
		getPars("add", type);
	};
	const handleEditSubmit = (e) => {
		e.preventDefault();
		let type = "subCategory";
		props.level === 1 && (type = "category");
		getPars("edit", type);
	};
	const getPars = (func, type) => {
		const comments = props.category.comments;
		const finaldata = jsondata({
			...requestData,
			comments,
			func,
		});
		console.log(finaldata);
		apicall(finaldata, type, func);
	};
	const apicall = async (finaldata, type, func) => {
		const brand = props.band;
		const postData = { finaldata, type, brand };
		let resText = "";
		const result =
			func === "add" ? await AxiosPost(postData) : await AxiosPut(postData);
		if (result.code === "200") {
			props.onClose();
			resText = result.messages[0].description;
			props.notify(resText, "success");
		} else {
			result.messages.map((i) => {
				resText += `${i.description}\n`;
			});
			props.notify(resText, "error");
		}
	};
	return (
		<Modal
			className="modalpopup modal-permissionlevel1"
			show={props.show}
			onHide={() => props.onClose()}
		>
			<Modal.Header closeButton>
				<p>
					{props.optionType === "Add"
						? "Add New Permission"
						: editcondtion(props.optionType)}
				</p>
			</Modal.Header>
			<Modal.Body>
				<Form
					id="form1"
					onSubmit={
						props.optionType === "Add" ? handleSubmit : handleEditSubmit
					}
				>
					<Row>
						<Col md={12}>
							<p>Level {props.level}</p>
						</Col>
						<HelpSection />
					</Row>

					<CategorySec
						category={requestData.categoryname}
						onChange={(e) => handleChange(e)}
						onlyDelete={props.optionType === "Delete"}
					/>

					{props.level === 1 && (
						<EnableEmailSec
							altEmail={requestData.enableAlternateEmailId}
							onChange={(e) => onChangeAltMail()}
							onlyDelete={props.optionType === "Delete"}
						/>
					)}

					{props.level === 2 && (
						<DefaultCommunicationModes
							mail={requestData.mail}
							post={requestData.post}
							call={requestData.call}
							sms={requestData.sms}
							onChecked={(e) => onInputChecked(e)}
							onlyDelete={props.optionType === "Delete"}
						/>
					)}

					<DateSec
						startDate={requestData.startDate}
						endDate={requestData.endDate}
						type={editOrDelete(props.optionType) ? datevalue : "text"}
						onChange={(e) => handleChange(e)}
						onlyDelete={props.optionType === "Delete"}
					/>

					{props.level > 2 && <FinalSelection />}

					<CommentSec
						commentText={requestData.commentText}
						onChange={(e) => handleChange(e)}
						editOrDelete={editOrDelete(props.optionType)}
					/>

					<Container fluid className="button-options">
						<Button variant="primary" size="sm" onClick={() => props.onClose()}>
							Cancel
						</Button>

						{!editOrDelete(props.optionType) && (
							<Button variant="primary" size="sm">
								Save for Later
							</Button>
						)}
						<Button type="submit" variant="secondary" size="sm">
							Submit for Approval
						</Button>
					</Container>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
export default AddPermissionLevels;
