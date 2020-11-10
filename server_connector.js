const getAnnotations = function (url, callback) {
  chrome.runtime.sendMessage(
    {contentScriptQuery: "queryApi", url: url}, callback
  );
}
