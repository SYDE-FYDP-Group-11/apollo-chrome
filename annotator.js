const createAnnotator = function(article) {
  return function (annotations) {
    let button = article.querySelector('button');
    let apolloBox = document.createElement("pre");
    apolloBox.className = "apollo";
    let text = JSON.stringify(annotations, null, 2);
    apolloBox.appendChild(document.createTextNode(text));

    button.insertAdjacentElement("afterend", apolloBox);
  }
};

const addButton = function(article) {
  let actionBox = article.querySelector('[role="group"]');
  let button = document.createElement("button");
  button.appendChild(document.createTextNode("Apollo!"));
  actionBox.insertAdjacentElement("beforebegin", button);
  return button
}
