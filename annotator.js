const addButton = function(article) {
  let actionBox = article.querySelector('[role="group"]');
  actionBox.classList.add("apollo-has-button");
  let button = document.createElement("button");
  button.classList = "apollo-button"
  button.append("Apollo");
  actionBox.appendChild(button);
  return button;
}

// TODO: I no longer think we should highlight links
const highlightLink = function(link) {
  if (!link.querySelector('div'))
    link.dataset.apolloLink = 'highlighted';
}
