class Sidebar {
  constructor() {
    this.sidebar = document.createElement("div")
    this.sidebar.className = "apollo-sidebar apollo apollo-hidden"
    this.sidebar.innerHTML = `
      <div class="apollo-header">
        Apollo
        <span class="apollo-close" id="apollo-close">\u2715</span>
      </div>
      <div class="apollo-box">
        <div>
          <img id="apollo-image"></img> 
          <h1>Headline</h1>
          <div id="apollo-headline"></div>
          <div id="apollo-excerpt"></div>
          <div>Site: <span id="apollo-site"></span></div>
          <div>Last updated <span id="apollo-date"></span></div>
        </div>
        <div class="apollo-divider"></div>
        <div>
          <h1>Author</h1>
          <div id="apollo-author"></div>
        </div>
        <div class="apollo-divider"></div>
        <div>
          <h1>Sentiment Analysis</h1>
        </div>
        <div class="apollo-divider"></div>
        <div>
          <h1>Related Articles</h1>
          <div id="apollo-related"></div>
        </div>
      </div>
    `
    document.body.appendChild(this.sidebar);

    document.getElementById('apollo-close').onclick = this.close.bind(this)

    this.image = document.getElementById('apollo-image')
    this.headline = document.getElementById('apollo-headline')
    this.excerpt = document.getElementById('apollo-excerpt')
    this.site = document.getElementById('apollo-site')
    this.date = document.getElementById('apollo-date')
    this.author = document.getElementById('apollo-author')
    this.related = document.getElementById('apollo-related')
  }

  clear() {
    this.image.src = null
    if (!this.image.classList.contains("apollo-hidden"))
      this.image.classList.add("apollo-hidden")
    this.headline.innerHTML = null
    this.excerpt.innerHTML = null
    this.site.innerHTML = null
    this.date.innerHTML = null
    this.author.innerHTML = null
    this.related.innerHTML = null
  }

  open() {
    this.clear()
    if (this.sidebar.classList.contains("apollo-hidden"))
      this.sidebar.classList.remove("apollo-hidden");
  }

  close() {
    this.sidebar.classList.add("apollo-hidden");
  }

  addArticleInfo(json) {
    if (json.image) {
      this.image.src = json.image
      this.image.classList.remove("apollo-hidden")
    }
    this.headline.innerHTML = json.title
    this.excerpt.innerHTML = json.excerpt
    this.site.innerHTML = json.site
    this.date.innerHTML = (new Date(json.date)).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: "numeric", minute: "numeric" })
    this.author.innerHTML = json.byline
  }

  addSentimentAnalysis(json) {
    // TODO
  }

  addRelatedArticles(json) {
    let html = `<div>We found ${json.length} articles related to this headline</div>`
    json.forEach(article => {
      html += `
        <div>
          <img src=${article.image}></img>
          <a href=${article.url}>${article.title}</a>
          <div>${article.source}</div>
        </div>
      `
    })

    this.related.innerHTML = html
  }
}
