import React, { useState, useEffect, useRef, forwardRef } from 'react';
import styled from 'styled-components';

const PROBLEM = [
	'업무지시는 명확하게. 회의는 간결하게. 질문은 자유롭게 해요.',
	'어려운 일 있어요? 말 한마디가 우리문화를 바꿔요.',
	'교육은 서로를 든든한 업무파트너로 만드는 지름길, 적극 권장해요.',
	'보고 또 봐도 그 보고에요.',
	'근무는 유연하게, 업무는 확실하게 해내요.',
	"쏘지 마세요. 같은 편이에요. 우리의 조직은 팀이 아니라 '현대제철' 이에요.",
	'문제 발생시 네 탓 보단 문제인식과 대안마련으로 함께 해결해요.',
	'안전만큼은 참견과 참여가 항상 참이에요.',
	'솔선수범, 우리 모두의 역할이에요.',
	'과거 해오던 방식은 참고만 하세요. 새로운 접근은 변화의 시작이에요.',
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

	const onClickKeyPress = (e) => {
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
			<div>
				<span>현대제철이 제철이네!</span>
				<h1>제철 레시피</h1>
				{/* <img alt="제철 레시피" src="/title.jpeg"> */}
			</div>
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
						<button onClick={onClickKeyPress}>입력</button>
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
		-webkit-touch-callout: none;
		user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		-webkit-user-select: none;
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
		border: 1px solid rgba(118, 118, 118, 0.3);
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
