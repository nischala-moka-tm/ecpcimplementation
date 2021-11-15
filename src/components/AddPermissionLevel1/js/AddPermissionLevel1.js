import React, { useState } from "react";
import { 
	Button,
	Row,
	Col,
	Modal,
	Container,
} from "react-bootstrap";
import "../scss/AddPermissionLevel1.scss";
import { AxiosPost } from "../../AxiosMethods/ApiCalls";
import {
	editOrDelete,
	dateFormat,
	datevalue,
	editcondtion,
	propcondition,
	HelpSection,
	CategorySec,
	EnableEmailSec,
	DateSec,
	CommentSec
} from "../../CommonBlocks/js/CommonBlock"; 
function AddPermissionLevel1(props) {
	const userData = {
		categoryname: editOrDelete(props.optionType)
			? props.category.categoryName
			: "",
		...propcondition(props),
	};
	const [altEmail, setAltMail] = useState({
		altEmailYes: props.category.enableAlternateEmailId,
		altEmailNo: !props.category.enableAlternateEmailId,
	});
	const [requestData, setRequestData] = useState(userData);
	const onResetAll = () => {
		setAltMail({
			altEmailYes: false,
			altEmailNo: false,
		});
		handleClose();
	};
	const handleChange = (e) => {
		setRequestData({
			...requestData,
			[e.target.name]:
				e.target.type === "checked" ? e.target.checked : e.target.value,
		});
	};
	const onChangeAltMail = (e) => {
		setAltMail({
			[e.target.id]: e.target.checked,
		});
	};
	const handleClose = () => props.onClose();

	const handleSubmit = (e) => { 
		const jsondata = {
			adminMetaData: {
				brand: "Toyota",
				categoryName: requestData.categoryname,
				level: props.level,
				rank: 1,
				enableAlternateEmailId: altEmail.altEmailYes,
				startDate: dateFormat(requestData.startDate),
				endDate: dateFormat(requestData.endDate),
				comments: [
					{
						time: "09/07/2021 08:33pm",
						user: "abc@xyz.com",
						comment: "Sample Comment 1",
					},
				],
			},
		};
		const type = "category";
		AxiosPost({ jsondata, type });
	};

	return (
		<Modal
			className="modalpopup modal-permissionlevel1"
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
					<Col md={12}>
						<p>Level 1*</p>
					</Col>
					<HelpSection />
				</Row>
				<CategorySec
					category={requestData.categoryname}
					onChange={(e) => handleChange(e)}
				/>
				<EnableEmailSec
					altEmailYes={altEmail.altEmailYes}
					altEmailNo={altEmail.altEmailNo}
					onChange={(e) => onChangeAltMail(e)}
				/>
				<DateSec
					startDate={requestData.startDate}
					endDate={requestData.endDate}
					type={editOrDelete(props.optionType) ? datevalue : "text"}
					onChange={(e) => handleChange(e)}
				/>
				<CommentSec
					commentText={requestData.commentText}
					onChange={(e) => handleChange(e)}
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
			</Modal.Body>
		</Modal>
	);
}
export default AddPermissionLevel1;
