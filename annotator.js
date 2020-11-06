const createAnnotator = function(article) {
  return function (annotations) {
    let actionBox = article.querySelector('[role="group"]');
    let hothBox = document.createElement("div");
    hothBox.className = "hoth";

    let hothBoxInner = document.createElement("div");
    hothBox.appendChild(hothBoxInner);

    Object.entries(annotations)
      .map(toIndicator)
      .forEach(hothBoxInner.appendChild.bind(hothBoxInner));

    actionBox.insertAdjacentElement("beforebegin", hothBox);
  }
};

const toIndicator = function([key, value]) {
  let span = document.createElement("span");
  let content = document.createTextNode(key);
  span.className = "hoth-indicator hoth-" + key;
  if (typeof value == "boolean")
    span.className += " hoth-" + value.toString(); 
  span.appendChild(content);
  return span
}
