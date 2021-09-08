import React from "react";
function Car(props) {
  return (
    <div className="Car-Card">
      <img src={props.carImg} className="car-img"></img>
      <span className="car-desc">{props.carType}</span>
    </div>
  );
}
