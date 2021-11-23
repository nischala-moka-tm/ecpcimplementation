import React from "react";
import "../scss/Reports-PermissionAndPreference.scss";
import { ReportsPermissionAndPreference } from "../js/Reports-PermissionAndPreference";
export default function ReportsAudit(props) {
	return (
		<ReportsPermissionAndPreference {...props} type={`report&type=audit`} />
	);
}
