function request_handler(result, url) {
	firePageEvent({result:result, url:url});
}

function firePageEvent(attributes, event_name) {
	if (event_name === undefined) {
		event_name = 'keywordstrategy_page';
	}
	var element = document.createElement("PageDataElement");
	for(var attr_name in attributes) {
		var attr_value = attributes[attr_name];
		if (typeof attr_value != 'string') {
			continue;
		}
		element.setAttribute(attr_name, attr_value);
	}
	document.documentElement.appendChild(element);
	var event = document.createEvent("Events");
	event.initEvent(event_name, true, false);
	element.dispatchEvent(event);
}


function extListener(e) {
	var type = e.target.getAttribute("type");
	if (type == 'request') {
		var url = e.target.getAttribute("url");
		chrome.extension.sendRequest({'action' : 'keywordstrategy_request', 'url': url}, function(r){request_handler(r, url);});
	}
	e.target.parentNode.removeChild(e.target);
}


document.body.setAttribute('keyword_extension', '1.3.5');
document.addEventListener("kewyrodstrategy_extenstion", extListener, false, true);
