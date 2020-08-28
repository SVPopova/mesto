class Section {
  constructor({ renderer }, cardSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(cardSelector);
  }
  renderItems(data) {
    this._renderedItems = data;
    this._renderedItems.reverse().forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
export { Section };
