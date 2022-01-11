import React from 'react';
import Achievement from '../Achievement/Achievement.jsx';
import './display.css';

const Display = (props) =>{
	const ach = props.achievements
	const removeSelf = (e) => {
		e.preventDefault();
		e.target.parentNode.remove();
	}
	return(
	<>
		{ach.map((ach, index)=>{
		return(
		<>
		<div className="li-wrapper">
		<Achievement achievement={ach} key={index} /><button onClick={removeSelf}>Del</button>
		</div>
		</>
		)
	})}
	</>
	)
}

export default Display;

