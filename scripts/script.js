const buttonEdit = document.querySelector('.profile__button_edit');
const buttonAdd = document.querySelector('.profile__button_add');
const popup = document.querySelector('.popup');

const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');
const formElement = document.querySelectorAll('.popup__container');
const formElementEdit = popup.querySelector('.popup__container_edit');
const formElementAdd = popup.querySelector('.popup__container_add');
const buttonCloseEdit = formElementEdit.querySelector('.popup__close');
const buttonCloseAdd = formElementAdd.querySelector('.popup__close');
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
const buttonCloseImg = popupFigure.querySelector('.popup__close');
const cardImg = document.querySelector('.element__image');

//Не получилось вынести в отдельный файл, буду очень благодарна если скините мне ссылку на статью, в которой рассказывают как это сделать)
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
    addToEnd(cardsContainer, cardsElement);
}

initialCards.forEach( function(elem) {
    addCard(elem.name, elem.link);
});

//место добавления
function addToEnd(container, element){
    container.append(element);
}

//Удаление карточки    
function deleteCard(e) {
    const cardsElement = e.target.closest('.element');
    cardsElement.remove();
}

//Открытие попапа
function showPopup(popupOn) {
    popup.classList.add('popup_on');
    popupOn.classList.add('popup__container_active');
    
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
    nameInput.value = nameProfile.textContent;
    jobInput.value = aboutProfile.textContent; 
});
buttonAdd.addEventListener('click', function() {
    linkInput.value = '';
   titleInput.value = '';
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