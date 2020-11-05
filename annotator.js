const createAnnotator = function (article) {
  return function (annotations) {
    let actionBox = article.querySelector('[role="group"]');
    let hothBox = document.createElement("div");
    hothBox.className = "hoth";
    let content = document.createTextNode(JSON.stringify(annotations));
    hothBox.appendChild(content);
    actionBox.insertAdjacentElement("beforebegin", hothBox);
  }
};
