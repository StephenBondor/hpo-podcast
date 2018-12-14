import React, {Component} from 'react';
import {FullDiv, InfoPlate, Title} from './Contact';

class About extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log(this.props.jsonState)
		return (
			<FullDiv
				onClick={ev => {
					this.props.toggleModel(ev, 'aboutModal');
				}}>
				<InfoPlate
					onClick={ev => {
						this.props.toggleModel(ev, 'oops!!');
					}}>
					<Title>About {this.props.jsonState.channel.title}</Title>
					<div>{this.props.jsonState.channel.description["#cdata"]}</div>
				</InfoPlate>
			</FullDiv>
		);
	}
}

export default About;
