import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Achievement from '../Achievement/Achievement.jsx';
import {faTrash, faCalendarCheck} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './others.css';

const Others = () => {
	const [otherAchievements, setOtherAchievements] = useState({});
	useEffect(() => {
		axios({url:'/other', 
			   baseURL:'https://www.daigleportfolio.me/samples/achievement/',
			  method: 'GET',
			  headers:{
				  'Content-Type': 'application/json'
			  }})
			.then((res) => {
				setOtherAchievements(res.data[0]);
			});
	}, []);
	if (otherAchievements.achievements) {
		const dateOptions = {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};
		let date = new Date(otherAchievements.date);
		return (
			<>
			<div id="other-wrapper">
				<p>Accomplishments from other people: </p>
				<p>
					<span id="other-name">{otherAchievements.name}</span><br></br> since {date.toLocaleString('en-US', dateOptions)}
				</p>
				<ul id="other-li-wrapper">
				{otherAchievements.achievements.map((ach, index) => {
					return(
						<li className="li-wrapper">
						<span className="list-icon"><FontAwesomeIcon icon={faCalendarCheck} /></span><Achievement key={index} achievement={ach} />
						</li>
					)
				})}
				</ul>
			</div>
			</>
		);
	} else {
		return <p>One Second</p>;
	}
};

export default Others;