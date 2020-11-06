chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.contentScriptQuery == "queryApi") {
			fetch(`https://hoth-server.herokuapp.com/api?url=${request.url}`)
				.then(response => response.json())
				.then(sendResponse)
				.catch(err => console.log("Error: " + err.message)
			);
			return true;
		}
	});
