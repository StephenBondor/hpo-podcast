import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const DigestWrapper = styled(Link)`
	border: none;
	width: 20%;
	margin: 15px;
	min-width: 250px;
	padding: 15px;
	text-decoration: none;
	color: black;
	background: white;
	box-shadow: 0px 1px 2px 0px #ccc;
	transition: all 0.2s ease-in-out;
	:hover {
		transform: scale(1.01);
	}
`;

const Title = styled.h2`
	border-bottom: 1px solid lightgrey;
	padding-bottom: 5px;
	text-align: center;
	color: #000033;
`;

const Date = styled.div`
	font-style: italic;
	font-size: 1.2rem;
	color: grey;
`;

class EpisodeDigest extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<DigestWrapper to={`/episode/${this.props.episode.guid['#cdata']}`}>
				<Title>{this.props.episode.title}</Title>
				<Date>{this.props.episode.pubDate}</Date>

				{this.props.episode.hasOwnProperty('itunes:summary') ? (
					<div>
						...
						{this.props.episode['itunes:summary'].slice(123, 250)}
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
