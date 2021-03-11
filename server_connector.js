class ServerConnector {
  constructor(sidebar) {
    this.port = chrome.runtime.connect({ name: 'apollo' })
    this.current_tweet_id = ''

    this.port.onMessage.addListener(msg => {
      if (msg.tweet_id == this.current_tweet_id) {
        switch (msg.type) {
          case 'article_info':
            sidebar.addArticleInfo(msg.content)
            break
          case 'sentiment_analysis':
            sidebar.addSentimentAnalysis(msg.content, msg.tweet_id)
            break
          case 'related_articles':
            sidebar.addRelatedArticles(msg.content)
            break
        }
      }
    })
  }

  requestTweetData(tweet_id) {
    this.current_tweet_id = tweet_id
    this.port.postMessage({ tweet_id: tweet_id })
  }
}
