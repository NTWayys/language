import React, { useContext, useState, useEffect } from "react";
import Card from "./components/Card";
import AuthContext  from "./context/AuthContext";

export default function KatakanaPage() {
	let { authTokens } = useContext(AuthContext);
	let [userCompleted, setUserCompleted] = useState({
		body: [],
		id: 1,
		user: 1,
	});
	const [renderedkatakanaList, setRenderedkatakanaList] = useState("");
	useEffect(() => {
		getCompleted();
	}, []);
	useEffect(() => {
		fetch(`/api/account/items/update/${userCompleted.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authTokens && authTokens.access}`,
			},
			body: JSON.stringify({
				body: userCompleted.body,
			}),
		});
		try {
			getCharacters();
		} catch {
			getCharacters();
			console.log("fails");
		}
	}, [userCompleted]);

	let getCompleted = async () => {
		let response = await fetch(`/api/account/items/`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authTokens && authTokens.access}`,
			},
		});
		let data = await response.json();

		if (response.status === 200) {
			setUserCompleted(data);
		} else if (response.statusText === "Unauthorized") {
			console.log("not logged in");
		}
	};

	let userCompletedItem = (item) => {
		setUserCompleted((prevCompleted) => {
			const completedArr = prevCompleted.body;
			if (item.target.checked) {
				completedArr.push(item.target.id);
			} else {
				var index = completedArr.indexOf(item.target.id);
				if (index !== -1) {
					completedArr.splice(index, 1);
				}
			}
			return {
				...prevCompleted,
				body: completedArr,
			};
		});
	};

	let getCharacters = async (completedChars) => {
		let response = await fetch("/api/katakana");
		let data = await response.json();
		const katakanaList = data.katakana;

		const returnkatakanaList = katakanaList.map((item) => {
			item.table.forEach((element, index) => {
				item.table[index] = (
					<Card
						key={element.uniqueID}
						onchange={userCompletedItem}
						id={element.uniqueID}
						completedChars={userCompleted.body}
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

		setRenderedkatakanaList(returnkatakanaList);
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
			{renderedkatakanaList}
		</div>
	);
}
