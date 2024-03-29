const profile_img = chrome.extension.getURL('img/Profile.svg');
const warning_img = chrome.extension.getURL('img/alert-triangle.svg');
const fallback_img = chrome.extension.getURL('img/fallback_thumbnail.jpg');
const close_img = chrome.extension.getURL('img/xbutton.png');
const loading_html = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

// Maximum number of past Tweet sentiments stored by the extension
// This history is stored locally only and associated with this Sidebar object
// The history is reset when the page is refreshed or the user navigates elsewhere
const sentiment_history_max = 10;

// The Sidebar class appears on the right side of the user's browser
// It formats and displays information returned from the GCP server
// The code here only writes additional HTML to the page
// There is no reading or modification of existing page elements in this section
class Sidebar {
  constructor() {
    this.past_sentiments = []

    this.sidebar = document.createElement("div");
    this.sidebar.className = "apollo-sidebar apollo apollo-hidden-sidebar";
    this.sidebar.innerHTML = `
      <div class="apollo-header">
        Apollo
        <a class="apollo-close" id="apollo-close">
          <img src="${close_img}" alt="close"></img>
        </a>
      </div>
      <div class="apollo-box">
        <img id="apollo-image" class="apollo-hidden"></img> 
        <div>
          <div>
            <div class="apollo-section-header">Headline</div>
            <div id="apollo-headline"></div>
            <div id="apollo-date">Last updated</div>
          </div>
          <div class="apollo-divider"></div>
          <div>
            <div class="apollo-section-header">
              Author
              <a data-tooltip="author"></a>
            </div>
            <div id="apollo-author"></div>
          </div>
          <div class="apollo-divider"></div>
          <div>
            <div class="apollo-section-header">
              Sentiment
              <a data-tooltip="sentiment"></a>
            </div>
            <div id="apollo-sentiment"></div>
          </div>
          <div class="apollo-divider"></div>
          <div>
            <div class="apollo-section-header">
              Related Articles
            </div>
            <div id="apollo-related"></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(this.sidebar);

    document.getElementById('apollo-close').onclick = this.close.bind(this);

    this.sidebar.querySelectorAll('[data-tooltip]').forEach(initializeTooltip);

    this.image = document.getElementById('apollo-image');
    this.headline = document.getElementById('apollo-headline');
    this.date = document.getElementById('apollo-date');
    this.author = document.getElementById('apollo-author');
    this.sentiment = document.getElementById('apollo-sentiment');
    this.related = document.getElementById('apollo-related');
  }

  clear() {
    this.image.classList.add("apollo-hidden");
    this.image.src = null;
    this.headline.innerHTML = loading_html;
    this.date.innerHTML = null;
    this.author.innerHTML = loading_html;
    this.sentiment.innerHTML = loading_html;
    this.related.innerHTML = loading_html;
  }

  open() {
    this.clear();
    document.body.classList.add("noscroll");
    if (this.sidebar.classList.contains("apollo-hidden-sidebar"))
      this.sidebar.classList.remove("apollo-hidden-sidebar");
  }

  close() {
    removePersistentHighlights();
    removeOpenButtonStyling();
    this.sidebar.classList.add("apollo-hidden-sidebar");
    if (document.body.classList.contains("noscroll"))
      document.body.classList.remove("noscroll");
  }

  addArticleInfo(json) {
    if (json.image) {
      this.image.src = json.image;
      this.image.classList.remove("apollo-hidden");
    }
    this.headline.innerHTML = `<a href=${json.url} target="_blank"
      rel="noopener noreferrer">
        ${json.title}
      </a>`;
    let date = json.date ? (new Date(json.date))
      .toLocaleString('en-US', 
        { year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric' })
      : 'Unknown';
    this.date.innerHTML = `Last Updated <span>${date}</span>`;

    let author = json.byline ? json.byline : 'Unknown';
    let author_img = json.byline ? profile_img : warning_img;
    this.author.innerHTML = `<embed src="${author_img}">` + author;
  }

  addSentimentAnalysis(json, tweet_id) {    
    this.past_sentiments = this.past_sentiments.filter(past => past.tweet_id != tweet_id)
    
    let position = ((json.score + 1) / 2) * 100
    let type = json.label
    let alpha = Math.abs(json.score)

    let html = `
      <div>This article uses language that is...</div>
      <figure class="apollo-plot">
        <ul class="apollo-line">
          <li>
            <div class="apollo-point-vertical" style="left: 0%"></div>
          </li>
          <li>
            <div class="apollo-point-vertical" style="left: 50%"></div>
          </li>
          <li>
            <div class="apollo-point-vertical" style="left: 100%"></div>
          </li>
          <li>
            <div class="apollo-point apollo-point-background" style="left: ${position}%;"></div>
          </li>
          <li>
            <div class="apollo-point apollo-point-${type}" style="left: ${position}%; --alpha: ${alpha};"></div>
          </li>
    `
    this.past_sentiments.forEach(past => {
      html += `
        <li>
          <div class="apollo-point-past" style="left: ${past.position}%;"></div>
        </li>
      `
    })

    html += `
        </ul>
      </figure>
      <div class="apollo-sentiment-label" style="float: left">Negative</div>
      <div class="apollo-sentiment-label" style="float: right">Positive</div>
      <div class="apollo-sentiment-label" style="margin: 0 auto; width: 200px; text-align: center">
        <span class="apollo-sentiment-label-circle apollo-point-neutral"></span>Neutral <span>or</span> <span class="apollo-sentiment-label-circle apollo-point-mixed"></span>Mixed
      </div>
      <div class="apollo-past-label"><span class="apollo-sentiment-label-diamond apollo-point-past"></span>Previously viewed articles (max ${sentiment_history_max})</div>
    `
    this.sentiment.innerHTML = html;

    this.past_sentiments.push({ tweet_id: tweet_id, position: position })
    if (this.past_sentiments.length > sentiment_history_max) {
      this.past_sentiments.shift()
    }
  }

  addRelatedArticles(json) {
    let html = `<div>We found ${json.length} articles related to this headline</div>`;
    json.forEach(article => {
      html += `
        <a href=${article.url} class="apollo-related-article" target="_blank" rel="noopener noreferrer">
          <img src=${article.image || fallback_img}></img>
          <div>
            <div>${article.title}</div>
            <div>${article.source}</div>
          </div>
        </a>
      `
    });

    html += `<div class=apollo-datanews>
      Articles sourced from
      <a href="http://datanews.io" target="_blank" rel="noopener noreferrer">datanews.io</a>
    </div>`;

    this.related.innerHTML = html;
    this.related.querySelectorAll('img').forEach((element) => {
      element.onerror = (e) => { element.src = fallback_img };
    });
  }
}
