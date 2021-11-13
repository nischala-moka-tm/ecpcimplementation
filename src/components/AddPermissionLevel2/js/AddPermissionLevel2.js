import React, { useState } from "react";
import { 
	Button,
	Row,
	Col,
	Modal,
	Form,
	Container
} from "react-bootstrap"; 
import "../scss/AddPermissionLevel2.scss";
import { AxiosPost } from "../../AxiosMethods/ApiCalls";

import {
	editOrDelete,
	datevalue,
	editcondtion,
	propcondition,
	HelpSection,
	CategorySec,
	DefaultCommunicationModes,
	DateSec,
	CommentSec,
} from "../../CommonBlocks/js/CommonBlock";

function AdminCreateNewPermission2(props) {
	const requserData = {
		categoryname: editOrDelete(props.optionType)
			? props.category.subCategoryName
			: "",
		...propcondition(props),
		mail: false,
		post: false,
		call: false,
		sms: false,
	};
	const [requestuserData, setRequestUserData] = useState(requserData);
	const onResetAll = () => {
		handleClose();
	};
	const onInputChange = (e) => {
		setRequestUserData({
			...requestuserData,
			[e.target.name]: e.target.value,
		});
	};
	const onInputChecked = (e) => {
		setRequestUserData({
			...requestuserData,
			[e.target.id]: e.target.checked,
		});
	};
	const handleClose = () => props.onClose();
	const onSubmit = (e) => {
		e.preventDefault();
	};
	const handleSubmit = (e) => {
		console.log(requestuserData);
		const jsondata = {
			adminMetaData: {
				subCategoryName: "Service Communications",
				parentId: "MARKETING",
				level: 2,
				rank: 2,
				startDate: "01/12/2021 10:00 AM",
				endDate: "01/12/2021 10:00 AM",
				comments: [
					{
						time: "09/07/2021 08:33pm",
						user: "abc@xyz.com",
						comment: "Test Sample Comment 1",
					},
				],
			},
		};

		const type = "subCategory";
		AxiosPost({ jsondata, type });
	};

	return (
		<Modal
			className="modalpopup modal-permissionlevel2"
			show={props.show}
			onHide={onResetAll}
		>
			<Modal.Header closeButton>
				<p>
					{props.optionType === "Add"
						? "Add New Permission"
						: editcondtion(props.optionType)}
				</p>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col md={6}>
						<p>Level {props.category.level}</p>
					</Col>
					<HelpSection />
				</Row>
				<Form id="form1" onSubmit={onSubmit}>
					<CategorySec
						category={requestuserData.categoryname}
						onChange={(e) => onInputChange(e)}
					/>

					<DefaultCommunicationModes
						mail={requestuserData.mail}
						post={requestuserData.post}
						call={requestuserData.call}
						sms={requestuserData.sms}
						onChecked={(e) => onInputChecked(e)}
					/>

					<DateSec
						startDate={requestuserData.startDate}
						endDate={requestuserData.endDate}
						type={editOrDelete(props.optionType) ? datevalue : "text"}
						onChange={(e) => onInputChange(e)}
					/>
					<CommentSec
						commentText={requestuserData.commentText}
						onChange={(e) => onInputChange(e)}
						readonly={false}
						editOrDelete={editOrDelete(props.optionType)}
					/>
					<Container fluid className="button-options">
						<Button variant="primary" size="sm" onClick={() => onResetAll()}>
							Cancel
						</Button>

						{!editOrDelete(props.optionType) && (
							<Button variant="primary" size="sm">
								Save for Later
							</Button>
						)}
						<Button
							type="submit"
							variant="secondary"
							size="sm"
							onClick={(e) => handleSubmit(e)}
						>
							Submit for Approval
						</Button>
					</Container>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
export default AdminCreateNewPermission2;
