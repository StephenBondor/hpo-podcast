import React, {Component} from 'react';
import styled from 'styled-components';

export const FullDiv = styled.div`
	position: absolute;
	top: 0%;
	bottom: 0%;
	left: 0%;
	right: 0%;
	width: 100%;
	height: 100vh;
`;

export const InfoPlate = styled.div`
	border: none;
	width: 40%;
	margin: 15px;
	min-width: 250px;
	padding: 15px;
	text-decoration: none;
	color: black;
	background: white;
	box-shadow: 0px 1px 2px 0px #ccc;
	transition: all 0.3s ease-in-out;
	position: relative;
	z-index: 20;
	left: 30%;
	right: 30%;
	top: 10%;
`;

export const Title = styled.h2`
	border-bottom: 1px solid lightgrey;
	padding-bottom: 5px;
	text-align: center;
`;

export const Text = styled.div`
	font-style: italic;
	font-size: 1.2rem;
	color: grey;
`;

class Contact extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<FullDiv
				onClick={ev => {
					this.props.toggleModel(ev, 'contactModal');
				}}>
				<InfoPlate
					onClick={ev => {
						this.props.toggleModel(ev, 'oops!!');
					}}>
					<Title>hello from contacts</Title>
					<Text>Text</Text>
				</InfoPlate>
			</FullDiv>
		);
	}
}

export default Contact;
