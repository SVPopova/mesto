class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleBackgroundClose = this._handleBackgroundClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_on');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleBackgroundClose);
  }
  close() {
    this._popup.classList.remove('popup_on');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleBackgroundClose);
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  _handleBackgroundClose(evt) {
    //в задании о нем ничего не говорилось, но с ним же надо было что-то сделать, решила сделать так
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
  }
}

export { Popup };
