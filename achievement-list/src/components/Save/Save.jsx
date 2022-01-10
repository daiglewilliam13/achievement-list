import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Save = (props) => {
	const [displayName, setDisplayName] = useState(props.displayName);
	const [listId, setListId] = useState(props.listId);
	const updateList = (id) => {
		axios
			.post('https://daigleportfolio.run-us-west2.goorm.io/samples/achievement/update', {
				id: id,
				achievements: props.achievements,
			})
			.then((res) => {
				console.log(res);
			});
	};
	const handleShare = (e) => {
	e.preventDefault();
		if (listId) {
			updateList(listId);
		} else {
			if (displayName) {
				axios
					.post(
						'https://daigleportfolio.run-us-west2.goorm.io/samples/achievement/save',
						{
							name: displayName,
							achievements: props.achievements,
						}
					)
					.then((res) => {
						setListId(res.data._id);
					});
			} else {
				alert('you need a name');
			}
		}
	};
	useEffect(() =>{
		setDisplayName(props.displayName)
		setListId(props.listId)
	},[props.displayName, props.listId])
	return (
		<div>
			<p>Save your achievements so others can see!</p>
			<form>
				<input
					required
					type="text"
					name="name"
					placeholder="Your Name"
					value={displayName}
					onChange={(e) => setDisplayName(e.target.value)}
				></input>
				<button onClick={handleShare}>{listId ? 'Update' : 'Share'} with others!</button>
			</form>
			{listId ? <p id="list-id">Your List ID: {listId}</p> : <p></p>}
		</div>
	);
};

export default Save;