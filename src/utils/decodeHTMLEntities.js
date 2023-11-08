const decodeHTMLEntities = (text) => {
    const elem = document.createElement("div");
    elem.innerHTML = text;
    return elem.textContent;
  };

export { decodeHTMLEntities };


