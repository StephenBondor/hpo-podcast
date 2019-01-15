import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearFilter} from '../actions';
import EpisodeDigest from './EpisodeDigest';
import styled from 'styled-components';
import {Loading} from '../App';

export const MainViewWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0 10px;
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
	text-align: center;
`;

const ListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const DividerLine = styled.div`
	width: 100px;
	border: .5px solid rgba(100, 100, 100, 0.1);;
`;

const BadSearch = styled.div`
	margin: 15px;
`;

class ListView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: !this.props.filter ? '' : this.props.filter,
			previousKey: '',
			nextKey: ''
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
			<MainViewWrapper>
				<DividerLine/>
				<ListMenu>
					<FormInput
						placeholder='Fitler by Keyword(s)'
						value={this.state.filter}
						type='text'
						name='filter'
						onChange={this.handleChange}
					/>
				</ListMenu>
				<DividerLine/>
				<ListContainer>
					{this.filterPodcasts().length ? (
						this.filterPodcasts().map(ep => (
							<EpisodeDigest
								episode={ep}
								key={ep.guid['#cdata']}
								clearFilter={this.props.clearFilter}
							/>
						))
					) : (
						<BadSearch>
							No Matches. Consider broadening your search...
						</BadSearch>
					)}
				</ListContainer>
			</MainViewWrapper>
		);
	}
}

export default connect(
	({episodes, fetchingPodcast, filter}) => ({
		episodes,
		fetchingPodcast,
		filter
	}),
	{clearFilter}
)(ListView);
