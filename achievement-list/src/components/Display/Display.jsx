import React from 'react';
import Achievement from '../Achievement/Achievement.jsx';


const Display = (props) =>{
	const ach = props.achievements
	const ach2 = ach.map((action, index)=>{
		
		<li>
		<Achievement achievement={action} />
		</li>
	})
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

