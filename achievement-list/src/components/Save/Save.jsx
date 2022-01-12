import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from "../Modal/Modal";
import useModal from '../Modal/useModal';
import "./save.css";

const Save = (props) => {
	const {isShowing, toggle} = useModal();
	const [displayName, setDisplayName] = useState(props.displayName);
	const [listId, setListId] = useState(props.listId);
	const updateList = (id) => {
		axios
			.post('https://daigleportfolio.me/samples/achievement/update', {
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
			if (displayName && props.achievements.length > 0) {
				axios
					.post(
						'https://daigleportfolio.me/samples/achievement/save',
						{
							name: displayName,
							achievements: props.achievements,
						}
					)
					.then((res) => {
						setListId(res.data._id);
					});
			} else {
				alert('you need a name or achievement');
			}
		}
	};
	const reset = (e) => {
		window.location.reload();
	}
	const deleteList = (e) => {
		e.preventDefault();
		console.log("delete " + listId);
		if(listId==="61db929371bb51061f686efc") {
			alert("you do not have permission");
		} else {
			axios.get('https://daigleportfolio.run-us-west2.goorm.io/samples/achievement/delete/' + listId)
			.then((res)=>{
				alert('deleted');
				window.location.reload();
			})
		}
	}
	
	useEffect(() =>{
		setDisplayName(props.displayName)
		setListId(props.listId)
	},[props.displayName, props.listId])
	return (
		<>
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
				<button id="share-button" onClick={handleShare}>{listId ? 'Update' : 'Share'} with others!</button>
			</form>
			{listId ? <p id="list-id">Your List ID: {listId}</p> : <p></p>}
		</div>
		<div id="reset-wrapper">

		<button onClick={reset} id="reset-button">Reset/Clear All</button>
		</div>
		<div id="delete-wrapper">
			{ listId ?
			<>
			<button id="delete-button" onClick={toggle}>Delete List (NO UNDO)</button>
			<Modal
			isShowing={isShowing}
			hide={toggle}
			deleteList={deleteList}
			listId={listId}
			/>
			</>
			: <p></p>	
			}
		</div>
		</>
	);
};

export default Save;