import './App.css';
import Avatar from 'react-avatar-edit';
import { useState } from 'react';

function App() {
	const [preview, setPreview] = useState(null);
	const [src, setSrc] = useState('');

	const onClose = () => {
		setPreview(null);
	};

	const onCrop = (preview) => {
		setPreview(preview);
	};

	const onBeforeFileLoad = (elem) => {
		// if (elem.target.files[0].size > 71680) {
		// 	alert('File is too big!');
		// 	elem.target.value = '';
		// }
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<input
					type='file'
					id='camera'
					name='camera'
					capture='camera'
					accept='image/*'
				/>
				<Avatar
					width={390}
					height={295}
					onCrop={onCrop}
					onClose={onClose}
					onBeforeFileLoad={onBeforeFileLoad}
					src={src}
				/>
				<img src={preview} alt='Preview' />
			</header>
		</div>
	);
}

export default App;
