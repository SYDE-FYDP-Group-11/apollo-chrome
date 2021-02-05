const createAnnotator = function(article) {
  return function (annotations) {
    let actionBox = article.querySelector('[role="group"]');
    let apolloBox = document.createElement("div");
    apolloBox.className = "apollo";

    let apolloBoxInner = document.createElement("div");
    apolloBox.appendChild(apolloBoxInner);

    Object.entries(annotations)
      .map(toIndicator)
      .filter(x => x)
      .forEach(apolloBoxInner.appendChild.bind(apolloBoxInner));

    actionBox.insertAdjacentElement("beforebegin", apolloBox);
  }
};

const toIndicator = function([key, value]) {
  if (value === null)
    return;

  let span = document.createElement("span");
  span.className = "apollo-indicator";

  if (indicators[key]["type"] == "bool") {
    span.className += " apollo-" + value.toString();
    let name = document.createTextNode(indicators[key]["name"] + ": ");
    let indicatorValue = boolCopy[indicators[key]["bool_copy"]][value];

    span.appendChild(name);
    span.appendChild(createIndicatorValueElement(indicatorValue));
  } else if (indicators[key]["type"] == "left_right") {
    let text = document.createTextNode(leftRightCopy[value]);
    span.appendChild(text);
  } else if (indicators[key]["type"] == "single_word") {
    if (value)
      return;
    span.className += " apollo-" + value.toString();

    let name = indicators[key]["name"];
    span.appendChild(createIndicatorValueElement(name));
  } else if (indicators[key]["type"] == "count_found") {
    span.className += " apollo-" + (value == 0).toString();
    let name = document.createTextNode(indicators[key]["name"] + ": ");
    let indicatorValue = value + " found";

    span.appendChild(name);
    span.appendChild(createIndicatorValueElement(indicatorValue));
  }

  return span
}

const createIndicatorValueElement = function(value) {
  let indicator_value_element = document.createElement("span");
  indicator_value_element.className = "apollo-value";
  indicator_value_element.appendChild(document.createTextNode(value));
  return indicator_value_element
}
