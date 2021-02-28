const addButton = function(article) {
  let actionBox = article.querySelector('[role="group"]');
  let button = document.createElement("button");
  button.appendChild(document.createTextNode("Apollo!"));
  actionBox.insertAdjacentElement("beforebegin", button);
  return button
}
