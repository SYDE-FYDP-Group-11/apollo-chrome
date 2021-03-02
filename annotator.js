const addButton = function(article) {
  let actionBox = article.querySelector('[role="group"]');
  actionBox.classList.add("apollo-has-button");
  let button = document.createElement("button");
  button.classList = "apollo-button"
  button.appendChild(document.createTextNode("Apollo!"));
  actionBox.appendChild(button);
  return button;
}
