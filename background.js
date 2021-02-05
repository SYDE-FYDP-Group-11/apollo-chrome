chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.contentScriptQuery == "queryApi") {
			fetch(`https://apollo3.nn.r.appspot.com/api?url=${request.url}`)
				.then(response => response.json())
				.then(json => {
					if (json["error"]) throw new Error(json["error"])
					sendResponse(json)
				})
				.catch(err => console.log("Error: " + err.message)
			);
			return true;
		}
	});
