import React, { useState, useEffect } from "react";
import Card from "./components/Card";

export default function HiraganaPage() {
	const [renderedHiraganaList, setRenderedHiraganaList] = useState("");
	let getCharacters = async () => {
		let response = await fetch("http://127.0.0.1:8000/api/hiragana");
		let data = await response.json();
		const hiraganaList = data.hiragana;

		const returnhiraganaList = hiraganaList.map((item) => {
			item.table.forEach((element, index) => {
				item.table[index] = (
					<Card
						key={element.id}
						character={element.character}
						romaji={element.romaji}
						referenceWords={element.referenceWords}
						refImage={element.refImage}
					/>
				);
			});
			return (
				<section key={item.type}>
					<h2>{item.type}</h2>
					<div className="character-container">{item.table}</div>
				</section>
			);
		});

		setRenderedHiraganaList(returnhiraganaList);
	};

	useEffect(() => {
		getCharacters();
	}, []);

	return (
		<div className="container hiragana-page">
			<p>
				Hiragana is one of the 3 writing systems used in japan, consisting of 46
				characters and 71 diacritics.
			</p>
			<br />
			<p>
				It's recommended to learn these characters first then move forward to
				Katakana and eventually Kanji
			</p>
			<br />
			{renderedHiraganaList}
		</div>
	);
}
