chrome.runtime.onConnect.addListener(port => {
	console.assert(port.name == 'apollo')
	port.onMessage.addListener(msg => {
		var es = new EventSource(`https://apollo3.nn.r.appspot.com/sse?tweet_id=${msg.tweet_id}`);

		es.addEventListener('message', e => {
			port.postMessage(JSON.parse(e.data))
		})

		es.addEventListener('close', e => {
			es.close()
		})
	})
})

chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({ url: "https://syde-fydp-group-11.github.io/apollo-about/" });
});
