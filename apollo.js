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
      processArticle(article);
      tweetObserver.observe(article, observerConfig);
    });
};

const tweetObserverCallback = function (mutationsList, observer) {
  const article = mutationsList[0].target.closest("article");
  if (article)
    processArticle(article);
}

const processArticle = function(article) {
  if (article.dataset.apolloed)
    return;

  const tweet_link = article.querySelector('a[href*="/status/"]');
  if (!tweet_link)
    return
  const regex = /(?<=\/status\/)[0-9]+/;
  const tweet_id = tweet_link.getAttribute("href").match(regex)[0];

  const button = addButton(article);
  const annotateArticle = createAnnotator(article);
  // button.onclick = (() => getAnnotations(tweet_id, annotateArticle));
  
  // requestTweetData is used to send a message from the content script to the background script
  // The background script receives the message with the tweet_id and establishes a connection with the server
  // Whenever a piece of data is available from the server, it sends it back to the background script
  // The background script parses the data and sends it as a JSON object to the content script
  // The content script handles which functions are called next
  // The connection with the server remains open until all Tweet data is sent back
  button.onclick = (() => requestTweetData(tweet_id));

  article.dataset.apolloed = true;
};

const tweetObserver = new MutationObserver(tweetObserverCallback);

const root = document.getElementById("react-root");
const observer = new MutationObserver(observerCallback);
observer.observe(root, observerConfig);
