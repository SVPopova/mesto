const buttonEdit = document.querySelector('.profile__button_edit');
const buttonAdd = document.querySelector('.profile__button_add');
const popup = document.querySelector('.popup');
const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');
const formElement = document.querySelectorAll('.popup__container');
const formElementEdit = popup.querySelector('.popup__container_edit');
const formElementAdd = popup.querySelector('.popup__container_add');
const nameInput = formElementEdit.querySelector('.popup__input_name');
const jobInput = formElementEdit.querySelector('.popup__input_about');
const titleInput = formElementAdd.querySelector('.popup__input_title');
const linkInput = formElementAdd.querySelector('.popup__input_link');
const popupButtonSave = popup.querySelector('.popup__button_save');
const popupButtonAdd = popup.querySelector('.popup__button_add');
const popupTitlePlace = popup.querySelector('.popup__title_place');
const popupTitleProfile = popup.querySelector('.popup__title_profile');
const popupFigure = popup.querySelector('.popup__container_figure');
const popupImg = popupFigure.querySelector('.popup__img');
const popupText = popupFigure.querySelector('.popup__text');
const cardImg = document.querySelector('.element__image');
const buttonClose = document.querySelectorAll('.popup__close');
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
    addToStart(cardsContainer, cardsElement);
}

initialCards.forEach( function(elem) {
    addCard(elem.name, elem.link);
});

//место добавления
function addToStart(container, element){
    container.prepend(element);
}

//Удаление карточки    
function deleteCard(evt) {
    const cardsElement = evt.target.closest('.element');
    cardsElement.remove();
}

//Открытие попапа
function showPopup(popupOn) {
    popup.classList.add('popup_on');
    popupOn.classList.add('popup__container_active');
    
}
//открытие изображения
function openImg(evt) {
    const cardsElement = evt.target.closest('.element')
    popupImg.src = cardsElement.querySelector('.element__image').src;
    popupImg.alt = cardsElement.querySelector('.element__image').alt;
    popupText.textContent = cardsElement.querySelector('.element__title').textContent;
    showPopup(popupFigure);

}
//Функция закрытия попапа
function closePopup(evt) {
    const popup = evt.target.closest('.popup'); 
    const formElement = popup.querySelectorAll('.popup__container');
    formElement.forEach(evt=>{
        popup.classList.remove('popup_on'); 
        evt.classList.remove('popup__container_active');
    });
    console.log(formElement);
 }
//Закрытие попапа при клике на ФОН
function ClosingByBackground (evt) {
    if (evt.currentTarget === evt.target) { 
       closePopup(evt); 
    }   
}
//Закрытие попапа при нажатии на ESC
function ClosingByEsc (evt) {
    if (evt.key === 'Escape') {
        formElement.forEach(evt=>{
            popup.classList.remove('popup_on'); 
            evt.classList.remove('popup__container_active');
        });
    }   
}
//Изменение данных профиля
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameProfile.textContent = nameInput.value;
    aboutProfile.textContent = jobInput.value;
    closePopup(evt);
}





popup.addEventListener('click', ClosingByBackground);
document.addEventListener('keydown', ClosingByEsc)

buttonEdit.addEventListener('click', function() {
    showPopup(formElementEdit); 
    nameInput.value = nameProfile.textContent;
    jobInput.value = aboutProfile.textContent; 
});
buttonAdd.addEventListener('click', function() {
    linkInput.value = '';
   titleInput.value = '';
    showPopup(formElementAdd);
});
buttonClose.forEach(e=> {
    e.addEventListener('click', closePopup);
});

formElementEdit.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', evt =>{
    evt.preventDefault(); 
   const link = linkInput.value;
   const name = titleInput.value;
   linkInput.value = '';
   titleInput.value = '';
    addCard(name, link);
    closePopup(evt);
});