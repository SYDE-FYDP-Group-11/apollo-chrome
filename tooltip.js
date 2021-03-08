const initializeTooltip = function(span) {
  span.append("?");
  span.setAttribute("aria-label", "Text!");
  span.dataset.microtipPosition = "right";
  span.dataset.microtipSize = "medium";
  span.setAttribute("role", "tooltip");
}
