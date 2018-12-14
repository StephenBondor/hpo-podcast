import React, {Component} from 'react';
import {getPodcasts} from './actions';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {GlobalStyle} from './GlobalStyle';
import {withRouter, Route} from 'react-router-dom';
import {Header, ListView, EpisodeView} from './components';

export const Loading = styled.div`
	margin-top: 300px;
	width: 100%;
	text-align: center;
`;

const Footer = styled.h3`
	width: 60%;
	margin: 20px auto;
	text-align: center;
	a {
		color: black;
		:hover {
			color: #777;
		}
	}
`;

class App extends Component {
	constructor() {
		super();
		this.state = {
			OKToRender: false
		};
	}

	//Fetch the State from libsyn
	componentDidMount() {
		this.props.getPodcasts();
	}

	//Only allow content to render once podast is fully fetched
	componentDidUpdate(prevProps) {
		if (this.props.fetchingPodcast !== prevProps.fetchingPodcast) {
			if (!this.props.fetchingPodcast) {
				this.setState({
					OKToRender: true
				});
			}
		}
	}

	render() {
		// Check to make sure all state is initiallized
		if (!this.state.OKToRender) return <Loading> Loading...</Loading>;

		return (
			<>
				<GlobalStyle />
				<div>
					<Header {...this.props} />
					<Route exact path='/' component={ListView} />
					<Route path='/episode/:id' component={EpisodeView} />
					<Footer>
						This is a volunteer, open-source student redesign of{' '}
						<a href={this.props.jsonState.channel.link}>
							{this.props.jsonState.channel.title}'s&nbsp;libsyn
							website
						</a>{' '}
						&nbsp;
						<a href='https://github.com/StephenBondor/hpo-podcast'>
							Our source on GitHub
						</a>{' '}
						contributors welcome!
					</Footer>
				</div>
			</>
		);
	}
}

export default withRouter(
	connect(
		({fetchingPodcast, jsonState}) => ({fetchingPodcast, jsonState}),
		{getPodcasts}
	)(App)
);
