import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPodcasts} from '../actions';
import EpisodeDigest from './EpisodeDigest';
import styled from 'styled-components';
import {Loading} from '../App';

const ListViewWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
    margin-top: 280px;
    @media (max-width: 370px) {
        margin-top: 420px
    }
    @media (max-width: 624px) {
        margin-top: 340px
    }
    
`;

const ListMenu = styled.form`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

const FormInput = styled.input`
	font-size: 1.4rem;
	height: 4rem;
	border-radius: 5px;
	color: black;
	border: none;
	padding: 10px;
	width: 20%;
	min-width: 250px;
	margin: 15px;
`;

const ListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

class ListView extends Component {
	constructor() {
		super();
		this.state = {
			filter: ''
		};
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	//function for search filtering
	filterPodcasts() {
		if (this.state.filter === '') return this.props.episodes;
		return this.props.episodes.filter(episodes => {
			return JSON.stringify(episodes)
				.toLowerCase()
				.includes(this.state.filter.toLowerCase());
		});
	}

	render() {
		if (this.props.fetchingPodcast || !this.props.episodes.length)
			return <Loading> Loading Podcasts...</Loading>;
		return (
			<ListViewWrapper>
				<ListMenu>
					<FormInput
						placeholder='Fitler by Keyword'
						value={this.state.filter}
						type='text'
						name='filter'
						onChange={this.handleChange}
					/>
					<FormInput
						type='month'
						name='month'
						placeholder='Choose a Date Range'
					/>
					{/* https://stackoverflow.com/questions/4753946/html5-slider-with-two-inputs-possible */}
					<FormInput placeholder='Sort List by...' />
				</ListMenu>
				<ListContainer>
					{this.filterPodcasts().map(ep => (
						<EpisodeDigest episode={ep} key={ep.guid['#cdata']} />
					))}
				</ListContainer>
			</ListViewWrapper>
		);
	}
}

export default connect(
	({episodes, jsonState, fetchingPodcast}) => ({
		episodes,
		jsonState,
		fetchingPodcast
	}),
	{getPodcasts}
)(ListView);
