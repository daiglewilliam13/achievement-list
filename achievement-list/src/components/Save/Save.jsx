import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from "../Modal/Modal";
import useModal from '../Modal/useModal';
import "./save.css";

const Save = (props) => {
	const {isShowing, toggle} = useModal();
	const [displayName, setDisplayName] = useState(props.displayName);
	const [listId, setListId] = useState(props.listId);
	const updateList = (id) => {
		if (id=="61db929371bb51061f686efc"){
			alert('You do not have permission because you are not Mick.');
		} else {
			
		axios
			.post('https://www.daigleportfolio.me/samples/achievement/update', {
				id: id,
				achievements: props.achievements,
			})
			.then((res) => {
				console.log(res);
			});
		}
	};
	const handleShare = (e) => {
	e.preventDefault();
		if (listId) {
			updateList(listId);
		} else {
			if (displayName && props.achievements.length > 0) {
				axios
					.post(
						'https://www.daigleportfolio.me/samples/achievement/save',
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
	const deleteList = (e) => {
		e.preventDefault();
		console.log("delete " + listId);
		if(listId==="61db929371bb51061f686efc") {
			alert("you do not have permission");
		} else {
			axios.get('https://www.daigleportfolio.me/samples/achievement/delete/' + listId)
			.then((res)=>{
				alert('deleted');
				window.location.reload();
			})
		}
	}
	const copyToClip = (e) => {
		e.preventDefault();
		let text = props.listId;
		let statusEl = document.getElementById('copy-status');
navigator.clipboard.writeText(text).then(function() {
  console.log('Async: Copying to clipboard was successful!' + text);
	statusEl.innerText = 'copied to clipboard!';
}, function(err) {
  console.error('Async: Could not copy text: ', err);
});
	}
	useEffect(() =>{
		setDisplayName(props.displayName)
		setListId(props.listId)
	},[props.displayName, props.listId])
	return (
		<>
		<div id="save-wrapper">
			<p>Save your achievements so others can see!</p>
			<form>
				<input
					required
					id="name-input"
					type="text"
					name="name"
					placeholder="Your Name"
					value={displayName}
					onChange={(e) => setDisplayName(e.target.value)}
				></input>
				<button id="save-button" onClick={handleShare}>Save Your List</button>
			</form>
			{listId 
				? <p id="list-id">Your List ID: {listId}<button id="copy-icon" onClick={copyToClip}><FontAwesomeIcon icon={faCopy} /></button><span id="copy-status"></span></p> 
				: <p></p>}
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