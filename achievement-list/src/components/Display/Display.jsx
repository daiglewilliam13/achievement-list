import React from 'react';
import Achievement from '../Achievement/Achievement.jsx';


const Display = (props) =>{
	const ach = props.achievements
	return(
	<>
		{ach.map((ach, index)=>{
		return(
		<Achievement achievement={ach} key={index} />
		)
	})}
	</>
	)
}

export default Display;

