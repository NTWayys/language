import React from "react";

export default function Card(props) {
	return (
		<div
			style={{ backgroundImage: `url(${props.refImage})` }}
			className="character-card"
		>
			<h2>{props.character}</h2>
			<h3>{props.romaji}</h3>
			<p>{props.referenceWords}</p>
		</div>
	);
}
