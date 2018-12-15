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
	margin-top: 145px;
	padding: 0 10px;
	
	@media (max-width: 887px) {
		margin-top: 200px;
	}
	@media (max-width: 783px){
		margin-top: 150px;
	}
	@media (max-width: 720px){
		margin-top: 200px;
	}
	@media (max-width: 639px) {
		margin-top: 120px;
	}
	@media (max-width: 533px) {
		margin-top: 175px;
	}
	@media (max-width: 469px) {
		margin-top: 100px;
	}
	@media (max-width: 375px) {
		margin-top: 130px;
	}
	@media (max-width: 345px) {
		margin-top: 180px;
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
				<ListMenu>
					<FormInput
						placeholder='Fitler by Keyword'
						value={this.state.filter}
						type='text'
						name='filter'
						onChange={this.handleChange}
					/>
				</ListMenu>
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
						<div>
							No Matches. Consider broadening your search...
						</div>
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
