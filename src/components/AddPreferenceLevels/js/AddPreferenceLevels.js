import React, { useState } from "react";
import { Button, Row, Col, Modal, Container, Form } from "react-bootstrap";

import {
	editOrDelete,
	datevalue,
	editcondtion,
	propcondition,
	HelpSection,
	CategorySec,
	DateSec,
	CommentSec,
	FinalSelection,
	levelcommonprops,
	jsondataForPreference,
	ImageSec,
} from "../../CommonBlocks/js/CommonBlock";
import { AxiosPost } from "../../AxiosMethods/ApiCalls";
function AddPreferenceLevels(props) {
	let userData = {
		...propcondition(props),
		...levelcommonprops(props),
	};
	if (props.level === 4)
		userData = {
			imageFlag: true,
			uploadImage: "image",
			...userData,
			isFinalLevel: false,
		};

	const [requestData, setRequestData] = useState(userData);

	const handleChange = (e) => {
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
	const handleSubmit = (e) => {
		e.preventDefault();
		let finaldata = jsondataForPreference(requestData);
		const type = "subCategory";
		apicall(finaldata, type);
	};
	const apicall = async (finaldata, type) => {
		let resText = "";
		const result = await AxiosPost({ finaldata, type });
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
	const fileChangedHandler = (event) => {
		const formData = new FormData();
		console.log(formData);
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
				<Form id="form1" onSubmit={handleSubmit}>
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
					{props.level === 4 && (
						<ImageSec
							fileChangedHandler={fileChangedHandler}
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

					{props.level === 4 && (
						<FinalSelection onChange={(e) => onChecked(e)} />
					)}

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
export default AddPreferenceLevels;
