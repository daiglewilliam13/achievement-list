import React, { useState, useEffect } from 'react';
import {faTrash, faCalendarCheck} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
		if (!input){
			alert('you gotta type');
		} else {	
		setAchievements([...achievements, input]);
		setInput('');
		}
	};
	const findList = (e) => {
		e.preventDefault();
		let url = 'https://www.daigleportfolio.me/samples/achievement/' + listId;
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
	};
	const resetInput = () => {
		setName('');
		setAchievements([]);
	}
	useEffect(() => {}, [listId, achievements]);
	return (
		<>
			<div className="input-wrapper">
				<form>
					<input
						id="ach-input"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						type="text"
						name="achievement"
						placeholder="What did you get done today?"
					></input>
					<br></br>
					<button onClick={addAchievement}>I did it!</button>
				</form>
				<div className="achievements-wrapper">
					<ul>
						{achievements.map((ach, index) => {
							return (
								<li className="li-wrapper" data-key={index} key={index}>
									<span className="list-icon"><FontAwesomeIcon icon={faCalendarCheck} /></span><Achievement achievement={ach} />
									<button className="delete-button" onClick={removeSelf}><FontAwesomeIcon icon={faTrash} /></button>
								</li>
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
							placeholder="ListId"
						></input>
						<button onClick={findList}>Retrieve List</button>
						<button id="sample-list" onClick={fillWithId}>Load Sample List</button>
					</form>
				</div>
					<div id="reset-wrapper">

		<button id="clear" onClick={resetInput}>Reset/Clear All</button>
		</div>
			</div>
		</>
	);
};

export default Input;