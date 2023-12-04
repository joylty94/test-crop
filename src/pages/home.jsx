import React, { useState, useEffect, useRef, forwardRef } from 'react';
import styled from 'styled-components';

const PROBLEM = [
	'업무지시는 명확하게, 회의는 간결하게, 질문은 자유롭게 해요.',
	'어려운 일 있어요? 말 한마디가 우리문화를 바꿔요.',
	'교육은 서로를 든든한 업무파트너로 만드는 지름길, 적극 권장해요.',
	'보고 또 봐도 그 보고예요.',
	'근무는 유연하게, 업무는 확실하게 해내요.',
	"쏘지 마세요. 같은 편이에요. 우리의 조직은 팀이 아니라 '현대제철' 이에요.",
	'문제 발생시 네 탓 보단 문제인식과 대안마련으로 함께 해결해요.',
	'안전만큼은 참견과 참여가 항상 참이에요.',
	'솔선수범, 우리 모두의 역할이에요.',
	'과거 해오던 방식은 참고만 하세요. 새로운 접근은 변화의 시작이에요.',
];

const TPROBLEM = [
	/^(?:[ㅇ어업])?(?:[ㅁ무])?(?:[ㅈ지])?(?:[ㅅ시])?(?:[ㄴ느는])?(?:\s)?(?:[ㅁ며명])?(?:[ㅎ호화확])?(?:[ㅎ하])?(?:[ㄱ게])?(?:[,])?(?:\s)?(?:[ㅎ호회])?(?:[ㅇ으의])?(?:[ㄴ느는])?(?:\s)?(?:[ㄱ가간])?(?:[ㄱ겨결])?(?:[ㅎ하])?(?:[ㄱ게])?(?:[,])?(?:\s)?(?:[ㅈ지질])?(?:[ㅁ무문])?(?:[ㅇ으은])?(?:\s)?(?:[ㅈ자])?(?:[ㅇ유])?(?:[ㄹ로롭])?(?:[ㄱ게])?(?:\s)?(?:[ㅎ해])?(?:[ㅇ요])?(?:[.])?$/,

	/^(?:[ㅇ어])?(?:[ㄹ려])?(?:[ㅇ우운])?(?:\s)?(?:[ㅇ이일])?(?:\s)?(?:[ㅇ이있])?(?:[ㅇ어])?(?:[ㅇ요])?(?:[?])?(?:\s)?(?:[ㅁ마말])?(?:\s)?(?:[ㅎ하한])?(?:[ㅁ마])?(?:[ㄷ디])?(?:[ㄱ가])?(?:\s)?(?:[ㅇ우])?(?:[ㄹ리])?(?:[ㅁ무문])?(?:[ㅎ호화])?(?:[ㄹ르를])?(?:\s)?(?:[ㅂ바])?(?:[ㄲ꾸꿔])?(?:[ㅇ요])?(?:[.])?$/,

	/^(?:[ㄱ교])?(?:[ㅇ유육])?(?:[ㅇ으은])?(?:\s)?(?:[ㅅ서])?(?:[ㄹ로])?(?:[ㄹ르를])?(?:\s)?(?:[ㄷ드든])?(?:[ㄷ드든])?(?:[ㅎ하한])?(?:\s)?(?:[ㅇ어업])?(?:[ㅁ무])?(?:[ㅍ파])?(?:[ㅌ트])?(?:[ㄴ너])?(?:[ㄹ로])?(?:\s)?(?:[ㅁ마만])?(?:[ㄷ드])?(?:[ㄴ느는])?(?:\s)?(?:[ㅈ지])?(?:[ㄹ르름])?(?:[ㄱ기길])?(?:[,])?(?:\s)?(?:[ㅈ저적])?(?:[ㄱ그극])?(?:\s)?(?:[ㄱ구궈권])?(?:[ㅈ자장])?(?:[ㅎ해])?(?:[ㅇ요])?(?:[.])?$/,

	/^(?:[ㅂ보])?(?:[ㄱ고])?(?:\s)?(?:[ㄸ또])?(?:\s)?(?:[ㅂ보봐])?(?:[ㄷ도])?(?:\s)?(?:[ㄱ그])?(?:\s)?(?:[ㅂ보])?(?:[ㄱ고])?(?:[ㅇ예])?(?:[ㅇ요])?(?:[.])?$/,

	/^(?:[ㄱ그근])?(?:[ㅁ무])?(?:[ㄴ느는])?(?:\s)?(?:[ㅇ유])?(?:[ㅇ여연])?(?:[ㅎ하])?(?:[ㄱ게])?(?:[,])?(?:\s)?(?:[ㅇ어업])?(?:[ㅁ무])?(?:[ㄴ느는])?(?:\s)?(?:[ㅎ호화확])?(?:[ㅅ시실])?(?:[ㅎ하])?(?:[ㄱ게])?(?:\s)?(?:[ㅎ해])?(?:[ㄴ내])?(?:[ㅇ요])?(?:[.])?$/,

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
	const [totalTime, setTotalTime] = useState(0);
	const [text, setText] = useState('');
	const [textError, setTextError] = useState(false);

	const timer = useRef();

	const [problemIndex, setProblemIndex] = useState(0);
	const [problemHistory, setProblemHistory] = useState([]);

	const decomposeHangul = (char) => {
		const baseCode = char.charCodeAt(0) - 0xac00;
		const jongseongBase = 28;
		const jungseongBase = 21;

		const jongseong = baseCode % jongseongBase;
		const jungseong = ((baseCode - jongseong) / jongseongBase) % jungseongBase;
		const choseong =
			((baseCode - jongseong) / jongseongBase - jungseong) / jungseongBase;

		return [choseong, jungseong, jongseong];
	};

	const compareHangul = (char1, char2) => {
		console.log(char1, char2);
		const [choseong1, jungseong1, jongseong1] = decomposeHangul(char1);
		const [choseong2, jungseong2, jongseong2] = decomposeHangul(char2);
		console.log(choseong1, jungseong1, jongseong1);
		console.log(choseong2, jungseong2, jongseong2);

		// if (choseong1 && choseong2) {
		// 	return choseong1 !== choseong2;
		// }
		if (choseong1 === -53) {
			return false;
		}
		if (jongseong1 && (jongseong2 || jongseong2 === 0)) {
			console.log(jongseong1, jongseong2);
			return jongseong1 !== jongseong2;
		}
		if ((jungseong1 || jungseong1 === 0) && (jungseong2 || jungseong2 === 0)) {
			return jungseong1 !== jungseong2;
		}
	};

	const onClickAction = () => {
		setAction((prev) => {
			if (!prev) {
				setProblemHistory([]);
			}
			// return !prev;
			return true;
		});
	};

	const onChangeText = (e) => {
		// console.log(e.nativeEvent);
		const value = e.target.value;
		// console.log(
		// 	'value !== PROBLEM[problemIndex].slice(0, value.length)',
		// 	value !== PROBLEM[problemIndex].slice(0, value.length)
		// );

		setTextError(!TPROBLEM[problemIndex].test(value));

		setText(value);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			if (PROBLEM[problemIndex] === text) {
				// @ts-ignore
				setProblemHistory((prev) => [
					...prev,
					{ content: `${text} - ${time}초 성공`, time },
				]);
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
			setProblemHistory((prev) => [
				...prev,
				{ content: `${text} - ${time}초 성공`, time },
			]);
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

	const timeFormat = (seconds) => {
		let hours = Math.floor(seconds / 3600);
		let minutes = Math.floor((seconds % 3600) / 60);
		let remainingSeconds = seconds % 60;

		let hoursFormatted = hours.toString().padStart(2, '0');
		let minutesFormatted = minutes.toString().padStart(2, '0');
		let secondsFormatted = remainingSeconds.toString().padStart(2, '0');

		return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
	};

	useEffect(() => {
		const editor = document.getElementById('editor');
		if (!action) {
			if (timer?.current) clearInterval(timer?.current);
			setTime(0);
			setTotalTime(0);
			setProblemIndex(0);
		} else {
			timer.current = setInterval(() => {
				setTime((prev) => prev + 1);
				setTotalTime((prev) => prev + 1);
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
			<div className='Home_title'>
				<img alt='제철 레시피' src='/title.png' />
			</div>
			<div>
				<div>
					<div className='Home__place'>
						{!action ? (
							<button
								onClick={onClickAction}
								className='Home__place-action custom-btn btn-2'
							>
								Start!
							</button>
						) : (
							<p>{PROBLEM[problemIndex]}</p>
						)}
					</div>

					<div className={textError ? 'Home__editor error' : 'Home__editor'}>
						<input
							id='editor'
							disabled={!action}
							value={text}
							onChange={onChangeText}
							onKeyPress={handleKeyPress}
							placeholder='준비하시고~'
							autoComplete='off'
						/>
						<button onClick={onClickKeyPress}>입력</button>
					</div>
					{textError && (
						<div className='Home__text-error'>
							<div>오. 타. 발. 생.</div>
							<p>내용을 다시 살펴 보세요!</p>
						</div>
					)}
				</div>

				<div className='Home__action'>
					<div className='Home__action-left'>
						<div className='Home__action-time'>{timeFormat(totalTime)}</div>
						<button>Total</button>
					</div>
					<div className='Home__action-right'>
						<div className='Home__action-time'>{timeFormat(time)}</div>
						{/* <button onClick={onClickAction}>{!action ? '시작' : '종료'}</button> */}
						<button>Lap</button>
					</div>
				</div>

				<div className='Home__action-history'>
					{problemHistory.length > 0 &&
						problemHistory.map((p, i) => <p key={'문제' + i}>{p.content}</p>)}
				</div>
			</div>

			<img className='Homg__back' alt='백그라운드' src='/bg.png' />
		</HomeWrap>
	);
};
export default Home;

const HomeWrap = styled.div`
	@media (max-width: 470px) {
		width: 100%;
		padding: 60px 15px 0 15px;
	}
	/* padding-top: 60px; */
	width: 540px;
	min-height: 100vh;
	margin: 0 auto;
	text-align: center;
	position: relative;

	.Home_title {
		width: 540px;
		height: 200px;
		position: relative;
		overflow: hidden;
		margin-bottom: 8px;
		> img {
			position: absolute;
			top: -140px;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.Home__place {
		margin-bottom: 24px;
		height: 73px;
	}
	.Home__place > p {
		font-size: 28px;
		line-height: 1.3;
		-webkit-touch-callout: none;
		user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		-webkit-user-select: none;
	}

	.Home__place .Home__place-action {
		cursor: pointer;
		font-size: 18px;
		line-height: 1.3;
	}

	.Home__editor {
		display: flex;

		&.error input {
			border: 1px solid #c10015;
		}
		&.error button {
			border: 1px solid #c10015;
		}
	}

	.Home__editor input {
		height: 45px;
		font-size: 20px;
		flex: 1;
		padding-left: 10px;
		padding-right: 6px;
		margin-bottom: 24px;
		border: 1px solid rgba(118, 118, 118, 0.3);
	}

	.Home__editor button {
		width: 64px;
		height: 45px;
		font-size: 18px;
		border: 1px solid rgba(118, 118, 118, 0.3);
	}

	.Home__action {
		position: relative;
		margin-bottom: 24px;
		display: flex;
		z-index: 100;
		gap: 40px;
	}
	.Home__action-left {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.Home__action-right {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.Home__action-time {
		font-family: 'Pretendard', sans-serif !important;
		font-weight: 900;
		font-size: 44px;
	}
	.Home__action button {
		font-size: 18px;
		width: 60px;
		height: 40px;
		border: 1px solid rgba(118, 118, 118, 0.3);
		margin-left: 10px;
		background-color: #093d8b;
		color: #fff;
		border: 1px solid #162e61;
	}
	.Home__action-history p {
		margin-bottom: 10px;
	}

	.Homg__back {
		position: absolute;
		bottom: 170px;
		right: -400px;
		z-index: 0;
	}
	img {
		-webkit-user-drag: none;
	}

	.Home__text-error {
		color: #fdda40;
		margin-bottom: 24px;
		font-size: 28px;
	}

	.custom-btn {
		width: 130px;
		height: 40px;
		color: #fff;
		/* border-radius: 5px; */
		padding: 10px 25px;
		font-family: 'Lato', sans-serif;
		font-weight: 500;
		background: transparent;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		display: inline-block;
		box-shadow:
			inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
			7px 7px 20px 0px rgba(0, 0, 0, 0.1),
			4px 4px 5px 0px rgba(0, 0, 0, 0.1);
		outline: none;
	}

	/* 2 */
	.btn-2 {
		/* background: rgb(96, 9, 240); */
		background: #093d8b;
		/* background: linear-gradient(
			0deg,
			rgba(96, 9, 240, 1) 0%,
			rgba(129, 5, 240, 1) 100%
		); */
		/* background: linear-gradient(0deg, #093d8b 0%, rgba(96, 9, 240, 1) 100%); */
		border: none;
	}
	.btn-2:before {
		height: 0%;
		width: 2px;
	}
	.btn-2:hover {
		box-shadow:
			4px 4px 6px 0 rgba(255, 255, 255, 0.5),
			-4px -4px 6px 0 rgba(116, 125, 136, 0.5),
			inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
			inset 4px 4px 6px 0 rgba(0, 0, 0, 0.4);
	}
`;
