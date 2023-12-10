import React, { useState, useEffect, useRef, forwardRef } from 'react';
import Intro from '../components/intro';
import Game from '../components/game';

const Home = () => {
	const [mode, setMode] = useState(false);
	const [user, setUser] = useState({ name: '', id: '' });
	return (
		<>
			{!mode ? (
				<Intro user={user} setUser={setUser} setMode={setMode} />
			) : (
				<Game user={user} />
			)}
		</>
	);
};
export default Home;
