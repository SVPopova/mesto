import { Popup } from './Popup.js';

class PopupWithDelete extends Popup {
  constructor({ popupSelector, formSelector, submit }) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._submit = submit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._cardElement, this._cardId);
    });
  }
  open(cardElement, idCard) {
    super.open();
    this._cardElement = cardElement;
    this._cardId = idCard;
  }
}

export { PopupWithDelete };
