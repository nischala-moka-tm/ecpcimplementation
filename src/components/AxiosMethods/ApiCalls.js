import React from "react";
import axios from "axios";

export function AxiosPost(props) {
  console.log(JSON.stringify(props.jsondata));
  console.log(props.type);
  let result = [];
  axios
    .post(
      `https://518mvqcnuc.execute-api.us-west-2.amazonaws.com/dev/admin-meta-data/Toyota?action=submit&type=${props.type}`,
      JSON.stringify(props.jsondata),
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )
    .then(function (response) {
      console.log(response);
      result = [...result, response];
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  return result;
}
export function AxiosGet(props) {
  return axios.get(
    `https://518mvqcnuc.execute-api.us-west-2.amazonaws.com/dev/admin-meta-data/${props.brand}?fetch=metaDataList`
  );
}
