const getAnnotations = function (url, callback) {
  // For debugging purposes
  random = Math.floor((Math.random() * 3) + 1);
  url = `http://test.com/${random}`;
  
  chrome.runtime.sendMessage(
    {contentScriptQuery: "queryApi", url: url}, callback
  );
}
