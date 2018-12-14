import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setFilter, clearFilter, getPodcasts, forceRerender} from '../actions';
import {Loading} from '../App';
import styled from 'styled-components';
import {MainViewWrapper} from './ListView';
import {Date} from './EpisodeDigest';
import {Link} from 'react-router-dom';

const NavWrapper = styled(MainViewWrapper)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const NavLink = styled.a`
	text-decoration: none;
	color: black;
	font-size: 2rem;
	font-weight: bold;
	transition: all 0.2s ease-in-out;
	overflow: hidden;
	:hover {
		transform: scale(1.01);
		color: grey;
	}
`;

const EpisodeFullPlate = styled.div`
	border: none;
	width: 60%;
	margin: 15px;
	min-width: 250px;
	max-width: 650px;
	padding: 15px;
	text-decoration: none;
	color: black;
	background: white;
	box-shadow: 0px 1px 2px 0px #ccc;
	transition: all 0.2s ease-in-out;
	overflow: hidden;
	@media (max-width: 650px) {
		width: 80%;
	}
`;

const Title = styled.h2`
	border-bottom: 1px solid lightgrey;
	padding-bottom: 5px;
	text-align: center;
	color: #000033;
`;

const BodyText = styled.div`
	margin-right: 15px;
	a {
		color: black;
	}
`;

const Image = styled.img`
	min-width: 50px;
	max-height: 100px;
`;

const InfoWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px;
	@media (max-width: 500px) {
		flex-direction: column-reverse;
	}
`;

const AudioPlayer = styled.audio`
	width: 100%;
	background: white;
	padding: 0 10px;
	margin-top: 15px;
`;

const TagsWrapper = styled.div`
	margin: 0 15px;
	margin-bottom: 15px;
	button {
		border: 1px solid whitesmoke;
		background: white;
		border-radius: 3px;
		margin: 2px 5px;
		padding: 0 2px;
		line-height: 2rem;
		color: grey;
		:hover {
			background: whitesmoke;
		}
	}
`;

const PicSourceDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const SourceLink = styled.div`
	margin: 10px;
	a {
		color: black;
	}
`;

class EpisodeView extends Component {
	constructor() {
		super();
	}

	buttonClick = (ev, filterBy) => {
		ev.preventDefault();
		this.props.setFilter(filterBy);
		this.props.history.push('/');
	};

	render() {
		//Prevent loading an empty state, or a rerendering state
		if (
			this.props.fetchingPodcast ||
			!this.props.episodes.length ||
			this.props.reRender
		)
			return <Loading> Loading Podcasts...</Loading>;

		//Find the episode at this address
		const episode = this.props.episodes.find(
			episode => this.props.match.params.id === episode.guid['#cdata']
		);

		//Find the addresses of the episodes before and after this one.
		let index = this.props.episodes.findIndex(ep => ep === episode);
		let previousKey;
		let nextKey;
		if (index !== 0) {
			previousKey = this.props.episodes[index - 1].guid['#cdata'];
		} else {
			previousKey = episode.guid['#cdata'];
		}
		if (index !== this.props.episodes.length - 1) {
			nextKey = this.props.episodes[index + 1].guid['#cdata'];
		} else {
			nextKey = episode.guid['#cdata'];
		}

		//Parse the text to display in the body of the podcast notes
		const allParagraphs = episode['content:encoded']['#cdata']
			.match(/<p>(.*?)<\/p>/g)
			.map(val => {
				return val.replace(/<\/?p>/g, '').replace(/\\/g, '');
			});

		//Parse the title to display "&" correctly
		const betterTitle = episode.title.split('&amp;').join(' & ');

		//Parse the MP3 address to pass to the MP3 player
		const mp3 = episode.enclosure.url.substr(
			0,
			episode.enclosure.url.lastIndexOf('.mp3') + 4
		);
		console.log(episode);
		return (
			<NavWrapper>
				<NavLink
					to={previousKey}
					as={Link}
					onClick={() => this.props.forceRerender()}>
					{'<'}
				</NavLink>
				<EpisodeFullPlate>
					{/* need to get  " &amp; " out of titles */}
					<Title>{betterTitle}</Title>
					<AudioPlayer controls location={this.props.location}>
						<source src={mp3} type='audio/mpeg' />
						<p>
							Your browser does not support HTML5 audio, but you
							can still
							<a href='audiofile.mp3'>download the music</a>
						</p>
					</AudioPlayer>
					<InfoWrapper>
						<BodyText>
							<Date>Published on {episode.pubDate}</Date>
							{allParagraphs
								.filter(
									p =>
										p.trim() !== 'Consults:' &&
										p.trim() !== 'Contact us:' &&
										p.trim() !==
											'Contact Us: hpopodcast@gmail.com' &&
										p.trim() !== 'HPO Patreon:' &&
										p.trim() !==
											'Consider supporting us:' &&
										!RegExp('^(Find w*)', 'gm').test(
											p.trim()
										) &&
										// !RegExp('Find \w*', 'g').test(p.trim()) &&
										p.trim() !== 'HPO Patreon' &&
										p.trim() !==
											'Butcher Box Discount Code: HPO' &&
										p.trim() !==
											'<a href="thrivemarket.com/hpo">Thrive: thrivemarket.com/hpo</a>' &&
										p.trim() !==
											'<a href="https://www.butcherbox.com/">Butcher Box</a> Discount Code: HPO' &&
										p.trim() !==
											'<a href="http://patreon.com/hpopodcast">Patreon</a>: patreon.com/hpopodcast' &&
										p.trim() !==
											'<a href="http://butcherbox.com">Butcherbox</a>: code (HPO)'
								)
								.map((p, index) => (
									<div key={index}>
										<div
											dangerouslySetInnerHTML={{
												__html: p
											}}
										/>
										<br />
									</div>
								))}
						</BodyText>
						<PicSourceDiv>
							<Image
								src={episode['itunes:image'].href}
								alt='hpo'
							/>
							<SourceLink>
								<a href={episode.link['#cdata']}>Source</a>
							</SourceLink>
						</PicSourceDiv>
					</InfoWrapper>

					<TagsWrapper>
						Tags:{' '}
						{episode['itunes:keywords'] !== null
							? episode['itunes:keywords']
									.split(',')
									.map((tag, index) => (
										<button
											key={index}
											onClick={ev =>
												this.buttonClick(ev, tag)
											}>
											{tag}
										</button>
									))
							: ''}
					</TagsWrapper>
				</EpisodeFullPlate>
				<NavLink
					to={nextKey}
					as={Link}
					onClick={() => this.props.forceRerender()}>
					{'>'}
				</NavLink>
			</NavWrapper>
		);
	}
}

export default connect(
	({episodes, jsonState, fetchingPodcast, filter, reRender}) => ({
		episodes,
		jsonState,
		fetchingPodcast,
		filter,
		reRender
	}),
	{setFilter, clearFilter, getPodcasts, forceRerender}
)(EpisodeView);
