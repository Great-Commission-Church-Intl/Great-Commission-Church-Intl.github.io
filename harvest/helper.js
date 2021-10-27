function updateElement(element, value) {
  while (element.firstChild) { element.removeChild(element.lastChild); }
  let e = document.createTextNode(value);
  element.appendChild(e);
}

export { updateElement };
