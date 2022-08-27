import React, { useContext, useState, useEffect } from "react";
import Card from "./components/Card";
import AuthContext  from "./context/AuthContext";

export default function HiraganaPage(props) {
	console.log(props.userCompleted)
	
	let { user, authTokens } = useContext(AuthContext);
	
	const [renderedHiraganaList, setRenderedHiraganaList] = useState("");

	useEffect(() => {
		fetch(`/api/account/items/update/${props.userCompleted.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authTokens && authTokens.access}`,
			},
			body: JSON.stringify({
				body: props.userCompleted.body,
			}),
		});
		try {
			getCharacters();
		} catch {
			getCharacters();
			console.log("fails");
		}
	}, [props.userCompleted]);

	

	

	let getCharacters = async () => {
		let response = await fetch("/api/hiragana");
		let data = await response.json();
		const hiraganaList = data.hiragana;

		const returnhiraganaList = hiraganaList.map((item) => {
			item.table.forEach((element, index) => {
				item.table[index] = (
					<Card
						key={element.uniqueID}
						onchange={props.userCompletedItem}
						id={element.uniqueID}
						completedChars={props.userCompleted.body}
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
