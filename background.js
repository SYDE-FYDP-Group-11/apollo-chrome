// Listen for new messages from the content script
// Sends the user's chosen Tweet ID to server hosted on GCP
chrome.runtime.onConnect.addListener(port => {
	console.assert(port.name == 'apollo')
	port.onMessage.addListener(msg => {
		var es = new EventSource(`https://apollo3.nn.r.appspot.com/sse?tweet_id=${msg.tweet_id}`);

		// Listen for returning messages from the server hosted on GCP
		es.addEventListener('message', e => {
			port.postMessage(JSON.parse(e.data))
		})

		// Close the connection when custom event transmission is received
		es.addEventListener('close', e => {
			es.close()
		})
	})
})

// Open the extension's about page upon installation
chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({ url: "https://syde-fydp-group-11.github.io/apollo-about/" });
});
