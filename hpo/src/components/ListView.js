import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPodcasts} from '../actions';
import EpisodeDigest from './EpisodeDigest';
import styled from 'styled-components';

const ListViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 160px;
`;

const ListMenu = styled.div`
	display: flex;
    justify-content: space-around;
`;

const ListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
    justify-content: center;
`;

class ListView extends Component {
	constructor() {
		super();
		this.state = {filter: ''};
	}

	//function needed for search filtering
	filterPodcasts() {
		if (this.state.filter === '') return this.props.episodes;
		return this.props.episodes.filter(episodes => {
			return JSON.stringify(episodes)
				.toLowerCase()
				.includes(this.state.filter.toLowerCase());
		});
	}

	render() {
		return (
			<ListViewWrapper>
				<ListMenu>
					<p>Fitler by keyword! </p>
					<p>Filter by Date slider</p>
                    <p>Sort list by...</p>
				</ListMenu>
				<ListContainer>
					{this.props.episodes.map((ep, index) => (
						<EpisodeDigest episode={ep} key={index} />
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
