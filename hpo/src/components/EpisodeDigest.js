import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const DigestWrapper = styled(Link)`
	border: 1px solid black;
	width: 20%;
	margin: 15px;
    min-width: 250px;
    padding: 15px;
    text-decoration: none;
    color: black;
    background: white;
    border-radius: 20px 0px 20px 0px;
    border-left: 4px solid black;
    border-bottom: 4px solid black;
`;



class EpisodeDigest extends Component {
	constructor(props) {
		super(props);
		this.state = {filter: ''};
	}
	render() {
		//console.log(this.props.episode)
		return (
			<DigestWrapper to='/'>
				<h2>{this.props.episode.title}</h2>
				<div>{this.props.episode.pubDate}</div>
				<div>{this.props.episode['itunes:title']}</div>
				{this.props.episode.hasOwnProperty('itunes:summary') ? (
					<div>
						...
						{this.props.episode['itunes:summary'].slice(123, 210)}
						...
					</div>
				) : (
					<div>
						...
						{this.props.episode['itunes:subtitle']['#cdata'].slice(
							123,
							210
						)}
						...
					</div>
				)}
			</DigestWrapper>
		);
	}
}

export default EpisodeDigest;
