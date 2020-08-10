class Card {
  constructor({ cardSelector, handleCardClick }, name, link) {
    this._name = name;
    this._link = link;
    this._alt = name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  //Удаление карточки
  _deleteCard() {
    this._element.remove();
  }
  //Лайк
  _activeLike(evt) {
    evt.target.classList.toggle('element__like_active');
  }
  //Слушатели
  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    });
    // popupCloseButton.addEventListener('click', () =>{
    //     this._closePopup();
    // });
    // document.addEventListener('keydown', (evt) => {
    //     this._closingByEsc(evt);
    // });
    this._element.querySelector('.element__basket').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._activeLike(evt);
    });

    // popupFigure.addEventListener('click', (evt) => {
    //     this._сlosingByBackground(evt);
    // });
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
