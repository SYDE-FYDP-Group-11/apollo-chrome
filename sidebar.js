const profile_img = chrome.extension.getURL('img/Profile.svg');
const loading_html = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

class Sidebar {
  constructor() {
    this.sidebar = document.createElement("div");
    this.sidebar.className = "apollo-sidebar apollo apollo-hidden-sidebar";
    this.sidebar.innerHTML = `
      <div class="apollo-header">
        Apollo
        <span class="apollo-close" id="apollo-close">\u2A2F</span>
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
            <div class="apollo-section-header">Author</div>
            <div id="apollo-author"></div>
          </div>
          <div class="apollo-divider"></div>
          <div>
            <div class="apollo-section-header">Sentiment Analysis</div>
            <div id="apollo-sentiment"></div>
          </div>
          <div class="apollo-divider"></div>
          <div>
            <div class="apollo-section-header">Related Articles</div>
            <div id="apollo-related"></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(this.sidebar);

    document.getElementById('apollo-close').onclick = this.close.bind(this)

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
    this.sidebar.classList.add("apollo-hidden-sidebar");
    if (document.body.classList.contains("noscroll"))
      document.body.classList.remove("noscroll");
  }

  addArticleInfo(json) {
    if (json.image) {
      this.image.src = json.image;
      this.image.classList.remove("apollo-hidden");
    }
    this.headline.innerHTML = json.title;
    let date = json.date ? (new Date(json.date))
      .toLocaleString('en-US', 
        { year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: "numeric",
          minute: "numeric" })
      : "Unknown";
    this.date.innerHTML = `Last Updated <span>${date}</span>`;

    let author = json.byline ? json.byline : 'Unknown';
    this.author.innerHTML = `<embed src="${profile_img}">` + author;
  }

  addSentimentAnalysis(json) {
    let position = ((json.score + 1) / 2) * 100
    let type = json.label
    let alpha = Math.abs(json.score)

    let html = `
      <div>This article uses language that is...</div>
      <figure class="apollo-plot">
        <ul class="apollo-line">
          <li>
            <div class="apollo-midpoint"></div>
          </li>
          <li>
            <div class="apollo-point apollo-point-background" style="left: ${position}%;"></div>
          </li>
          <li>
            <div class="apollo-point apollo-point-${type}" style="left: ${position}%; --alpha: ${alpha}"></div>
          </li>
        </ul>
      </figure>
      <div style="float: left">Negative</div>
      <div style="float: right">Positive</div>
      <div style="margin: 0 auto; width: 200px; text-align:center">Neutral or Mixed</div>
    `
    this.sentiment.innerHTML = html;
  }

  addRelatedArticles(json) {
    let html = `<div>We found ${json.length} articles related to this headline</div>`;
    json.forEach(article => {
      html += `
        <a href=${article.url} class="apollo-related-article">
          <img src=${article.image}></img>
          <div>
            <div>${article.title}</div>
            <div>${article.source}</div>
          </div>
        </a>
      `
    });

    this.related.innerHTML = html;
  }
}
