import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const ModuleContainer = styled.div`
	width: 100vw;
	max-width: 720px;
	padding: 24px;
	margin: auto;
`;

export const ErrorMessage = styled.div`
	display: flex;
	width: 100%;
	color: #FF5350;
	text-align: center;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-around;
	& button {
		width: 100%;
		margin: 16px;
	}
`;

export const AuthDivider = styled.div`
	height: 2px;
	width: 100%;
	background: #dddddd;
`;

export const LogoContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	text-transform: uppercase;
	font-family: 'Expletus Sans';
	margin-bottom: 4em;
	margin-top: 8em;
`;

export const Title = styled.h1`
	font-size: 3.2em;
	letter-spacing: 4px;
	display: flex;

	img {
		height: 1em;
		margin: 4px;
	}
`;

export const Subtitle = styled.h2`
	letter-spacing: 2px;
`;
