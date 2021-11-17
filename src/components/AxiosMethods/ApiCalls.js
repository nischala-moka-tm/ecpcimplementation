import React from "react";
import axios from "axios";

export const AxiosPost = async (props) => {
	const response = await axios
		.post(
			`https://518mvqcnuc.execute-api.us-west-2.amazonaws.com/dev/admin-meta-data/Toyota?action=submit&type=${props.type}`,
			JSON.stringify(props.finaldata),
			{
				headers: {
					"Content-type": "application/json",
				},
			}
		) 
	return response.data.status;
};
export function AxiosGet(props) {
	return axios.get(
		`https://518mvqcnuc.execute-api.us-west-2.amazonaws.com/dev/admin-meta-data/${props.brand}?fetch=${props.type}`
	);
}
