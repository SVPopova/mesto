const buttonEdit = document.querySelector('.profile__button_edit');
const buttonAdd = document.querySelector('.profile__button_add');
let popup = document.querySelector('.popup');

let nameProfile = document.querySelector('.profile__name');
let aboutProfile = document.querySelector('.profile__about');
let formElement = document.querySelectorAll('.popup__container');
let formElementEdit = popup.querySelector('.popup__container_edit');
let formElementAdd = popup.querySelector('.popup__container_add');
let buttonCloseEdit = formElementEdit.querySelector('.popup__close');
let buttonCloseAdd = formElementAdd.querySelector('.popup__close');
let nameInput = formElementEdit.querySelector('.popup__input_name');
let jobInput = formElementEdit.querySelector('.popup__input_about');
let titleInput = formElementAdd.querySelector('.popup__input_title');
let linkInput = formElementAdd.querySelector('.popup__input_link');
let popupButtonSave = popup.querySelector('.popup__button_save');
let popupButtonAdd = popup.querySelector('.popup__button_add');
let popupTitlePlace = popup.querySelector('.popup__title_place');
let popupTitleProfile = popup.querySelector('.popup__title_profile');

let popupFigure = popup.querySelector('.popup__container_figure');
let popupImg = popupFigure.querySelector('.popup__img');
let popupText = popupFigure.querySelector('.popup__text');
let buttonCloseImg = popupFigure.querySelector('.popup__close');
let cardImg = document.querySelector('.element__image');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const cardsContainer = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#element-template').content;


// Добавление карточек
function addCard(name, link) {
    const cardsElement = cardsTemplate.cloneNode(true);
    cardsElement.querySelector('.element__image').src = link;
    cardsElement.querySelector('.element__image').alt = name;
    cardsElement.querySelector('.element__title').textContent = name;
    
   
    //слушатель кнопки удаления карточки
    cardsElement.querySelector('.element__basket').addEventListener('click', deleteCard);

    //Активный лайк
    const elementLike = cardsElement.querySelector('.element__like');
    elementLike.addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active'); 
  });
    //слушатель открытия картинки
    cardsElement.querySelector('.element__image').addEventListener('click', openImg);
    cardsContainer.append(cardsElement);
}

initialCards.forEach( function(elem) {
    addCard(elem.name, elem.link);
});

//Удаление карточки    
function deleteCard(e) {
    const cardsElement = e.target.closest('.element');
    cardsElement.remove();
}

//Открытие попапа
function showPopup(popupOn) {
    popup.classList.add('popup_on');
    popupOn.classList.add('popup__container_active');
    nameInput.value = nameProfile.textContent;
    jobInput.value = aboutProfile.textContent;  
}

//Закрытие попапа
function closePopup(popupOff) {
    popup.classList.remove('popup_on'); 
    popupOff.classList.remove('popup__container_active');
}

//Изменение данных профиля
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameProfile.textContent = nameInput.value;
    aboutProfile.textContent = jobInput.value;
    closePopup(formElementEdit)
}

//открытие изображения
function openImg(evt) {
    const cardsElement = evt.target.closest('.element')
    popupImg.src = cardsElement.querySelector('.element__image').src;
    popupImg.alt = cardsElement.querySelector('.element__image').alt;
    popupText.textContent = cardsElement.querySelector('.element__title').textContent;
    showPopup(popupFigure);

}


buttonEdit.addEventListener('click', function() {
    showPopup(formElementEdit);
});
buttonAdd.addEventListener('click', function() {
    showPopup(formElementAdd);
});

buttonCloseEdit.addEventListener('click', function() {
    closePopup(formElementEdit);
});
buttonCloseAdd.addEventListener('click', function() {
    closePopup(formElementAdd);
});
buttonCloseImg.addEventListener('click', function() {
    closePopup(popupFigure);
});
formElementEdit.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', e =>{
    e.preventDefault(); 
   const link = linkInput.value;
   const name = titleInput.value;
   linkInput.value = '';
   titleInput.value = '';
    addCard(name, link)
    closePopup(formElementAdd)
});