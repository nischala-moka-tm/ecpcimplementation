import React, { useState } from "react";
import {
	Row,
	Col,
	Modal,
	ToggleButton,
	ToggleButtonGroup,
	Container,
	Button,
} from "react-bootstrap";
import "../scss/AddNewCategoryMultiple.scss";
import { AxiosCreateNewPost } from "../../AxiosMethods/ApiCalls";
import { FaRegQuestionCircle } from "react-icons/fa";
import {
	FinalSelection,
	CategorySec,
	EnableEmailSec,
	CommentSec,
	DefaultCommunicationModes,
	DateSec,
	onlyAddconditon,
	dateFormat,
	jsondata,
	DescriptionSec,
} from "../../CommonBlocks/js/CommonBlock";

const fileChangedHandler = (event) => {
	const formData = new FormData();
	console.log(formData);
};
const ForPermission = ({
	handleChange,
	altEmail,
	onChangeAltMail,
	labelLayout,
	commChannels,
	onInputChecked,
	labelAdd,
	onCommChecked,
	optionType,
}) => {
	return (
		<div className="create-levels">
			<div className="category-level1">
				<form id="form2">
					<Row className="category-sec">
						<Col md={12}>
							<p>Level 1*</p>
						</Col>
					</Row>
					<CategorySec onChange={(e) => handleChange(e, 1)} />
					<DescriptionSec onChange={(e) => handleChange(e, 1)} />
					<EnableEmailSec
						altEmail={altEmail}
						onChange={(e) => onChangeAltMail()}
					/>
					<DefaultCommunicationModes
						mail={commChannels.mail}
						post={commChannels.post}
						call={commChannels.call}
						sms={commChannels.sms}
						default={commChannels.default}
						onDefaultCommChecked={(e) => onCommChecked(e)}
						onChecked={(e) => onInputChecked(e)}
						onlyDelete={optionType === "Delete"}
					/>
					<DateSec
						type={"text"}
						onChange={(e) => handleChange(e, 1)}
						onlyAddconditon={onlyAddconditon("Add")}
					/>
					<CommentSec readonly={false} onChange={(e) => handleChange(e, 1)} />
				</form>
			</div>
			{labelLayout.map((layout, index) => {
				return (
					<div key={index}>
						{layout.labelClicked <= 2 && (
							<div className="category-level2">
								<Row className="category-sec">
									<Col md={12}>
										<p>Level 2*</p>
									</Col>
								</Row>
								<CategorySec
									onlyAdd={{ isClicked: true, labelValue: 2 }}
									labelAdd={labelAdd}
									onChange={(e) => handleChange(e, 2)}
								/>
								<DescriptionSec onChange={(e) => handleChange(e, 2)} />
								<DateSec onChange={(e) => handleChange(e, 2)} />
								<CommentSec
									readonly={false}
									onChange={(e) => handleChange(e, 2)}
								/>
							</div>
						)}
						{layout.labelClicked <= 3 && (
							<div className="category-level3">
								<Row className="category-sec">
									<Col md={12}>
										<p>Level 3*</p>
									</Col>
								</Row>
								<CategorySec
									onlyAdd={{ isClicked: true, labelValue: 3 }}
									labelAdd={labelAdd}
									onChange={(e) => handleChange(e, 3)}
								/>
								<DescriptionSec onChange={(e) => handleChange(e, 3)} />
								<DateSec onChange={(e) => handleChange(e, 3)} />
								<FinalSelection onChecked={(e) => onInputChecked(e)} />
								<CommentSec
									readonly={false}
									onChange={(e) => handleChange(e, 3)}
								/>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};
const getResponse = (res, notify, onClose) => {
	let resText = "";
	if (res.code === "200") {
		onClose();
		resText = res.messages[0].description;
		notify(resText, "success");
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	} else {
		res.messages.map((i) => {
			resText += `${i.description}\n`;
		});
		notify(resText, "error");
	}
};
const commonprops = (level, rank, { name, value, type, checked }) => {
	return {
		[name]: type === "checked" ? checked : value,
		level,
		rank: rank,
		subCategory: [],
	};
};
function AddNewCategoryMultiple(props) {
	const [levelOneData, setLevelOneData] = useState({});
	const [levelTwoData, setLevelTwoData] = useState([]);
	const [levelThreeData, setLevelThreeData] = useState([]);
	const [altEmail, setAltMail] = useState(false);
	const [commChannels, setCommChannels] = useState({
		mail: false,
		post: false,
		call: false,
		sms: false,
		default: [],
	});
	const [Permission, setCategory] = useState(true);
	const [labelLayout, setLabelLayout] = useState([
		{
			labelClicked: 2,
		},
	]);
	const labelAdd = (e) => {
		const arr = [...labelLayout];
		arr.push({ labelClicked: e });
		setLabelLayout(arr);
	};
	const handleChange = (e, level) => {
		const commnspars = { ...commonprops(level, labelLayout.length, e.target) };
		if (Permission) {
			if (level === 1) {
				setLevelOneData({
					...levelOneData,
					brand: props.brand,
					enableAlternateEmailId: altEmail,
					...commonprops(level, level, e.target),
					...commChannels,
				});
			} else if (level === 2) {
				setLevelTwoData({
					...levelTwoData,
					...commnspars,
				});
			} else if (level === 3) {
				setLevelThreeData({
					...levelThreeData,
					...commnspars,
				});
			}
		}
	};
	const onInputChecked = (e) => {
		setCommChannels({
			...commChannels,
			[e.target.id]: e.target.checked,
		});
	};
	const onCommChecked = (e) => {
		if (!e.target.checked) {
			const index = commChannels.default.indexOf(e.target.name);
			commChannels.default.splice(index, 1);
			setCommChannels({
				...commChannels,
				default: [...Array.from(new Set(commChannels.default))],
			});
		} else {
			setCommChannels({
				...commChannels,
				default: [...commChannels.default, e.target.name],
			});
		}
	};
	const onChangeAltMail = () => {
		setAltMail(!altEmail);
	};
	const onChangeCategory = (e) => {
		setCategory({
			[e.target.id]: e.target.checked,
		});
	};
	const onFormSubmit = async () => {
		levelOneData.startDate = dateFormat(levelOneData.startDate);
		levelTwoData.startDate = dateFormat(levelTwoData.startDate);
		levelThreeData.startDate = dateFormat(levelThreeData.startDate);
		levelOneData.endDate = dateFormat(levelOneData.endDate);
		levelTwoData.endDate = dateFormat(levelTwoData.endDate);
		levelThreeData.endDate = dateFormat(levelThreeData.endDate);
		let { adminMetaData: level1 } = jsondata({
			...levelOneData,
			comments: [],
			func: "add",
		});
		let { adminMetaData: level2 } = jsondata({
			...levelTwoData,
			comments: [],
			func: "add",
		});
		let { adminMetaData: level3 } = jsondata({
			...levelThreeData,
			comments: [],
			func: "add",
		});
		level2 = { ...level2, subCategory: [level3] };
		level1 = { ...level1, subCategory: [level2] };
		const finalData = {
			adminMetaData: level1,
		};
		const getMetaData = await AxiosCreateNewPost({
			finalData,
			brand: props.brand,
		});
		getResponse(getMetaData, props.notify, props.onClose);
	};
	return (
		<Modal
			className="modalpopup modal-newcategory"
			show={props.show}
			onHide={() => props.onClose()}
		>
			<Modal.Header closeButton>
				<p>Add New Category</p>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col md={8}>
						<ToggleButtonGroup
							className="category-options"
							name="alternative-email-toggle"
							type="radio"
						>
							<ToggleButton
								variant={Permission ? "dark" : "light"}
								name="permission-category"
								id="Permission"
								checked={Permission}
								type="radio"
								onChange={(e) => onChangeCategory(e)}
								value="Permission"
								className="shadow-none"
							>
								Permission
							</ToggleButton>

							<ToggleButton
								variant={!Permission ? "dark" : "light"}
								name="alternative-email"
								id="Preference"
								type="radio"
								checked={!Permission}
								onChange={(e) => onChangeCategory(e)}
								value="Preference"
								className="shadow-none"
							>
								Preference
							</ToggleButton>
						</ToggleButtonGroup>
					</Col>
					<Col md={4}>
						<div className="help-sec">
							<span className="help-icon">
								<FaRegQuestionCircle varient="red" />
							</span>
							<p>Help</p>
						</div>
					</Col>
				</Row>
				{Permission && (
					<ForPermission
						handleChange={handleChange}
						altEmail={altEmail}
						onChangeAltMail={onChangeAltMail}
						labelLayout={labelLayout}
						commChannels={commChannels}
						onInputChecked={onInputChecked}
						labelAdd={labelAdd}
						onCommChecked={onCommChecked}
						optionType={props.optionType}
					/>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Container fluid className="button-options">
					<Button variant="primary" size="sm" onClick={() => props.onClose()}>
						Cancel
					</Button>

					<Button
						type="submit"
						variant="secondary"
						size="sm"
						onClick={(e) => onFormSubmit()}
					>
						Submit for Approval
					</Button>
				</Container>
			</Modal.Footer>
		</Modal>
	);
}

export default AddNewCategoryMultiple;
