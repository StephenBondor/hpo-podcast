import axios from "axios";

//Fetch Podcast
export const FETCH_PODCAST_START = "FETCH_PODCAST_START";
export const FETCH_PODCAST_SUCCESS = "FETCH_PODCAST_SUCCESS";
export const FETCH_PODCAST_FAILURE = "FETCH_PODCAST_FAILURE";
export const CONVERT_XML = "CONVERT_XML";

//Filter 
export const SET_FILTER = "SET_FILTER";
export const CLEAR_FILTER = "CLEAR_FILTER";


const URL = "http://humanperformanceoutliers.libsyn.com/rss";

export const getPodcasts = () => dispatch => {
	dispatch({ type: FETCH_PODCAST_START });
	axios
		.get(`${URL}`)
		.then(response => {
            dispatch({ type: FETCH_PODCAST_SUCCESS, payload: response.data });
            dispatch({ type : CONVERT_XML, payload: response.data});
		})
		.catch(err => {
			console.log("Fetch failed", err);
			dispatch({ type: FETCH_PODCAST_FAILURE, payload: err });
		});
};

export const setFilter = (filterTo) => dispatch => {
	dispatch({
		type: SET_FILTER,
		payload: filterTo
	})
}

export const clearFilter = () => dispatch => {
	dispatch({
		type: CLEAR_FILTER
	})
}