import React from "react";
import axios from "axios";

const contenttype = "application/json";

export const AxiosPost = async (props) => {
  const response = await axios.post(
    `https://518mvqcnuc.execute-api.us-west-2.amazonaws.com/dev/admin-meta-data/${props.brand}?action=submit&type=${props.type}`,
    JSON.stringify(props.finaldata),
    {
      headers: {
        "Content-type": contenttype,
      },
    }
  );
  return response.data.status;
};

export const AxiosGet = (props) => {
  return axios.get(
    `https://518mvqcnuc.execute-api.us-west-2.amazonaws.com/dev/admin-meta-data/${props.brand}?fetch=${props.type}`
  );
};

export const AxiosPut = async (props) => {
  const response = await axios.put(
    `https://518mvqcnuc.execute-api.us-west-2.amazonaws.com/dev/admin-meta-data/${props.brand}?action=update&type=${props.type}`,
    JSON.stringify(props.finaldata),
    {
      headers: {
        "Content-type": contenttype,
      },
    }
  );
  return response.data.status;
};

export const AxiosPostMetadata = async (props) => {
  const response = await axios.post(
    `https://518mvqcnuc.execute-api.us-west-2.amazonaws.com/dev/admin-meta-data/Toyota?action=getMetaDataDetails`,
    JSON.stringify(props),
    {
      headers: {
        "Content-type": contenttype,
      },
    }
  );
  return response.data;
};
