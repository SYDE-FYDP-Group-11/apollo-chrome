// This file contains code that monitors the Twitter page for new Tweets
// When a Tweet is found, the Apollo button will be inserted and set-up

const toPrimaryColumn = function (record) {
  if (record.addedNodes.length > 0)
    return record.addedNodes[0].querySelector('main div')
};

// Page level mutation observer callback
// Looks for the primary column to be found (so we don't need
// to monitor the entire page)
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

// Process a change in the primary column
// Looks for new tweets and adds them to the tweetObserver
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

// Process a loaded <article> tag (a loaded tweet)
const processArticle = function(article) {
  if (article.dataset.apolloed)
    return;

  // Only add button to Tweets containing external links
  const article_link = article.querySelector('a[href^="https://t.co/"]');
  if (!article_link)
    return;

  const tweet_link = article.querySelector('a[href*="/status/"]');
  if (!tweet_link)
    return
  const regex = /(?<=\/status\/)[0-9]+/;
  const tweet_id = tweet_link.getAttribute("href").match(regex)[0];

  const card = article_link.closest('[data-testid="card.wrapper"]');
  const button = addButton(article, article_link, card);

  // When the button is clocked, make a request using the TweetID
  button.onclick = () => {
    sidebar.open();
    addPersistentHighlight(card || article_link);
    styleButtonAsOpen(button);
    serverConnector.requestTweetData(tweet_id);
  };

  article.dataset.apolloed = true;
};

const sidebar = new Sidebar();
const serverConnector = new ServerConnector(sidebar)

const observerConfig = { childList: true, subtree: true };

// Create mutation observer that will eventually be used to watch
// Tweets
const tweetObserver = new MutationObserver(tweetObserverCallback);

// Create mutation observer to watch for new Tweets
const root = document.getElementById("react-root");
const observer = new MutationObserver(observerCallback);
observer.observe(root, observerConfig);
