import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Achievement from '../Achievement/Achievement.jsx';
const Others = () => {
	const [otherAchievements, setOtherAchievements] = useState({});
	useEffect(() => {
		axios({url:'/other', 
			   baseURL:'https://daigleportfolio.me/samples/achievement/',
			  method: 'GET'})
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
				<p>Accomplishments from other people: </p>
				<p>
					{otherAchievements.name} since {date.toLocaleString('en-US', dateOptions)}
				</p>
				{otherAchievements.achievements.map((ach, index) => {
					return <Achievement key={index} achievement={ach} className="other-ach" />;
				})}
			</>
		);
	} else {
		return <p>One Second</p>;
	}
};

export default Others;