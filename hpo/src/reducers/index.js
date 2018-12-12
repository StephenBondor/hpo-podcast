import {
	FETCH_PODCAST_START,
	FETCH_PODCAST_SUCCESS,
	FETCH_PODCAST_FAILURE,
	CONVERT_XML
} from '../actions';

//Initial State
const initialState = {
	fetchingPodcast: false,
	episodes: [],
	jsonState: {}
};

//Change xmlsString to XML
function xmlStrToXML(xmlString){
    var parser = new DOMParser();
    return parser.parseFromString(xmlString, "application/xml");
}

// Changes XML to JSON
function xmlToJson(xml) {
	// Create the return object
	var obj = {};
	
	if (xml.nodeType == 1) {
		// element
		// do attributes
		if (xml.attributes.length > 0) {
			obj['@attributes'] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) {
		// text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for (var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof obj[nodeName] == 'undefined') {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof obj[nodeName].push == 'undefined') {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
}

const hpoReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PODCAST_START:
			return {
				...state,
				fetchingPodcast: true
			};
		case FETCH_PODCAST_SUCCESS:
			return {
				...state,
				error: null,
				fetchingPodcast: false,
				episodes: action.payload
			};
		case FETCH_PODCAST_FAILURE:
			return {
				...state,
				error: action.payload,
				fetchingPodcast: false
			};

		case CONVERT_XML:
			return {
				...state,
                jsonState: xmlToJson(xmlStrToXML(action.payload)),
                episodes: xmlToJson(xmlStrToXML(action.payload)).rss.channel.item,
			};

		default:
			return state;
	}
};

export default hpoReducer;
