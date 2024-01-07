import React from 'react';
import styled from 'styled-components';

const Loader = ({ loading }) => {
	if (loading) {
		return (
			<LoaderWrap>
				<span class='loader'></span>
			</LoaderWrap>
		);
	}
	return <></>;
};

export default Loader;

const LoaderWrap = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 1000;
	> .loader {
		width: 48px;
		height: 48px;
		border: 5px solid #fff;
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}
	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
