const getAnnotations = function (tweet_id, callback) {
  chrome.runtime.sendMessage(
    {contentScriptQuery: "queryApi", tweet_id: tweet_id}, callback
  );
}
