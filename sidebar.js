class Sidebar {
  constructor() {
    this.sidebar = document.createElement("div");
    this.sidebar.className = "apollo-sidebar apollo apollo-hidden";

    let header = document.createElement("div");
    header.className = "apollo-header";
    header.appendChild(document.createTextNode("Apollo"));
    this.sidebar.appendChild(header);

    let close_button = document.createElement("span");
    close_button.className = "apollo-close";
    close_button.appendChild(document.createTextNode("\u2715"));
    close_button.onclick = this.close.bind(this);
    header.appendChild(close_button);

    let box = document.createElement("div");
    box.className = "apollo-box";
    this.sidebar.appendChild(box);

    this.textbox = document.createElement("pre");
    this.textbox.className = "apollo-text";
    box.appendChild(this.textbox);

    document.body.appendChild(this.sidebar);
  }

  open() {
    if (this.sidebar.classList.contains("apollo-hidden"))
      this.sidebar.classList.remove("apollo-hidden");
  }

  close() {
    this.sidebar.classList.add("apollo-hidden");
  }

  add_text(text) {
    this.textbox.innerHTML = JSON.stringify(text, null, 2);
  }
}

