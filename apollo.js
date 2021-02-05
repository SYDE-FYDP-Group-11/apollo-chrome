const observerConfig = { childList: true, subtree: true };

const toPrimaryColumn = function (record) {
  if (record.addedNodes.length > 0)
    return record.addedNodes[0].querySelector('main div')
};

const observerCallback = function(mutationsList, observer) {
  if (!this.foundPrimaryColumn) {
    const primaryColumn = mutationsList.map(toPrimaryColumn).filter(x => x);
    if (primaryColumn.length > 0) {
      observer.takeRecords().forEach(processChange);
      observer.disconnect();
      observer.observe(primaryColumn[0], observerConfig);
      this.foundPrimaryColumn = true;
    }
  } else {
    processChange(mutationsList);
  }
};

const toArticle = function (record) {
  if (record.addedNodes.length > 0)
    return record.addedNodes[0].querySelector("article");
}

const processChange = function(mutationsList) {
  mutationsList.map(toArticle).filter(x => x)
    .forEach(function(article) {
      processArticle(article)
      tweetObserver.observe(article, observerConfig)
    });
};

const tweetObserverCallback = function (mutationsList, observer) {
  let article = mutationsList[0].target.closest("article");
  if (article)
    processArticle(article);
}

const processArticle = function(article) {
  if (article.dataset.apolloed)
    return;

  // Right now just take the first link
  const link = article.querySelector('a[href*="t.co"]');
  if (link) {
    const annotateArticle = createAnnotator(article);
    getAnnotations(link.getAttribute("href"), annotateArticle);
    article.dataset.apolloed = true;
  }
};

const tweetObserver = new MutationObserver(tweetObserverCallback);

const root = document.getElementById("react-root");
const observer = new MutationObserver(observerCallback);
observer.observe(root, observerConfig);
