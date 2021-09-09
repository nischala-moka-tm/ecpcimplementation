import React from "react";
import "../components/Car.scss";
function Car(props) {
  return (
    <span
      className="Car-Card"
      onClick={() => props.clickSelect(props.modelName)}
    >
      <img src={props.imgUrl} className="car-img"></img>
      <h6 className="car-desc">{props.modelName}</h6>
    </span>
  );
}

export default Car;
