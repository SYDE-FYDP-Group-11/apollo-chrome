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
          <div>Headline</div>
          <div id="apollo-headline"></div>
          <div>Excerpt</div>
          <div id="apollo-excerpt"></div>
          <div>Site</div>
          <div id="apollo-site"></div>
          <div>Last Updated <span id="apollo-date"></span></div>
        </div>
        <div>
          <div>Author</div>
          <div id="apollo-author"></div>
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
    this.date.innerHTML = json.date
    this.author.innerHTML = json.byline
  }

  addSentimentAnalysis(json) {
    // TODO
  }

  addRelatedArticles(json) {
    // this.textbox.innerHTML = JSON.stringify(json, null, 2);
  }
}

