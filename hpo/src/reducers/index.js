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
	jsonState: {},
	filter: ''
};

//Change xmlsString to XML

// (c) 2018 Sem Postma
// This code is licensed under MIT license
//From https://medium.com/@polyismstudio/converting-json-from-and-to-xml-in-javascript-9d3d8288331f

function xml2obj(xml, opt) {
	if (typeof xml === 'string') {
		var dom = new DOMParser().parseFromString(xml, 'application/xml');
		xml = dom.childNodes[dom.childNodes.length - 1];
	}
	opt = opt || {};
	var attrPrefix = opt.attrPrefix || '';
	function toObj(xml) {
		var n,
			o = {};
		if (xml.nodeType === 1) {
			if (xml.attributes.length) {
				for (var i = 0; i < xml.attributes.length; i++) {
					o[attrPrefix + xml.attributes[i].nodeName] = (
						xml.attributes[i].nodeValue || ''
					).toString();
				}
			}
			if (xml.firstChild) {
				var textChild = 0,
					cdataChild = 0,
					hasElementChild = false;
				for (n = xml.firstChild; n; n = n.nextSibling) {
					if (n.nodeType === 1) {
						hasElementChild = true;
					} else {
						if (
							n.nodeType === 3 &&
							n.nodeValue.match(/[^ \f\n\r\t\v]/)
						) {
							textChild++;
						} else {
							if (n.nodeType === 4) {
								cdataChild++;
							}
						}
					}
				}
				if (hasElementChild) {
					if (textChild < 2 && cdataChild < 2) {
						removeWhite(xml);
						for (n = xml.firstChild; n; n = n.nextSibling) {
							if (n.nodeType === 3) {
								o['#text'] = escape(n.nodeValue);
							} else {
								if (n.nodeType === 4) {
									o['#cdata'] = escape(n.nodeValue);
								} else {
									if (o[n.nodeName]) {
										if (o[n.nodeName] instanceof Array) {
											o[n.nodeName][
												o[n.nodeName].length
											] = toObj(n);
										} else {
											o[n.nodeName] = [
												o[n.nodeName],
												toObj(n)
											];
										}
									} else {
										o[n.nodeName] = toObj(n);
									}
								}
							}
						}
					} else {
						if (!xml.attributes.length) {
							o = escape(innerXml(xml));
						} else {
							o['#text'] = escape(innerXml(xml));
						}
					}
				} else {
					if (textChild) {
						if (!xml.attributes.length) {
							o = escape(innerXml(xml));
						} else {
							o['#text'] = escape(innerXml(xml));
						}
					} else {
						if (cdataChild) {
							if (cdataChild > 1) {
								o = escape(innerXml(xml));
							} else {
								for (n = xml.firstChild; n; n = n.nextSibling) {
									o['#cdata'] = escape(n.nodeValue);
								}
							}
						}
					}
				}
			}
			if (!xml.attributes.length && !xml.firstChild) {
				o = null;
			}
		} else {
			if (xml.nodeType === 9) {
				o = toObj(xml.documentElement);
			} else {
				alert('unhandled node type: ' + xml.nodeType);
			}
		}
		return o;
	}
	function innerXml(node) {
		var s = '';
		if ('innerHTML' in node) {
			s = node.innerHTML;
		} else {
			var asXml = function(n) {
				var s = '';
				if (n.nodeType === 1) {
					s += '<' + n.nodeName;
					for (var i = 0; i < n.attributes.length; i++) {
						s +=
							' ' +
							n.attributes[i].nodeName +
							'="' +
							(n.attributes[i].nodeValue || '').toString() +
							'"';
					}
					if (n.firstChild) {
						s += '>';
						for (var c = n.firstChild; c; c = c.nextSibling) {
							s += asXml(c);
						}
						s += '</' + n.nodeName + '>';
					} else {
						s += '/>';
					}
				} else {
					if (n.nodeType === 3) {
						s += n.nodeValue;
					} else {
						if (n.nodeType === 4) {
							s += '<![CDATA[' + n.nodeValue + ']]\x3e';
						}
					}
				}
				return s;
			};
			for (var c = node.firstChild; c; c = c.nextSibling) {
				s += asXml(c);
			}
		}
		return s;
	}
	function escape(txt) {
		return txt
			.replace(/[\\]/g, '\\\\')
			.replace(/["]/g, '\\"')
			.replace(/[\n]/g, '\\n')
			.replace(/[\r]/g, '\\r');
	}
	function removeWhite(e) {
		e.normalize();
		for (var n = e.firstChild; n; ) {
			if (n.nodeType === 3) {
				if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
					var nxt = n.nextSibling;
					e.removeChild(n);
					n = nxt;
				} else {
					n = n.nextSibling;
				}
			} else {
				if (n.nodeType === 1) {
					removeWhite(n);
					n = n.nextSibling;
				} else {
					n = n.nextSibling;
				}
			}
		}
		return e;
	}
	if (xml.nodeType === 9) {
		xml = xml.documentElement;
	}
	var obj = toObj(removeWhite(xml));
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
				// jsonState: xmlToJson(xmlStrToXML(action.payload)),
				// episodes: xmlToJson(xmlStrToXML(action.payload)).rss.channel.item,
				jsonState: xml2obj(action.payload),
				episodes: xml2obj(action.payload).channel.item,
				fetchingPodcast: false
			};

		default:
			return state;
	}
};

export default hpoReducer;
