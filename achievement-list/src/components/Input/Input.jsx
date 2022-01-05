import React from 'react'
import Display from '../Display/Display.jsx';

const Input = () => {
	return (
	<>
	<div className="input-wrapper">
	<form>
	<input type="text" name="achievement" placeholder="What did you get done today?"></input>
	<button>I did it!</button>
	</form>
	<div className="your-achievements">
	<Display />
	</div>
	</div>
	</>
	)
}

export default Input;