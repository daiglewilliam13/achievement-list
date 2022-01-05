import React, {useState, setState, useEffect} from 'react';
import Display from '../Display/Display.jsx';

const Input = () => {
	const [achievements, setAchievements] = useState([]);
	const [input, setInput] = useState('');
	const addAchievement = (e) => {
		e.preventDefault();
		setAchievements([...achievements, input]);
	}
	return (
	<>
	<div className="input-wrapper">
	<form>
	<input onChange={e => setInput(e.target.value)} type="text" name="achievement" placeholder="What did you get done today?"></input>
	<button onClick={addAchievement}>I did it!</button>
	</form>
	<div className="your-achievements">
	<Display achievements={achievements} />
	</div>
	</div>
	</>
	)
}

export default Input;