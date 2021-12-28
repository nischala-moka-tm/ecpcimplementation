import React from "react";
import { ToggleButton, Tooltip, OverlayTrigger } from "react-bootstrap";
function CommunicationChannel(props) {
	return (
		<OverlayTrigger
			delay={{ hide: 450, show: 300 }}
			overlay={(prps) => <Tooltip {...prps}> {props.desc} </Tooltip>}
			placement="top"
		>
			<ToggleButton
				className="mt-2"
				id={props.id}
				type="checkbox"
				variant={props.Checked ? "dark" : "light"}
				checked={props.Checked}
				value={props.value}
				onChange={props.onChecked}
				name="commchannel"
			>
				<img
					className="comm-channels"
					src={
						props.Checked
							? `../assets/${props.checkedimgSrc}`
							: `../assets/${props.imgSrc}`
					}
				/>
				<p className="mode-labels">{props.desc}</p>
				<p>{props.CheckBoxText}</p>
			</ToggleButton>
		</OverlayTrigger>
	);
}
export default CommunicationChannel;
