class Card {
  constructor({ data, cardSelector, handleCardClick, handleCardDelete, handleCardLike }) {
    this._data = data;
    this._name = this._data.name;
    this._link = this._data.link;
    this._alt = this._data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  //Слушатели
  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    });

    this._element.querySelector('.element__basket').addEventListener('click', () => {
      this._handleCardDelete();
    });
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._handleCardLike();
    });
  }

  //Создание карточки
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

export { Card };
// //Удаление карточки
// _deleteCard() {
//   this._element.remove();
// }
// //Лайк
// _activeLike(evt) {
//   evt.target.classList.toggle('element__like_active');
// }
