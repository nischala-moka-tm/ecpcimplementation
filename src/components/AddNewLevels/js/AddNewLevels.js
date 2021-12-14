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
import { FaRegQuestionCircle, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
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

const Levels = ({ level, handleChange, onFinalChangeCategory, onAddBtnClick, onRemoveBtnClick, index, levelValue }) => {
    return (
        <>
            <div className={`category-level${level}`}>
                <Row className="category-sec">
                    <Col md={6}>
                        <p>Level {level}*</p>
                    </Col>
                    <Col md={6}>
                        <p className="plusmenu-danger">
                            {level === 4 && levelValue.length === 1 &&
                                <span>
                                    <span
                                        style={{ marginRight: "5px" }}
                                        onClick={() => onAddBtnClick(level)}
                                    ><FaPlusCircle /></span>
                                    <span onClick={() => onRemoveBtnClick(index)}><FaMinusCircle /> </span>
                                </span>
                            }
                            {level === 5 &&
                                <span onClick={() => onRemoveBtnClick(index)}><FaMinusCircle /> </span>
                            }
                        </p>
                    </Col>
                </Row>
                <CategorySec
                    onChange={(e) => handleChange(e, level)}
                />
                <DescriptionSec onChange={(e) => handleChange(e, level)} />
                <DateSec onChange={(e) => handleChange(e, level)} />
                <FinalSelection 
                    onChange={(e) => onFinalChangeCategory(e, level)} 
                    name={`isFinalLevel${level}`}
                    id={`isFinalLevel${level}`}
                />
                <CommentSec
                    readonly={false}
                    onChange={(e) => handleChange(e, level)}
                />
            </div>
        </>
    )
}

const ForPermission = ({
    handleChange,
    altEmail,
    onChangeAltMail,
    commChannels,
    onInputChecked,
    onCommChecked,
    optionType,
}) => {
    const [checked, setChecked] = useState(false);
    const [levelValue, setLevelValue] = useState([]);

    const onAddBtnClick = (level) => {
        setLevelValue([...levelValue, level + 1]);
    };
    const onRemoveBtnClick = (index) => {
        const values = [...levelValue];
        values.splice(index, 1);
        setLevelValue(values);
    }
    const onFinalChangeCategory = (e, level) => {
        console.log(e, level);
    };
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
            <div className="category-level2">
                <Row className="category-sec">
                    <Col md={12}>
                        <p>Level 2*</p>
                    </Col>
                </Row>
                <CategorySec
                    onChange={(e) => handleChange(e, 2)}
                />
                <DescriptionSec onChange={(e) => handleChange(e, 2)} />
                <DateSec onChange={(e) => handleChange(e, 2)} />
                <CommentSec
                    readonly={false}
                    onChange={(e) => handleChange(e, 2)}
                />
            </div>
            <div className="category-level3">
                <Row className="category-sec">
                    <Col md={6}>
                        <p>Level 3*</p>
                    </Col>
                    <Col md={6}>
                        <p className="plusmenu-danger" onClick={() => onAddBtnClick(3)}>
                            {levelValue[0] === 4 ? "" : <FaPlusCircle />}
                        </p>
                    </Col>
                </Row>
                <CategorySec
                    onChange={(e) => handleChange(e, 3)}
                />
                <DescriptionSec onChange={(e) => handleChange(e, 3)} />
                <DateSec onChange={(e) => handleChange(e, 3)} />
                {/* <FinalSelection onChecked={checked} onChange={(e) => onFinalChangeCategory(e)} /> */}
                <Row className="selection">
                    <Col md={12}>
                        <FormControl
                            name="isFinalLevel"
                            type="checkbox"
                            id="isFinalLevel"
                            onChange={(e) => onFinalChangeCategory(e, 3)}
                        />
                        <label htmlFor="isFinalLevel">Is this final level</label>
                    </Col>
                </Row>
                <CommentSec
                    readonly={false}
                    onChange={(e) => handleChange(e, 3)}
                />
            </div>
            {(levelValue.sort(function (a, b) { return a - b })).map((level, index) => (
                <Levels
                    key={index}
                    index={index}
                    level={level}
                    levelValue={levelValue}
                    onAddBtnClick={onAddBtnClick}
                    onFinalChangeCategory={onFinalChangeCategory}
                    handleChange={handleChange}
                    onRemoveBtnClick={onRemoveBtnClick}
                />
            ))}
        </div>
    );
};

const ForPreference = ({
    handleChange,
}) => {
    return (
        <div className="create-levels">
            <div className="category-level1">
                <Row className="category-sec">
                    <Col md={12}>
                        <p>Level 1*</p>
                    </Col>
                </Row>
                <CategorySec
                    onChange={(e) => handleChange(e, 1)}
                />
                <DescriptionSec onChange={(e) => handleChange(e, 1)} />
                <DateSec onChange={(e) => handleChange(e, 1)} />
                <CommentSec
                    readonly={false}
                    onChange={(e) => handleChange(e, 1)}
                />
            </div>
            <div className="category-level2">
                <Row className="category-sec">
                    <Col md={12}>
                        <p>Level 2*</p>
                    </Col>
                </Row>
                <CategorySec
                    onChange={(e) => handleChange(e, 2)}
                />
                <DescriptionSec onChange={(e) => handleChange(e, 2)} />
                <DateSec onChange={(e) => handleChange(e, 2)} />
                <CommentSec
                    readonly={false}
                    onChange={(e) => handleChange(e, 2)}
                />
            </div>
            <div className="category-level3">
                <Row className="category-sec">
                    <Col md={12}>
                        <p>Level 3*</p>
                    </Col>
                </Row>
                <CategorySec
                    onChange={(e) => handleChange(e, 3)}
                />
                <ImageSec
                    fileChangedHandler={fileChangedHandler}
                />
                <DateSec onChange={(e) => handleChange(e, 3)} />
                <CommentSec
                    readonly={false}
                    onChange={(e) => handleChange(e, 3)}
                />
            </div>
        </div>
    )
}

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
    const [{ Permission, Preference }, setCategory] = useState({
        Permission: true,
        Preference: false,
    });
    const [labelLayout, setLabelLayout] = useState([
        {
            labelClicked: 3,
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
            } else if (level === 4) {
                setLevelFourData({
                    ...levelFourData,
                    ...commnspars,
                });
            } else if (level === 5) {
                setLevelFiveData({
                    ...levelFiveData,
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
        let { adminMetaData: level5 } = jsondata({
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
        level2 = { ...level2, subCategory: [level3] };
        level1 = { ...level1, subCategory: [level2] };
        console.log(level1)

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
                {Preference && (
                    <ForPreference
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

export default AddNewLevels;
