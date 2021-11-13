import React, { useState } from "react";
import { 
	Button,
	Row,
	Col,
	Modal,
	Form,
	Container,
} from "react-bootstrap";
import "../scss/AddPermissionLevel3.scss";
import { AxiosPost } from "../../AxiosMethods/ApiCalls";
import {
	editOrDelete, 
	datevalue,
	editcondtion,
	propcondition,
	HelpSection,
	CategorySec,
	DateSec,
	FinalSelection,
	CommentSec,
} from "../../CommonBlocks/js/CommonBlock";

function AdminCreateNewPermission3(props) {
	const defaultData = {
		categoryname: editOrDelete(props.optionType)
			? props.category.subCategoryName
			: "",
		...propcondition(props),
	};
	const [categoryData, setCategoryData] = useState(defaultData);
	const onResetAll = () => {
		handleClose();
	};
	const onFieldChange = (e) => {
		setCategoryData({
			...categoryData,
			[e.target.name]:
				e.target.type === "checked" ? e.target.checked : e.target.value,
		});
	};
	const handleClose = () => props.onClose();
	const onSubmit = (e) => {
		console.log(categoryData);
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
			className="modalpopup modal-permissionlevel3"
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
						<p>Level 3</p>
					</Col>
					<HelpSection />
				</Row>
				<Form id="form1" onSubmit={onSubmit}>
					<CategorySec
						category={categoryData.categoryName}
						onChange={(e) => onFieldChange(e)}
					/>

					<DateSec
						startDate={categoryData.startDate}
						endDate={categoryData.endDate}
						type={editOrDelete(props.optionType) ? datevalue : "text"}
						onChange={(e) => onFieldChange(e)}
					/>

					<FinalSelection />

					<CommentSec
						commentText={categoryData.commentText}
						onChange={(e) => onFieldChange(e)}
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
export default AdminCreateNewPermission3;
