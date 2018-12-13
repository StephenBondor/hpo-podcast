import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPodcasts} from '../actions';

class EpisodeView extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
       
        return (
			<>
				Hello from EpisodeView
			</>
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
)(EpisodeView);
