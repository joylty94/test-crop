import React, { useState, useEffect, useRef, forwardRef } from 'react';
import styled from 'styled-components';

const PROBLEM = [
	'데모 게임 시작입니다',
	'문제를 빨리 작성해보세요',
	'정답은 ㅁㅁ 입니다',
	'종료 문제 입니다',
];

const Home = () => {
	const isBrowserDarkMode =
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches;
	let initTheme = isBrowserDarkMode ? 'dark' : 'light';

	const [action, setAction] = useState(false); // start, end
	const [time, setTime] = useState(0);
	const [text, setText] = useState('');

	const timer = useRef();

	const [problemIndex, setProblemIndex] = useState(0);
	const [problemHistory, setProblemHistory] = useState([]);

	const onClickAction = () => {
		setAction((prev) => {
			if (!prev) {
				setProblemHistory([]);
			}
			return !prev;
		});
	};

	const onChangeText = (e) => {
		const value = e.target.value;
		setText(value);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			if (PROBLEM[problemIndex] === text) {
				// @ts-ignore
				setProblemHistory((prev) => [...prev, `${text} - ${time}초 성공`]);
				setText('');
				setTime(0);
				if (PROBLEM.length - 1 > problemIndex) {
					setProblemIndex((prev) => prev + 1);
				} else {
					setAction(false);
					clearInterval(timer?.current);
				}
			}
		}
	};

	useEffect(() => {
		const editor = document.getElementById('editor');
		if (!action) {
			if (timer?.current) clearInterval(timer?.current);
			setTime(0);
			setProblemIndex(0);
		} else {
			timer.current = setInterval(() => {
				setTime((prev) => prev + 1);
			}, 1000);
			editor.focus();
		}
		return () => {
			if (timer?.current) clearInterval(timer?.current);
		};
	}, [action]);

	return (
		// @ts-ignore
		<HomeWrap theme={initTheme}>
			<h1>Demo Game</h1>
			<div>
				<div>
					<div className='Home__place'>
						{!action ? (
							<p>시작을 눌러주세요</p>
						) : (
							<p>{PROBLEM[problemIndex]}</p>
						)}
					</div>

					<div className='Home__editor'>
						<input
							id='editor'
							disabled={!action}
							value={text}
							onChange={onChangeText}
							onKeyPress={handleKeyPress}
							placeholder='준비하시고~'
						/>
						{/* <button>확인</button> */}
					</div>
				</div>
				<div className='Home__action'>
					<div className='Home__action-right'>
						<div className='Home__action-time'>{time} 초</div>
						<button onClick={onClickAction}>{!action ? '시작' : '종료'}</button>
					</div>
				</div>

				<div className='Home__action-history'>
					{problemHistory.length > 0 &&
						problemHistory.map((p, i) => <p key={'문제' + i}>{p}</p>)}
				</div>
			</div>
		</HomeWrap>
	);
};
export default Home;

const HomeWrap = styled.div`
	@media (max-width: 470px) {
		width: 100%;
		padding: 60px 15px 0 15px;
	}
	padding-top: 60px;
	width: 470px;
	margin: 0 auto;
	text-align: center;

	h1 {
		font-size: 50px;
		margin-bottom: 42px;
	}

	.Home__place {
		margin-bottom: 24px;
		font-size: 28px;
	}

	.Home__editor {
		display: flex;
	}

	.Home__editor input {
		height: 45px;
		font-size: 20px;
		flex: 1;
		padding-left: 10px;
		margin-bottom: 24px;
	}

	.Home__editor button {
		width: 64px;
		height: 45px;
		font-size: 18px;
	}

	.Home__action {
		margin-bottom: 24px;
		display: flex;
		flex-direction: row-reverse;
	}
	.Home__action-right {
		display: flex;
		align-items: center;
	}
	.Home__action-time {
		font-size: 20px;
		margin-right: 18px;
	}
	.Home__action button {
		font-size: 18px;
		width: 60px;
		height: 40px;
		border: 1px solid rgba(118, 118, 118, 0.3);
	}
	.Home__action-history p {
		margin-bottom: 10px;
	}
`;
