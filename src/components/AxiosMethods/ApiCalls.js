import React from "react";
import axios from "axios";

const contenttype = "application/json";
const { REACT_APP_API_URL } = process.env;
const API_BASE_URL = "https://axcddc2da3.execute-api.us-west-2.amazonaws.com";
export const AxiosPost = async (props) => {
	const response = await axios.post(
		`${API_BASE_URL}/dev/admin-meta-data/${props.brand}?action=${props.action}&type=${props.type}`,
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
		`${API_BASE_URL}/dev/admin-meta-data/${props.brand}?fetch=${props.type}`
	);
};

export const AxiosPut = async (props) => {
	const response = await axios.put(
		`${API_BASE_URL}/dev/admin-meta-data/${props.brand}?action=${props.action}&type=${props.type}`,
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
		`${API_BASE_URL}/dev/admin-meta-data/${props.adminMetaData.brand}?action=getMetaDataDetails`,
		JSON.stringify(props),
		{
			headers: {
				"Content-type": contenttype,
			},
		}
	);
	return response.data;
};

export const AxiosCreateNewPost = async (props) => {
	const response = await axios.post(
		`${API_BASE_URL}/dev/admin-meta-data/${props.brand}?action=submitAll`,
		JSON.stringify(props.finalData),
		{
			headers: {
				"Content-type": contenttype,
			},
		}
	);
	return response.data.status;
};
