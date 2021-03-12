// This file contains code to annotate existing Tweets

// Add button to a specific Tweet
const addButton = function(article, article_link, card) {
  let buttonLocation = article_link.parentElement.parentElement;

  let outerDiv = document.createElement("div");
  let button = document.createElement("button");
  outerDiv.appendChild(button);
  outerDiv.classList = "apollo-button"
  button.append("Can I trust this article?");

  buttonLocation.after(outerDiv);

  button.onmouseover = () => { addHighlight(card || article_link) };
  button.onmouseout = () => { removeHighlight(card || article_link) };

  return button;
}

// Add and remove link highlighting

// Classes are not used to avoid Twitter overwriting the class list
const addHighlight = function(link) {
  if (link.dataset.apolloHighlighted != "persistent")
    link.dataset.apolloHighlighted = "true";
}

const removeHighlight = function(link) {
  if (link.dataset.apolloHighlighted != "persistent")
    delete link.dataset.apolloHighlighted;
}

const addPersistentHighlight = function(link) {
  // Only allow one persistent highlight at a time
  removePersistentHighlights();
  link.dataset.apolloHighlighted = "persistent";
}

const removePersistentHighlights = function() {
  document.querySelectorAll("[data-apollo-highlighted='persistent']").forEach((e) => {
    delete e.dataset.apolloHighlighted;
  })
}

// Add and remove the "open" button styling so the user
// can tell which Tweet is currently being analyzed in the
// sidebar

const styleButtonAsOpen = function(button) {
  removeOpenButtonStyling();
  button.classList.add("apollo-open");
}

const removeOpenButtonStyling = function() {
  document.querySelectorAll(".apollo-button .apollo-open").forEach((e) => {
    e.classList.remove("apollo-open");
  })
}
