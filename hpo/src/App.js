import React, {Component} from 'react';
import {getPodcasts} from './actions';
import {connect} from 'react-redux';
// import styled from "styled-components";
import {GlobalStyle} from './GlobalStyle';
import {withRouter, Route} from 'react-router-dom';
import {Header, ListView, EpisodeView} from './components';

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
		if (!this.state.OKToRender) return <div> Loading...</div>;

		return (
			<>
				<GlobalStyle />
				<div>
					<Header />
					<Route exact path='/' component={ListView} />
					<Route exact path='/episode/:id' component={EpisodeView} />
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
