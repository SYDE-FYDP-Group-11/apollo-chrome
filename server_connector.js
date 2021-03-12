class ServerConnector {
  constructor(sidebar) {
    // Each ServerConnector is connected to a Sidebar object
    // This allows for messages to be sent to and from the background script
    this.port = chrome.runtime.connect({ name: 'apollo' })
    this.current_tweet_id = ''

    // Listen for new messages from the background script
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

  // Send new message to the background script with user's chosen Tweet ID
  requestTweetData(tweet_id) {
    this.current_tweet_id = tweet_id
    this.port.postMessage({ tweet_id: tweet_id })
  }
}
