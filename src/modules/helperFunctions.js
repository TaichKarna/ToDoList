export { createDiv, createImageDiv };

function createDiv(className) {
  const element = document.createElement("div");
  element.classList.add(className);
  return element;
}

function createImageDiv(className, imgSrc) {
  const element = createDiv(className);
  const img = document.createElement("img");
  img.src = imgSrc;
  element.appendChild(img);

  return element;
}
