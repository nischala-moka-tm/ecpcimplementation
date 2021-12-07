import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
	FinalSelection,
	CategorySec,
	EnableEmailSec,
	CommentSec,
	DefaultCommunicationModes,
	DateSec,
} from "../../CommonBlocks/js/CommonBlock";
import "../scss/AddNewPermissionList.scss";

function AddNewPermissionList(props) {
	const [requestData, setRequestData] = useState([]);

	const handleChange = (e) => {
		setRequestData({
		...requestData,
		[e.target.name]:
			e.target.type === "checked" ? e.target.checked : e.target.value,
		});
	};
	
	const [altEmail, setAltMail] = useState(false);
	const [commChannels, setCommChannels] = useState({
		mail: false,
		post: false,
		call: false,
		sms: false,
		default: []
	});

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

	const [labelLayout, setLabelLayout] = useState([
		{
			labelClicked: 2,
		},
	]);

	function labelAdd(e) {
		const arr = [...labelLayout];
		arr.push({ labelClicked: e });
		setLabelLayout(arr);
	}

	const handleSubmit = (e) => {
		// e.preventDefault();
		// const form = e.target;
		// var form = document.getElementById("form1");
		// console.log(props.onFormSubmit);
		// console.log("form");
		props.onFormSubmit(e);
	}

	return (
		<div className="create-level1">

			<div className="category-level1">
				<form onSubmit={(e) => handleSubmit(e)} id="form2">
					<Row className="category-sec">
						<Col md={12}>
							<p>Level 1*</p>
						</Col>
					</Row>
					<CategorySec onChange={(e) => handleChange(e)}/>
					<EnableEmailSec
						altEmail={altEmail}
						onChange={(e) => onChangeAltMail()}
					/>
					<DateSec onChange={(e) => handleChange(e)}/>
					<CommentSec readonly={false} onChange={(e) => handleChange(e)}/>
				</form>
			</div>
			{labelLayout.map((layout, index) => {
				return (
					<div key={index}>
						{layout.labelClicked <= 2 ? (
							<div className="category-level2">
								<Row className="category-sec">
									<Col md={12}>
										<p>Level 2*</p>
									</Col>
								</Row>
								<CategorySec
									onlyAdd={{ isClicked: true, labelValue: 2 }}
									labelAdd={labelAdd}
								/>
								<DefaultCommunicationModes
									mail={commChannels.mail}
									post={commChannels.post}
									call={commChannels.call}
									sms={commChannels.sms}
									default={commChannels.default}
									onDefaultCommChecked={(e) => onCommChecked(e)}
									onChecked={(e) => onInputChecked(e)}
									onlyDelete={props.optionType === "Delete"}
								/>
								<DateSec />
								<CommentSec readonly={false} />
							</div>
						) : (
							""
						)}
						{layout.labelClicked <= 3 ? (
							<div className="category-level3">
								<Row className="category-sec">
									<Col md={12}>
										<p>Level 3*</p>
									</Col>
								</Row>
								<CategorySec
									onlyAdd={{ isClicked: true, labelValue: 3 }}
									labelAdd={labelAdd}
								/>
								<DateSec />
								<FinalSelection />
								<CommentSec readonly={false} />
							</div>
						) : (
							""
						)}
						{layout.labelClicked <= 4 ? (
							<div className="category-level4">
								<Row className="category-sec">
									<Col md={12}>
										<p>Level 4*</p>
									</Col>
								</Row>
								<CategorySec
									onlyAdd={{ isClicked: true, labelValue: 4 }}
									labelAdd={labelAdd}
								/>
								<DateSec />
								<FinalSelection />
								<CommentSec readonly={false} />
							</div>
						) : (
							""
						)}
						{layout.labelClicked <= 5 ? (
							<div className="category-level5">
								<Row className="category-sec">
									<Col md={12}>
										<p>Level 5*</p>
									</Col>
								</Row>
								<CategorySec
									onlyAdd={{ isClicked: true, labelValue: 5 }}
									labelAdd={labelAdd}
								/>
								<DateSec />
								<FinalSelection />
								<CommentSec readonly={false} />
							</div>
						) : (
							""
						)}
					</div>
				);
			})}
			{/* </form> */}
		</div>
	);
}

export default AddNewPermissionList;
