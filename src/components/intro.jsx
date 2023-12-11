import React from 'react';
import styled from 'styled-components';

const Intro = ({ user, setUser, setMode }) => {
	const isBrowserDarkMode =
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches;
	let initTheme = isBrowserDarkMode ? 'dark' : 'light';

	const onClickIntro = () => {
		if (!user.id || !user.name) {
			return alert('이름 또는 사번을 입력해주세요.');
		}
		setMode(true);
	};

	const onChangeText = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	return (
		// @ts-ignore
		<IntroWrap theme={initTheme}>
			<div className='Intro__title'>
				<img alt='제철 레시피' src='/title.png' />
			</div>

			<div className='Intro__intro-v1'>
				<p>현대제철에서 맛깔나고</p>
				<p>재미있게 일하는 열가지 방식!</p>
				<p>제철레시피!</p>
				<p>재미있는 이벤트와 함께,</p>
				<p>다시한번 의미를 새겨볼까요?</p>
			</div>

			<ul className='Intro__intro-v2'>
				<li>빠른 타자는 이번게임의 필수조건!</li>
				<li>아래 이름과 사번 작성 후 입장!</li>
				<li>오타, 띄어쓰기까지 확실하게 써야 해요!</li>
				<li>도전 횟수는 무제한 !!</li>
				<li>완료후에는 "다운로드"를 통해 기록을 저장하여 이벤트 응모!!</li>
			</ul>

			<div className='Intro__edit'>
				<div>
					<input
						name='name'
						value={user.name}
						onChange={onChangeText}
						placeholder='이름을 입력하세요.'
					/>
					<input
						name='id'
						value={user.id}
						onChange={onChangeText}
						placeholder='사번을 입력하세요.'
					/>
				</div>
				<button onClick={onClickIntro}>입력</button>
			</div>

			<img className='Intro__back' alt='백그라운드' src='/bg.png' />
		</IntroWrap>
	);
};
export default Intro;

const IntroWrap = styled.div`
	@media (max-width: 470px) {
		width: 100%;
		padding: 60px 15px 0 15px;
	}
	padding: 0 30px;
	width: 600px;
	min-height: 100vh;
	margin: 0 auto;
	text-align: center;
	position: relative;

	.Intro__title {
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

	.Intro__intro-v1,
	.Intro__intro-v2 {
		margin-bottom: 30px;
		> p {
			line-height: 1.4;
		}
		> li {
			line-height: 1.4;
		}
	}
	.Intro__intro-v1 {
		font-size: 18px;
	}
	.Intro__intro-v2 {
		width: 340px;
		list-style: decimal;
		text-align: left;
		margin-left: 130px;
	}

	.Intro__edit > div {
		display: flex;
		gap: 24px;
		margin-bottom: 30px;
	}

	.Intro__edit input {
		height: 45px;
		font-size: 20px;
		flex: 1;
		padding-left: 10px;
		padding-right: 6px;
		border: 1px solid rgba(118, 118, 118, 0.3);
	}

	.Intro__edit button {
		font-size: 18px;
		width: 240px;
		height: 45px;
		border: 1px solid rgba(118, 118, 118, 0.3);
		margin-left: 10px;
		background-color: #093d8b;
		color: #fff;
		border: 1px solid #162e61;
	}

	.Intro__back {
		position: absolute;
		bottom: 170px;
		right: -400px;
		z-index: 0;
	}
	img {
		-webkit-user-drag: none;
	}
`;
