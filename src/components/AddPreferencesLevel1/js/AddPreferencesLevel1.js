import React, { useState } from "react";
import { 
  Button,
  Row,
  Col,
  Modal,
  Form,
  Container,
} from "react-bootstrap";
import "../scss/AddPreferencesLevel1.scss";

import { AxiosPost } from "../../AxiosMethods/ApiCalls";
import {
	editOrDelete,
	propcondition,
	HelpSection,
	CategorySec,
	DateSec,
	CommentSec,
	datevalue,
	FinalSelection,
} from "../../CommonBlocks/js/CommonBlock";
const iterateComments = (comment) => {
  return `${comment.user} \n ${comment.time}  \n ${comment.comment}`;
};
function AddPreferencesLevel1(props) {
  	const PreferData1 = {
			categoryname: editOrDelete(props.optionType)
				? props.category.subCategoryName
				: "",
			...propcondition(props),
		};
		const [categoryPreferData, setcategoryPreferData] = useState(PreferData1);
		const onResetAll = () => {
			handleClose();
		};
		const onPreferChange = (e) => {
			setcategoryPreferData({
				...categoryPreferData,
				[e.target.name]:
					e.target.type === "checked" ? e.target.checked : e.target.value,
			});
		};
		const handleClose = () => props.onClose();
		const onSubmit = (e) => {
			console.log(categoryPreferData);
			e.preventDefault();
		};

		const handleSubmit = (e) => {
			const jsondata = {
				adminMetaData: {
					subCategoryName: "Sales Events",
					parentId: "VEHICLE_COMMUNICATIONS",
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
			className="modalpopup modal-preferenceslevel1"
			show={props.show}
			onHide={onResetAll}
		>
			<Modal.Header closeButton>
				<p>Add New Preference</p>
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
						category={categoryPreferData.categoryName}
						onChange={(e) => onPreferChange(e)}
					/>

					<DateSec
						startDate={categoryPreferData.startDate}
						endDate={categoryPreferData.endDate}
						type={editOrDelete(props.optionType) ? datevalue : "text"}
						onChange={(e) => onPreferChange(e)}
					/>

					<FinalSelection />

					<CommentSec
						commentText={categoryPreferData.commentText}
						onChange={(e) => onPreferChange(e)}
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
export default AddPreferencesLevel1;
