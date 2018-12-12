import axios from "axios";

//Fetch Podcast
export const FETCH_PODCAST_START = "FETCH_PODCAST_START";
export const FETCH_PODCAST_SUCCESS = "FETCH_PODCAST_SUCCESS";
export const FETCH_PODCAST_FAILURE = "FETCH_PODCAST_FAILURE";
export const CONVERT_XML = "CONVERT_XML";

const URL = "http://humanperformanceoutliers.libsyn.com/rss";

export const getPodcasts = () => dispatch => {
	dispatch({ type: FETCH_PODCAST_START });
	axios
		.get(`${URL}`)
		.then(response => {
			console.log("Fetch succeeded", response);
            dispatch({ type: FETCH_PODCAST_SUCCESS, payload: response.data });
            dispatch({ type : CONVERT_XML, payload: response.data});
		})
		.catch(err => {
			console.log("Fetch failed", err);
			dispatch({ type: FETCH_PODCAST_FAILURE, payload: err });
		});
};

// Zach Bitter Shawn Baker


// "https://itunes.apple.com/search?term=Zach+Bitter+Shawn+Baker

// const hello = {
//     "resultCount":1,
//     "results": [
//    {"wrapperType":"track", 
//    "kind":"podcast", 
//    "collectionId":1363389413, 
//    "trackId":1363389413, 
//    "artistName":"Zach Bitter Shawn Baker", 
//    "collectionName":"Human Performance Outliers Podcast", 
//    "trackName":"Human Performance Outliers Podcast", 
//    "collectionCensoredName":"Human Performance Outliers Podcast", 
//    "trackCensoredName":"Human Performance Outliers Podcast", 
//    "collectionViewUrl":"https://itunes.apple.com/us/podcast/human-performance-outliers-podcast/id1363389413?mt=2&uo=4", 
//    "feedUrl":"http://humanperformanceoutliers.libsyn.com/rss", 
//    "trackViewUrl":"https://itunes.apple.com/us/podcast/human-performance-outliers-podcast/id1363389413?mt=2&uo=4", 
//    "artworkUrl30":"https://is5-ssl.mzstatic.com/image/thumb/Music128/v4/41/4a/2e/414a2e6c-b044-bdd5-a667-cc792587392f/source/30x30bb.jpg", 
//    "artworkUrl60":"https://is5-ssl.mzstatic.com/image/thumb/Music128/v4/41/4a/2e/414a2e6c-b044-bdd5-a667-cc792587392f/source/60x60bb.jpg", 
//    "artworkUrl100":"https://is5-ssl.mzstatic.com/image/thumb/Music128/v4/41/4a/2e/414a2e6c-b044-bdd5-a667-cc792587392f/source/100x100bb.jpg", 
//    "collectionPrice":0.00, 
//    "trackPrice":0.00, 
//    "trackRentalPrice":0, 
//    "collectionHdPrice":0, 
//    "trackHdPrice":0, 
//    "trackHdRentalPrice":0, 
//    "releaseDate":"2018-12-10T10:00:00Z", 
//    "collectionExplicitness":"cleaned", 
//    "trackExplicitness":"cleaned", 
//    "trackCount":56, 
//    "country":"USA", 
//    "currency":"USD", 
//    "primaryGenreName":"Fitness & Nutrition", 
//    "contentAdvisoryRating":"Clean", 
//    "artworkUrl600":"https://is5-ssl.mzstatic.com/image/thumb/Music128/v4/41/4a/2e/414a2e6c-b044-bdd5-a667-cc792587392f/source/600x600bb.jpg", 
//    "genreIds": ["1417", "26", "1307", "1316"], 
//    "genres":["Fitness & Nutrition", "Podcasts", "Health", "Sports & Recreation"]}]
// }