import React, {Component} from 'react';
import {FullDiv, InfoPlate, Title, Text} from './Contact';

class About extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<FullDiv
				onClick={ev => {
					this.props.toggleModel(ev, 'aboutModal');
				}}>
				<InfoPlate
					onClick={ev => {
						this.props.toggleModel(ev, 'oops!!');
					}}>
					<Title>hello from About</Title>
					<Text>Text</Text>
				</InfoPlate>
			</FullDiv>
		);
	}
}

export default About;
