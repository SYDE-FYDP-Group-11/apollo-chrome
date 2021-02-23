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
        console.log('Related Articles')
        console.log(msg.content)
        break;
      case 'sentiment_analysis':
        console.log('Sentiment Analysis')
        console.log(msg.content)
        break;
    }
  }
})
