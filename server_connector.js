const port = chrome.runtime.connect({ name: 'apollo' })
let current_tweet_id = ''

const requestTweetData = function (tweet_id) {
  current_tweet_id = tweet_id
  port.postMessage({ tweet_id: tweet_id })
}

port.onMessage.addListener(msg => {
  if (msg.tweet_id == current_tweet_id) {
    switch (msg.type) {
      case 'related_articles':
        // Call function here to update related articles with content in msg.content
        // msg.tweet_id is filtered to last clicked Tweet
        // msg.event is used to filter for related articles results
        // msg.content contains the result from NewsAPI
        console.log('Related Articles')
        console.log(msg.content)
        break;
      case 'sentiment_analysis':
        // Call function here to update sentiment anaylsis with content in msg.content
        // msg.tweet_id is filtered to last clicked Tweet
        // msg.event is used to filter for sentiment analysis results
        // msg.content contains the result from sentiment analysis API
        console.log('Sentiment Analysis')
        console.log(msg.content)
        break;
    }
  }
})
