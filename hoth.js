const observerConfig = { childList: true, subtree: true };

const pageChangeCallback = function(mutationsList, observer) {
  mutationsList.map(function(record) {
    if (record.addedNodes.length > 0)
      return $(record.addedNodes[0]).find("article");
  }).filter(function(article) {
    return article && article.length > 0;
  }).forEach(logLink);
}

const logLink = function(article) {
  var links = article.find('a[href*="t.co"');
  console.log(links);
};


// TODO: Make not hacky
setTimeout(function() {
  const primaryColumn = $("main div").get(0)
  const observer = new MutationObserver(pageChangeCallback);
  observer.observe(primaryColumn, observerConfig);
}, 500);
