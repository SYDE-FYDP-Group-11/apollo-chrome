const tooltip_img = chrome.extension.getURL('img/tooltip-icon.svg');

const tooltips = {
  "author": "Apollo will attempt to identify the author automatically. If there is no author listed, we encourage you to try to identify the author manually."
};

const initializeTooltip = function(span) {
  const text = tooltips[span.dataset.tooltip]
  span.innerHTML = `<embed src="${tooltip_img}">`;
  span.setAttribute("aria-label", text);
  span.dataset.microtipPosition = "right";
  span.dataset.microtipSize = "medium";
  span.setAttribute("role", "tooltip");
}
