const popupFigure = document.querySelector('.popup_type_figure');
const popupCloseButton = popupFigure.querySelector('.popup__close');
const popupImage = popupFigure.querySelector('.popup__img');
const popupFigcaption = popupFigure.querySelector('.popup__text');

class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._alt = name;
        this._cardSelector = cardSelector;
    }
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
    
        return cardElement;
    }
//Закрытие по ФОНУ
    _сlosingByBackground(evt) {
        if (evt.target === evt.currentTarget) {
            this._closePopup();
     }  
    }
//Закрытие по ESC
    _closingByEsc(evt) {
            if (evt.key === 'Escape') {
                this._closePopup();   
            }
    }  
//Открытие попапа
    _showPopup() {
        popupImage.src = this._link;
        popupImage.alt = this._alt;
        popupFigcaption.textContent = this._name;
        popupFigure.classList.add('popup_on'); 
    }
//Закрытие попапа
    _closePopup() {
        popupFigure.classList.remove('popup_on');
        //popupImage.src = '';
        //popupImage.alt = '';
        //popupFigcaption.textContent = '';
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
          this._showPopup();
        });
        popupCloseButton.addEventListener('click', () =>{
            this._closePopup(); 
        });
        document.addEventListener('keydown', (evt) => {
            this._closingByEsc(evt);
        });
        this._element.querySelector('.element__basket').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._activeLike(evt);
        });
        popupFigure.addEventListener('click', (evt) => {
            this._сlosingByBackground(evt);
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
