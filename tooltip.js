const tooltip_img = chrome.extension.getURL('img/tooltip-icon.svg');

const initializeTooltip = function(span) {
  span.innerHTML = `<embed src="${tooltip_img}">`;
  span.setAttribute("aria-label", "Text!");
  span.dataset.microtipPosition = "right";
  span.dataset.microtipSize = "medium";
  span.setAttribute("role", "tooltip");
}
