const tooltip_img = chrome.extension.getURL('img/tooltip-icon.svg');

const tooltips = {
  "author": "The presence and credibility of an author is very important in determining the quality of sources.\n\nIf there is no author listed, evaluate the authority of the company/business/ organization that published the information.",
  "sentiment": "Misinformation is significantly more likely to make readers feel negative emotions compared to accurate information.\n\nApollo shows you when an article is doing this.",
};

const initializeTooltip = function(span) {
  const text = tooltips[span.dataset.tooltip]
  span.innerHTML = `<embed src="${tooltip_img}">`;
  span.setAttribute("aria-label", text);
  span.dataset.microtipPosition = "right";
  span.dataset.microtipSize = "medium";
  span.setAttribute("role", "tooltip");
}
