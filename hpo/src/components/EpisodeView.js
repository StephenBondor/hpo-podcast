import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPodcasts} from '../actions';
import {Loading} from '../App';

class EpisodeView extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
        if (this.props.fetchingPodcast || !this.props.episodes.length)
        return <Loading> Loading Podcasts...</Loading>;
        
        const episode = this.props.episodes.find(
			episode => this.props.match.params.id === episode.guid['#cdata']
		);
        return (
			<>
				<div>Hello from Episode {episode.title}</div>
                <div>Hello from Episode {episode.title}</div>
                <div>Hello from Episode {episode.title}</div>
                <div>Hello from Episode {episode.title}</div>
                <div>Hello from Episode {episode.title}</div>
                <div>Hello from Episode {episode.title}</div>
                <div>Hello from Episode {episode.title}</div>
                <div>Hello from Episode {episode.title}</div>
                <div>Hello from Episode {episode.title}</div>
                <div>Hello from Episode {episode.title}</div>
                <div>Hello from Episode {episode.title}</div>
              
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
