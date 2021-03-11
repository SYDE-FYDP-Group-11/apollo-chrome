const profile_img = chrome.extension.getURL('img/Profile.svg');
const warning_img = chrome.extension.getURL('img/alert-triangle.svg');
const fallback_img = chrome.extension.getURL('img/fallback_thumbnail.jpg');
const close_img = chrome.extension.getURL('img/xbutton.png');
const loading_html = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

class Sidebar {
  constructor() {
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
            <div id="apollo-excerpt"></div>
            <div><span id="apollo-site"></span></div>
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
              Sentiment Analysis
              <a data-tooltip="sentiment"></a>
            </div>
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
    this.excerpt = document.getElementById('apollo-excerpt');
    this.site = document.getElementById('apollo-site');
    this.date = document.getElementById('apollo-date');
    this.author = document.getElementById('apollo-author');
    this.related = document.getElementById('apollo-related');
  }

  clear() {
    this.image.classList.add("apollo-hidden");
    this.image.src = null;
    this.headline.innerHTML = loading_html;
    this.excerpt.innerHTML = null;
    this.site.innerHTML = null;
    this.date.innerHTML = null;
    this.author.innerHTML = loading_html;
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
    // this.excerpt.innerHTML = json.excerpt;
    //this.site.innerHTML = json.site;
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
    let author_img = json.byline ? profile_img : warning_img;
    this.author.innerHTML = `<embed src="${author_img}">` + author;
  }

  addSentimentAnalysis(json) {
    // TODO
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
