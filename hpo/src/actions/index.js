import axios from 'axios';

//Fetch Podcast
export const FETCH_PODCAST_START = 'FETCH_PODCAST_START';
export const FETCH_PODCAST_SUCCESS = 'FETCH_PODCAST_SUCCESS';
export const FETCH_PODCAST_FAILURE = 'FETCH_PODCAST_FAILURE';
export const CONVERT_XML = 'CONVERT_XML';

//Filter
export const SET_FILTER = 'SET_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';

//Force refresh of local component
export const FORCE_RENDER = 'FORCE_RENDER';
export const FORCE_ALLOW_RENDER = 'FORCE_ALLOW_RENDER';

const URL = 'http://humanperformanceoutliers.libsyn.com/rss';

export const getPodcasts = () => dispatch => {
	dispatch({type: FETCH_PODCAST_START});
	axios
		.get(`${URL}`)
		.then(response => {
			dispatch({type: FETCH_PODCAST_SUCCESS, payload: response.data});
			dispatch({type: CONVERT_XML, payload: response.data});
		})
		.catch(err => {
			console.log('Fetch failed', err);
			dispatch({type: FETCH_PODCAST_FAILURE, payload: err});
		});
};

export const setFilter = filterTo => dispatch => {
	dispatch({
		type: SET_FILTER,
		payload: filterTo
	});
};

export const clearFilter = () => dispatch => {
	dispatch({
		type: CLEAR_FILTER
	});
};

export const forceRerender = () => dispatch => {
	dispatch({
		type: FORCE_RENDER
	});
	setTimeout(function() {
		dispatch({
			type: FORCE_ALLOW_RENDER
		});
	}, 1);
};
