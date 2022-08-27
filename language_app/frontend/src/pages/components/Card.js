import React from "react";

export default function Card(props) {
	const {
		id,
		character,
		romaji,
		referenceWords,
		refImage,
		onchange,
		completedChars,
	} = props;
	const wordList = props.referenceWords.map((word, index) => (
		<p key={index}>{word}</p>
	));
	return (
		<div
			style={{ backgroundImage: `url(${refImage})` }}
			className="character-card"
		>
			<h3>{romaji}</h3>
			<h2>{character}</h2>
			<div className="wordList">
				<div className="wordBlock">{wordList}</div>
				<input
					id={id}
					onChange={onchange}
					checked={completedChars.includes(id)}
					type="checkbox"
				/>
			</div>
		</div>
	);
}
