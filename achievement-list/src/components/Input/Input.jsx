import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Save from '../Save/Save.jsx';
import Achievement from '../Achievement/Achievement.jsx';
import './input.css';

const Input = () => {
	const [achievements, setAchievements] = useState([]);
	const [input, setInput] = useState('');
	const [name, setName] = useState('');
	const [listId, setListId] = useState('');
	const addAchievement = (e) => {
		e.preventDefault();
		setAchievements([...achievements, input]);
		setInput('');
	};
	const findList = (e) => {
		e.preventDefault();
		let url = 'https://daigleportfolio.me/samples/achievement/' + listId;
		axios.get(url).then((res) => {
			setAchievements(res.data.achievements);
			setName(res.data.name);
		});
	};
	const fillWithId = (e) => {
		e.preventDefault();
		setListId('61db929371bb51061f686efc');
	};
	const removeSelf = (e) => {
		e.preventDefault();
		let index = e.target.parentNode.dataset.key;
		let arr = [...achievements];
		arr.splice(index, 1);
		setAchievements(arr);
		console.log(achievements);
	}
	useEffect(() => {}, [listId, achievements]);
	return (
		<>
			<div className="input-wrapper">
				<form>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						type="text"
						name="achievement"
						placeholder="What did you get done today?"
					></input>
					<button onClick={addAchievement}>I did it!</button>
				</form>
				<div className="achievements-wrapper">
				<ul>
					{achievements.map((ach, index) => {
						return (
							<>
								<li className="li-wrapper" data-key={index} >
									<Achievement achievement={ach} key={index} />
									<button onClick={removeSelf}>Del</button>
								</li>
							</>
						);
					})}
				</ul>
				</div>
				<div className="save-wrapper">
					<Save achievements={achievements} displayName={name} listId={listId} />
					<form>
						<input
							value={listId}
							onChange={(e) => setListId(e.target.value)}
							type="text"
							name="listId"
						></input>
						<button onClick={findList}>Retrievements</button>
						<button onClick={fillWithId}>Sample List</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Input;