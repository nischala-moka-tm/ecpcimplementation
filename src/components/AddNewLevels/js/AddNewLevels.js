import React, { useState } from "react";
import {
	Row,
	Col,
	Modal,
	FormControl,
	ToggleButton,
	ToggleButtonGroup,
	Container,
	Button,
} from "react-bootstrap";
import "../scss/AddNewLevels.scss";
import { AxiosCreateNewPost } from "../../AxiosMethods/ApiCalls";
import {
	FaRegQuestionCircle,
	FaPlusCircle,
	FaMinusCircle,
} from "react-icons/fa";
import { checkAtleastOneCommunicationMode } from "../../AddPermissionLevels/js/AddPermissionLevels";
import {
	CategorySec,
	EnableEmailSec,
	CommentSec,
	FinalSelection,
	ImageSec,
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
export const iteratechannels = (chnls) => {
	let isFalse = false;
	for (let ch in chnls) {
		if (chnls[ch] === true) {
			isFalse = true;
			break;
		}
	}
	return isFalse;
};
const Levels = ({
	level,
	handleChange,
	onFinalChangeCategory,
	onAddBtnClick,
	onRemoveBtnClick,
	index,
	levelValue,
	isfinalLevel,
}) => {
	const length = level === levelValue.length + 1;
	return (
		<div className={`category-level${level}`}>
			<Row className="category-sec">
				<Col md={6}>
					<p>Level {level}*</p>
				</Col>
				<Col md={6}>
					<p className="plusmenu-danger">
						{length && (
							<span>
								{!isfinalLevel && (
									<span
										style={{ marginRight: "5px" }}
										onClick={() => onAddBtnClick(level)}
									>
										<FaPlusCircle />
									</span>
								)}
								{level > 3 && (
									<span onClick={() => onRemoveBtnClick(index)}>
										<FaMinusCircle />{" "}
									</span>
								)}
							</span>
						)}
					</p>
				</Col>
			</Row>
			<CategorySec onChange={(e) => handleChange(e, level)} />
			<DescriptionSec onChange={(e) => handleChange(e, level)} />
			<DateSec onChange={(e) => handleChange(e, level)} />
			{length && (
				<FinalSelection
					onChecked={isfinalLevel}
					onChange={(e) => onFinalChangeCategory(e, level)}
					onlyDelete={level === 5}
				/>
			)}
			<CommentSec readonly={false} onChange={(e) => handleChange(e, level)} />
		</div>
	);
};

const ForPermission = ({
	handleChange,
	altEmail,
	onChangeAltMail,
	commChannels,
	onInputChecked,
	onCommChecked,
	optionType,
	notify,
}) => {
	const [levelValue, setLevelValue] = useState([2, 3]);
	const [isfinalLevel, setFinalLevel] = useState(null);
	const onAddBtnClick = (level) => {
		if (level < 5) {
			level + 1 === 5 && setFinalLevel(true);
			setLevelValue([...levelValue, level + 1]);
		} else {
			notify("Your can't create further Levels", "error");
		}
	};
	const onRemoveBtnClick = (index) => {
		setFinalLevel(false);
		const values = [...levelValue];
		values.splice(index, 1);
		setLevelValue(values);
	};
	const onFinalChangeCategory = (e, level) => {
		const finallevel = e.target.checked ? level : null;
		setFinalLevel(finallevel);
	};
	return (
		<div className="create-levels">
			<div className="category-level1">
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
			</div>
			{levelValue.map((level, index) => {
				return (
					<Levels
						key={index}
						index={index}
						level={level}
						levelValue={levelValue}
						onAddBtnClick={onAddBtnClick}
						onFinalChangeCategory={onFinalChangeCategory}
						handleChange={handleChange}
						isfinalLevel={isfinalLevel}
						onRemoveBtnClick={onRemoveBtnClick}
					/>
				);
			})}
		</div>
	);
};

const ForPreference = ({ handleChange }) => {
	return (
		<div className="create-levels">
			<div className="category-level1">
				<Row className="category-sec">
					<Col md={12}>
						<p>Level 1*</p>
					</Col>
				</Row>
				<CategorySec onChange={(e) => handleChange(e, 1)} />
				<DescriptionSec onChange={(e) => handleChange(e, 1)} />
				<DateSec onChange={(e) => handleChange(e, 1)} />
				<CommentSec readonly={false} onChange={(e) => handleChange(e, 1)} />
			</div>
			<div className="category-level2">
				<Row className="category-sec">
					<Col md={12}>
						<p>Level 2*</p>
					</Col>
				</Row>
				<CategorySec onChange={(e) => handleChange(e, 2)} />
				<DescriptionSec onChange={(e) => handleChange(e, 2)} />
				<DateSec onChange={(e) => handleChange(e, 2)} />
				<CommentSec readonly={false} onChange={(e) => handleChange(e, 2)} />
			</div>
			<div className="category-level3">
				<Row className="category-sec">
					<Col md={12}>
						<p>Level 3*</p>
					</Col>
				</Row>
				<CategorySec onChange={(e) => handleChange(e, 3)} />
				<ImageSec fileChangedHandler={fileChangedHandler} />
				<DateSec onChange={(e) => handleChange(e, 3)} />
				<CommentSec readonly={false} onChange={(e) => handleChange(e, 3)} />
			</div>
		</div>
	);
};

const getResponse = (res, notfy, onClose) => {
	let resText = "";
	if (res.code === "200") {
		onClose();
		resText = res.messages[0].description;
		notfy(resText, "success");
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	} else {
		res.messages.map((i) => {
			resText += `${i.description}\n`;
		});
		notfy(resText, "error");
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
function AddNewLevels(props) {
	const [levelOneData, setLevelOneData] = useState({});
	const [levelTwoData, setLevelTwoData] = useState([]);
	const [levelThreeData, setLevelThreeData] = useState([]);
	const [levelFourData, setLevelFourData] = useState([]);
	const [levelFiveData, setLevelFiveData] = useState([]);
	const [altEmail, setAltMail] = useState(false);
	const [commChannels, setCommChannels] = useState({
		mail: false,
		post: false,
		call: false,
		sms: false,
		default: [],
	});
	const [Permission, setCategory] = useState(true);

	const handleChange = (e, level) => {
		const commnspars = { ...commonprops(level, 1, e.target) };
		if (Permission) {
			switch (level) {
				case 1:
					setLevelOneData({
						...levelOneData,
						brand: props.brand,
						enableAlternateEmailId: altEmail,
						...commonprops(level, level, e.target),
						...commChannels,
					});
					break;
				case 2:
					setLevelTwoData({
						...levelTwoData,
						...commnspars,
					});
					break;
				case 3:
					setLevelThreeData({
						...levelThreeData,
						...commnspars,
					});
					break;
				case 4:
					setLevelFourData({
						...levelFourData,
						...commnspars,
					});
					break;
				case 5:
					setLevelFiveData({
						...levelFiveData,
						...commnspars,
					});
					break;
				default:
					console.log(null);
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
		setCategory(!Permission);
	};
	const onFormSubmit = async (e) => {
		e.preventDefault();
		levelOneData.startDate = dateFormat(levelOneData.startDate);
		levelTwoData.startDate = dateFormat(levelTwoData.startDate);
		levelThreeData.startDate = dateFormat(levelThreeData.startDate);
		levelFourData.startDate = dateFormat(levelFourData.startDate);
		levelFiveData.startDate = dateFormat(levelFiveData.startDate);
		levelOneData.endDate = dateFormat(levelOneData.endDate);
		levelTwoData.endDate = dateFormat(levelTwoData.endDate);
		levelThreeData.endDate = dateFormat(levelThreeData.endDate);
		levelFourData.endDate = dateFormat(levelFourData.endDate);
		levelFiveData.endDate = dateFormat(levelFiveData.endDate);
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
		let { adminMetaData: level4 } = jsondata({
			...levelFourData,
			comments: [],
			func: "add",
		});
		const { adminMetaData: level5 } = jsondata({
			...levelFiveData,
			comments: [],
			func: "add",
		});
		if (levelFourData.level === 4) {
			level3 = { ...level3, subCategory: [level4] };
		}
		if (levelFiveData.level === 5) {
			level4 = { ...level4, subCategory: [level5] };
		}
		level4 = level4.level && { subCategory: [level4] };
		level3 = { ...level3, ...level4 };
		level2 = { ...level2, subCategory: [level3] };
		level1 = { ...level1, subCategory: [level2] };

		const finalData = {
			adminMetaData: level1,
		};
		console.log(finalData);
		const getMetaData = await AxiosCreateNewPost({
			finalData,
			brand: props.brand,
		});

		iteratechannels(level1.modeOfCommunication)
			? getResponse(getMetaData, props.notify, props.onClose)
			: props.notify(
					"Atleast one mode of communication has to be selected",
					"error"
			  );
	};
	return (
		<Modal
			className="modalpopup modal-newcategory"
			show={props.show}
			onHide={() => props.onClose()}
		>
			<form id="form1" onSubmit={onFormSubmit}>
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
					{Permission ? (
						<ForPermission
							handleChange={handleChange}
							altEmail={altEmail}
							onChangeAltMail={onChangeAltMail}
							commChannels={commChannels}
							onInputChecked={onInputChecked}
							onCommChecked={onCommChecked}
							optionType={props.optionType}
							notify={props.notify}
						/>
					) : (
						<ForPreference
							handleChange={handleChange}
							altEmail={altEmail}
							onChangeAltMail={onChangeAltMail}
							commChannels={commChannels}
							onInputChecked={onInputChecked}
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

						<Button type="submit" variant="secondary" size="sm">
							Submit for Approval
						</Button>
					</Container>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default AddNewLevels;
