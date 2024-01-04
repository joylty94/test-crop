import React, { useState, useEffect, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import Modal from 'react-modal';
import { getGoogleSheet } from '../libs/googlesheet.js';

const PROBLEM = [
	'업무지시는 명확하게, 회의는 간결하게, 질문은 자유롭게 해요.',
	// '어려운 일 있어요? 말 한마디가 우리문화를 바꿔요.',
	// '교육은 서로를 든든한 업무파트너로 만드는 지름길, 적극 권장해요.',
	// '보고 또 봐도 그 보고예요.',
	// '근무는 유연하게, 업무는 확실하게 해내요.',
	// "쏘지 마세요. 같은 편이에요. 우리의 조직은 팀이 아니라 '현대제철' 이에요.",
	// '문제 발생시 네 탓 보단 문제인식과 대안마련으로 함께 해결해요.',
	// '안전만큼은 참견과 참여가 항상 참이에요.',
	// '솔선수범, 우리 모두의 역할이에요.',
	// '과거 해오던 방식은 참고만 하세요. 새로운 접근은 변화의 시작이에요.',
];

const TPROBLEM = [
	/^(?:[ㅇ어업])?(?:[ㅁ무])?(?:[ㅈ지])?(?:[ㅅ시])?(?:[ㄴ느는])?(?:[\s])?(?:[ㅁ며명])?(?:[ㅎ호화확])?(?:[ㅎ하])?(?:[ㄱ게])?(?:[,])?(?:[\s])?(?:[ㅎ호회])?(?:[ㅇ으의])?(?:[ㄴ느는])?(?:[\s])?(?:[ㄱ가간])?(?:[ㄱ겨결])?(?:[ㅎ하])?(?:[ㄱ게])?(?:[,])?(?:[\s])?(?:[ㅈ지질])?(?:[ㅁ무문])?(?:[ㅇ으은])?(?:[\s])?(?:[ㅈ자])?(?:[ㅇ유])?(?:[ㄹ로롭])?(?:[ㄱ게])?(?:[\s])?(?:[ㅎ해])?(?:[ㅇ요])?(?:[.])?$/,

	/^(?:[ㅇ어])?(?:[ㄹ려])?(?:[ㅇ우운])?(?:[\s])?(?:[ㅇ이일])?(?:[\s])?(?:[ㅇ이있])?(?:[ㅇ어])?(?:[ㅇ요])?(?:[?])?(?:[\s])?(?:[ㅁ마말])?(?:[\s])?(?:[ㅎ하한])?(?:[ㅁ마])?(?:[ㄷ디])?(?:[ㄱ가])?(?:[\s])?(?:[ㅇ우])?(?:[ㄹ리])?(?:[ㅁ무문])?(?:[ㅎ호화])?(?:[ㄹ르를])?(?:[\s])?(?:[ㅂ바])?(?:[ㄲ꾸꿔])?(?:[ㅇ요])?(?:[.])?$/,

	/^(?:[ㄱ교])?(?:[ㅇ유육])?(?:[ㅇ으은])?(?:[\s])?(?:[ㅅ서])?(?:[ㄹ로])?(?:[ㄹ르를])?(?:[\s])?(?:[ㄷ드든])?(?:[ㄷ드든])?(?:[ㅎ하한])?(?:[\s])?(?:[ㅇ어업])?(?:[ㅁ무])?(?:[ㅍ파])?(?:[ㅌ트])?(?:[ㄴ너])?(?:[ㄹ로])?(?:[\s])?(?:[ㅁ마만])?(?:[ㄷ드])?(?:[ㄴ느는])?(?:[\s])?(?:[ㅈ지])?(?:[ㄹ르름])?(?:[ㄱ기길])?(?:[,])?(?:[\s])?(?:[ㅈ저적])?(?:[ㄱ그극])?(?:[\s])?(?:[ㄱ구궈권])?(?:[ㅈ자장])?(?:[ㅎ해])?(?:[ㅇ요])?(?:[.])?$/,

	/^(?:[ㅂ보])?(?:[ㄱ고])?(?:[\s])?(?:[ㄸ또])?(?:[\s])?(?:[ㅂ보봐])?(?:[ㄷ도])?(?:[\s])?(?:[ㄱ그])?(?:[\s])?(?:[ㅂ보])?(?:[ㄱ고])?(?:[ㅇ예])?(?:[ㅇ요])?(?:[.])?$/,

	/^(?:[ㄱ그근])?(?:[ㅁ무])?(?:[ㄴ느는])?(?:[\s])?(?:[ㅇ유])?(?:[ㅇ여연])?(?:[ㅎ하])?(?:[ㄱ게])?(?:[,])?(?:[\s])?(?:[ㅇ어업])?(?:[ㅁ무])?(?:[ㄴ느는])?(?:[\s])?(?:[ㅎ호화확])?(?:[ㅅ시실])?(?:[ㅎ하])?(?:[ㄱ게])?(?:[\s])?(?:[ㅎ해])?(?:[ㄴ내])?(?:[ㅇ요])?(?:[.])?$/,

	/^(?:[ㅆ쏘])?(?:[ㅈ지])?(?:[\s])?(?:[ㅁ마])?(?:[ㅅ세])?(?:[ㅇ요])?(?:[.])?(?:[\s])?(?:[ㄱ가같])?(?:[ㅇ으은])?(?:[\s])?(?:[ㅍ펴편])?(?:[ㅇ이])?(?:[ㅇ에])?(?:[ㅇ요])?(?:[.])?(?:[\s])?(?:[ㅇ우])?(?:[ㄹ리])?(?:[ㅇ으의])?(?:[\s])?(?:[ㅈ조])?(?:[ㅈ지직])?(?:[ㅇ으은])?(?:[\s])?(?:[ㅌ티팀])?(?:[ㅇ이])?(?:[\s])?(?:[ㅇ아])?(?:[ㄴ니])?(?:[ㄹ라])?(?:[\s])?(?:['])?(?:[ㅎ혀현])?(?:[ㄷ대])?(?:[ㅈ제])?(?:[ㅊ처철])?(?:['])?(?:[\s])?(?:[ㅇ이])?(?:[ㅇ에])?(?:[ㅇ요])?(?:[.])?$/,

	/^(?:[ㅁ무문])?(?:[ㅈ제])?(?:[\s])?(?:[ㅂ바발])?(?:[ㅅ새생])?(?:[ㅅ시])?(?:[\s])?(?:[ㄴ네])?(?:[\s])?(?:[ㅌ타탓])?(?:[\s])?(?:[ㅂ보])?(?:[ㄷ다단])?(?:[\s])?(?:[ㅁ무문])?(?:[ㅈ제])?(?:[ㅇ이인])?(?:[ㅅ시식])?(?:[ㄱ고과])?(?:[\s])?(?:[ㄷ대])?(?:[ㅇ아안])?(?:[ㅁ마])?(?:[ㄹ려련])?(?:[ㅇ으])?(?:[ㄹ로])?(?:[\s])?(?:[ㅎ하함])?(?:[ㄲ께])?(?:[\s])?(?:[ㅎ해])?(?:[ㄱ겨결])?(?:[ㅎ해])?(?:[ㅇ요])?(?:[.])?$/,

	/^(?:[ㅇ아안])?(?:[ㅈ저전])?(?:[ㅁ마만])?(?:[ㅋ크큼])?(?:[ㅇ으은])?(?:[\s])?(?:[ㅊ차참])?(?:[ㄱ겨견])?(?:[ㄱ고과])?(?:[\s])?(?:[ㅊ차참])?(?:[ㅇ여])?(?:[ㄱ가])?(?:[\s])?(?:[ㅎ하항])?(?:[ㅅ사상])?(?:[\s])?(?:[ㅊ차참])?(?:[ㅇ이])?(?:[ㅇ에])?(?:[ㅇ요])?(?:[.])?$/,

	/^(?:[ㅅ소솔])?(?:[ㅅ서선])?(?:[ㅅ수])?(?:[ㅂ버범])?(?:[,])?(?:[\s])?(?:[ㅇ우])?(?:[ㄹ리])?(?:[\s])?(?:[ㅁ모])?(?:[ㄷ두])?(?:[ㅇ으의])?(?:[\s])?(?:[ㅇ여역])?(?:[ㅎ하할])?(?:[ㅇ이])?(?:[ㅇ에])?(?:[ㅇ요])?(?:[.])?$/,

	/^(?:[ㄱ고과])?(?:[ㄱ거])?(?:[\s])?(?:[ㅎ해])?(?:[ㅇ오])?(?:[ㄷ더던])?(?:[\s])?(?:[ㅂ바방])?(?:[ㅅ시식])?(?:[ㅇ으은])?(?:[\s])?(?:[ㅊ차참])?(?:[ㄱ고])?(?:[ㅁ마만])?(?:[\s])?(?:[ㅎ하항])?(?:[ㅅ세])?(?:[ㅇ요])?(?:[.])?(?:[\s])?(?:[ㅅ새])?(?:[ㄹ로])?(?:[ㅇ우운])?(?:[\s])?(?:[ㅈ저접])?(?:[ㄱ그근])?(?:[ㅇ으은])?(?:[\s])?(?:[ㅂ벼변])?(?:[ㅎ호화])?(?:[ㅇ으의])?(?:[\s])?(?:[ㅅ시])?(?:[ㅈ자작])?(?:[ㅇ이])?(?:[ㅇ에])?(?:[ㅇ요])?(?:[.])?$/,
];

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const Home = ({ user }) => {
	const isBrowserDarkMode =
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches;
	let initTheme = isBrowserDarkMode ? 'dark' : 'light';

	const [action, setAction] = useState(false); // start, end
	const [time, setTime] = useState(0);
	const [totalTime, setTotalTime] = useState(0);
	const [text, setText] = useState('');
	const [textError, setTextError] = useState(false);
	const [complete, setComplete] = useState(false);
	const [completeSheet, setCompleteSheet] = useState(false);

	const timer = useRef();

	const [problemIndex, setProblemIndex] = useState(0);
	const [problemHistory, setProblemHistory] = useState([]);

	useEffect(() => {
		if (!complete) setCompleteSheet(false);
	}, [complete]);

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
		const value = e.target.value;
		setText(value);

		if (!TPROBLEM[problemIndex].test(value)) {
			setTextError(true);
		} else {
			const fi = value
				?.slice(0, value.length - 1)
				?.split('')
				?.find((v, i) => v !== PROBLEM[problemIndex][i]);
			fi ? setTextError(true) : setTextError(false);
		}
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
					setComplete(true);
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
				setComplete(true);
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
			setProblemIndex(0);
		} else {
			setTime(0);
			setTotalTime(0);
			setComplete(false);
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

	useEffect(() => {
		const handlePaste = (event) => {
			event.preventDefault();
		};
		window.addEventListener('paste', handlePaste);
		return () => {
			window.removeEventListener('paste', handlePaste);
		};
	});

	const onClickComplete2 = () => {
		const target = document.getElementById('target');
		const place = document.getElementById('place');
		const action = document.getElementById('action');
		const certification = document.getElementById('certification');
		const button = document.getElementById('button');
		const icon = document.getElementById('icon');

		place?.classList.toggle('delete');
		action?.classList.toggle('delete');
		certification?.classList.toggle('delete');
		icon?.classList.toggle('delete');
		button?.classList.toggle('delete');
		html2canvas(target).then((canvas) => {
			const img = canvas.toDataURL();
			place?.classList.toggle('delete');
			action?.classList.toggle('delete');
			certification?.classList.toggle('delete');
			icon?.classList.toggle('delete');
			button?.classList.toggle('delete');
			var link = document.createElement('a');
			// link.download = name;
			link.setAttribute('download', `제철레시피-${user.name}`);
			link.href = img;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		});
	};

	const setGoogleSheet = async ({ name, id, totalTime }) => {
		const googleSheet = await getGoogleSheet();
		const sheetsByIdElement = googleSheet.sheetsById[1881161720];
		const result = await sheetsByIdElement.addRow({
			name,
			id,
			totalTime,
		});

		if (result) {
			setCompleteSheet(true);
			alert('제철 레시피 등록 완료!');
		}
	};

	const onClickComplete = async () => {
		if (!completeSheet) await setGoogleSheet({ ...user, totalTime });
	};

	return (
		// @ts-ignore
		<HomeWrap theme={initTheme}>
			<div id='target'>
				<div className='Home_title'>
					<img alt='제철 레시피' src='/title.png' />
				</div>
				<div className='Home__user'>
					<div>{user.name}</div>
					<div>
						[ <span>{user.id}</span> ]
					</div>
				</div>

				<div>
					<div id='place'>
						<div className='Home__place'>
							{action && <p>{PROBLEM[problemIndex]}</p>}
						</div>

						<div className={textError ? 'Home__editor error' : 'Home__editor'}>
							<input
								id='editor'
								disabled={!action}
								value={text}
								onChange={onChangeText}
								onKeyPress={handleKeyPress}
								placeholder={
									!action ? '준비하시고~' : '제철 레시피를 입력해주세요.'
								}
								autoComplete='off'
							/>
							<button onClick={onClickKeyPress}>입력</button>
						</div>
						{textError && (
							<div className='Home__text-error'>
								<div>오. 타. 발. 생.</div>
								<p>내용을 다시 살펴 보세요!</p>
								<p>😂😂😂</p>
							</div>
						)}
					</div>

					<div id='action' className='Home__action'>
						<div className='Home__action-left'>
							<button>Total</button>
							<div className='Home__action-time'>{timeFormat(totalTime)}</div>
						</div>
						<div className='Home__action-right'>
							<button>Lap</button>
							<div className='Home__action-time'>{timeFormat(time)}</div>
							{/* <button onClick={onClickAction}>{!action ? '시작' : '종료'}</button> */}
						</div>
					</div>

					<div className='Home__action-history'>
						{problemHistory.length > 0 &&
							problemHistory.map((p, i) => <p key={'문제' + i}>{p.content}</p>)}
					</div>
					{!action && (
						<>
							<div id='button' className={complete ? 'Home__complete' : ''}>
								{complete && (
									<button
										className='Home__complete-btn'
										onClick={onClickComplete}
									>
										완료
									</button>
								)}
								<button
									onClick={onClickAction}
									className='Home__place-action custom-btn btn-2'
								>
									{complete ? 'RESTART' : 'START'}
								</button>
							</div>
							<div id='certification' className='Home__total delete'>
								<div>Total</div>
								<div>{timeFormat(totalTime)}</div>
							</div>
						</>
					)}
				</div>
				<img id='icon' className='delete' src='/icon.png' />
			</div>

			<img className='Homg__back' alt='백그라운드' src='/bg.png' />
		</HomeWrap>
	);
};
export default Home;

const HomeWrap = styled.div`
	#target {
		position: relative;
	}
	.delete {
		display: none !important;
	}
	@media (max-width: 470px) {
		width: 100%;
		padding: 60px 15px 0 15px;
	}
	width: 600px;
	min-height: 100vh;
	margin: 0 auto;
	text-align: center;
	position: relative;

	#target {
		padding: 0 30px;
	}

	.Home_title {
		width: 600px;
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

	.Home__user {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 24px;
		gap: 10px;
	}

	.Home__user > div {
		text-align: left;
		font-size: 22px;
	}
	.Home__user > div > span {
		vertical-align: baseline;
		font-size: 20px;
	}

	.Home__place {
		margin-bottom: 24px;
		// height: 73px;
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
		margin-bottom: 26px;
		&.error input {
			border: 1px solid #ca0032;
		}
		&.error button {
			border: 1px solid #ca0032;
		}
	}

	.Home__editor input {
		height: 45px;
		font-size: 20px;
		flex: 1;
		padding-left: 10px;
		padding-right: 6px;
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
		margin-bottom: 35px;
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
		vertical-align: baseline;
	}
	.Home__action button {
		font-size: 18px;
		width: 60px;
		height: 40px;
		border: 1px solid rgba(118, 118, 118, 0.3);
		margin-right: 10px;
		background-color: #093d8b;
		color: #fff;
		border: 1px solid #162e61;
	}

	.Home__action-history {
		margin-bottom: 35px;
	}

	.Home__action-history p {
		line-height: 1.5;
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
		line-height: 1.2;
	}

	.custom-btn {
		width: 180px;
		height: 45px;
		font-size: 20px;
		color: #fff;
		padding: 12px 25px 10px;
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

	.Home__complete {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.Home__complete-btn {
		width: 180px;
		height: 45px;
		font-size: 20px;
		border: 2px solid #093d8b;
		color: #093d8b;
	}

	.Home__total {
		position: relative;
		div:nth-child(1) {
			color: #093d8b;
			font-weight: 500;
			font-size: 38px;
			font-weight: 900;
			margin-bottom: 6px;
		}
		div:nth-child(2) {
			font-weight: 900;
			font-size: 44px;
		}
	}
	#icon {
		position: absolute;
		right: 30px;
		bottom: 30px;
		width: 45px;
		height: 45px;
	}
`;
