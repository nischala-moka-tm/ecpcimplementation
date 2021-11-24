import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../scss/ManageComponent.scss";
import statusDetails from "../../CategoriesData/StatusDetails.json";
import AddNewCategory from "../../AddNewCategory/js/AddNewCategory";
import AddPreferenceLevels from "../../AddPreferenceLevels/js/AddPreferenceLevels";
import DetailedViewPage from "../../DetailedViewPage/js/DetailedViewPage";
import { AxiosGet } from "../../AxiosMethods/ApiCalls";
import AddPermissionLevels from "../../AddPermissionLevels/js/AddPermissionLevels";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const SubCategory = (props) => {
	const [subCategory, setSubCategory] = useState(false);
	return (
		<div className="sub-category">
			<ul>
				<li>
					<button
						className="plusmenu-danger"
						onClick={() => setSubCategory(!subCategory)}
					>
						{props.subCategory &&
							(subCategory ? <FaMinusCircle /> : <FaPlusCircle />)}
					</button>
					<Status status={props.status} />
					{props.subCategoryName}
					<SelectablePopupLevel {...props} />
				</li>

				{props.subCategory &&
					props.subCategory.map((category, index) => {
						return (
							subCategory && (
								<SubCategory key={index} {...category} notify={props.notify} />
							)
						);
					})}
			</ul>
		</div>
	);
};

function SelectablePopupLevel(props) {
	const [showLevelPopup, setLevelPopup] = useState(false);
	const [optionType, setOptionType] = useState("Add");
	const [showDetailLevel, setShowDetailLevel] = useState(false);
	const LevelCondition1 = (category, optType) => {
		return (
			<AddPermissionLevels
				show={showLevelPopup}
				onClose={() => setLevelPopup(false)}
				category={category}
				optionType={optType}
				brand={category.brand}
				notify={props.notify}
				level={optType === "Add" ? category.level + 1 : category.level}
			/>
		);
	};
	const LevelCondition2 = (category, optType) => {
		return (
			<AddPreferenceLevels
				show={showLevelPopup}
				onClose={() => setLevelPopup(false)}
				category={category}
				optionType={optType}
				brand={category.brand}
				notify={props.notify}
				level={optType === "Add" ? category.level + 1 : category.level}
			/>
		);
	};

	return (
		<div className="dropdown-content">
			<ul className="selectble-popup">
				<li
					onClick={() => {
						setLevelPopup(true);
						setOptionType("Add");
					}}
				>
					Add New
					{props.id.includes("PREFERENCES") ? " Preference" : " Permission"}
				</li>
				<li
					onClick={() => {
						setLevelPopup(true);
						setOptionType("Edit");
					}}
				>
					Modify
				</li>
				<li onClick={() => setShowDetailLevel(true)}>View Existing Content</li>
				<li
					onClick={() => {
						setLevelPopup(true);
						setOptionType("Delete");
					}}
				>
					Delete
				</li>
			</ul>
			{showLevelPopup &&
				(props.id.includes("PREFERENCES")
					? LevelCondition2(props, optionType)
					: LevelCondition1(props, optionType))}
			{showDetailLevel && (
				<DetailedViewPage
					show={setShowDetailLevel}
					onClose={() => setShowDetailLevel(false)}
				/>
			)}
		</div>
	);
}
const SubmitApproval = (props) => {
	return (
		<Modal
			show={props.SubmitPref}
			onHide={props.handleClose}
			className="approval-popup modalpopup"
		>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<p>Your new permissions category has been submitted for approval</p>
				<div className="button-options">
					<Button variant="primary" size="sm" onClick={props.handleClose}>
						OK
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
};
function MainCategory({ category, brand, notify }) {
	const [SubC1, setSubC1] = useState(false);

	return (
		<div className="categories-list">
			<div className="heading">
				<button className="plusmenu-danger" onClick={() => setSubC1(!SubC1)}>
					{category.subCategory &&
						(SubC1 ? <FaMinusCircle /> : <FaPlusCircle />)}
				</button>
				<span className="heading-text">
					<Status status={category.status} />
					{category.categoryName}
				</span>
				<SelectablePopupLevel {...category} brand={brand} notify={notify} />
			</div>

			{category.subCategory &&
				category.subCategory.map((subCateogry, pos) => {
					return (
						SubC1 && (
							<SubCategory
								key={pos}
								{...subCateogry}
								brand={brand}
								notify={notify}
							/>
						)
					);
				})}
		</div>
	);
}
function ManageComponent(props) {
	const [showLevel1, SetLevel1] = useState(false);
	const [SubmitPref, setSubmitPref] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [categorydata, setCategoriesData] = useState([]);
	const handleClose = () => setSubmitPref(false);

	useEffect(() => {
		getApiCall();
	}, [props.brand, props.type]);
	const getApiCall = () => {
		setLoading(true);
		const getDataApi = AxiosGet({
			brand: props.brand,
			type: props.type,
		});
		getDataApi.then((result) => {
			setLoading(false);
			setCategoriesData(result.data.data);
		});
	};
	const notify = (res, resType) => {
		if (resType === "success") {
			toast.success(res);
			getApiCall();
		} else {
			toast.error(res);
		}
	};

	return (
		<div className="manage-component" id="manage-permission">
			<div className="sub-head">
				<p>Permissions/Preferences</p>
			</div>
			<div className="manage-body">
				<ToastContainer />
				<div className="status-codes">
					<ul>
						{statusDetails.map((status, index) => {
							return (
								<li key={index}>
									<span
										className="status-roundend"
										style={{ backgroundColor: status.colorCode }}
									></span>
									{status.status}
								</li>
							);
						})}
					</ul>
				</div>
				<p className="reference-guide">
					<a href="/">Click Here</a> for reference guide
				</p>
				<Button variant="primary" size="sm" onClick={() => SetLevel1(true)}>
					Create new Category
				</Button>
				<p className="info-text">
					To edit/delete existing category or subcategory right click on item
				</p>

				{isLoading
					? "Loading...."
					: categorydata &&
					  categorydata.map((category, index) => {
							return (
								<MainCategory
									category={category}
									key={index}
									brand={props.brand}
									notify={notify}
								/>
							);
					  })}
			</div>

			<div className="button-options">
				<Button
					variant="secondary"
					size="sm"
					onClick={() => setSubmitPref(!SubmitPref)}
				>
					Submit for Approval
				</Button>
				{SubmitPref && (
					<SubmitApproval SubmitPref={SubmitPref} handleClose={handleClose} />
				)}
			</div>
			{showLevel1 && (
				<AddNewCategory show={showLevel1} onClose={() => SetLevel1(false)} />
			)}
		</div>
	);
}
function Status(props) {
	let bgColor = "";
	statusDetails.map((status) => {
		if (status.status === props.status) {
			bgColor = status.colorCode;
		}
	});
	return (
		<span
			className="status-roundend"
			style={{ backgroundColor: bgColor }}
		></span>
	);
}

export default ManageComponent;
