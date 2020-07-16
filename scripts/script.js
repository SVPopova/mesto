const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');
const buttonEdit = document.querySelector('.profile__button_edit');
const buttonAdd = document.querySelector('.profile__button_add');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupFigure = document.querySelector('.popup_type_figure');
const formElementEdit = popupProfile.querySelector('.popup__container');
const formElementAdd = popupPlace.querySelector('.popup__container');
const inputs = document.querySelectorAll('.popup__input');
const nameInput = formElementEdit.querySelector('.popup__input_name');
const jobInput = formElementEdit.querySelector('.popup__input_about');
const titleInput = formElementAdd.querySelector('.popup__input_title');
const linkInput = formElementAdd.querySelector('.popup__input_link');
const popupImg = popupFigure.querySelector('.popup__img');
const popupText = popupFigure.querySelector('.popup__text');
const buttonClose = document.querySelectorAll('.popup__close');
const cardsContainer = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#element-template').content;


//Активный лайк
function activeLike(evt) {
    evt.target.classList.toggle('element__like_active'); 
}
//Удаление карточки    
function deleteCard(evt) {
    const cardsElement = evt.target.closest('.element');
    cardsElement.remove();
}
//Открытие изображения
function openImg(evt) {
    const cardsElement = evt.target.closest('.element')
    popupImg.src = cardsElement.querySelector('.element__image').src;
    popupImg.alt = cardsElement.querySelector('.element__image').alt;
    popupText.textContent = cardsElement.querySelector('.element__title').textContent;
    showPopup(popupFigure);
}
//Слушатели карточек
function cardsListener(cardsElement, elementLike) {
     //слушатель кнопки удаления карточки
     cardsElement.querySelector('.element__basket').addEventListener('click', deleteCard);
     //Слушатель лайка    
     elementLike.addEventListener('click', activeLike); 
     //слушатель открытия картинки
     cardsElement.querySelector('.element__image').addEventListener('click', openImg);
}

// Добавление карточек
function createCardElement(name, link) {
    const cardsElement = cardsTemplate.cloneNode(true);
    const elementLike = cardsElement.querySelector('.element__like');
    cardsElement.querySelector('.element__image').src = link;
    cardsElement.querySelector('.element__image').alt = name;
    cardsElement.querySelector('.element__title').textContent = name;
    //Слушатели карточек
    cardsListener(cardsElement, elementLike);
   

    return cardsElement;
}
initialCards.forEach( function(elem) {
    const cardElement = createCardElement(elem.name, elem.link);
    cardsContainer.append(cardElement);
});

//Закрытие попапа при клике на ФОН
function сlosingByBackground() {
    const popupOn = document.querySelector('.popup_on');
    popupOn.addEventListener('click', (evt)=>{
    if (evt.target === evt.currentTarget) {
        closePopup(popupOn);
    }
 });  
}
//Закрытие попапа при нажатии на ESC
function closingByEsc(evt) {
    const popupOn = document.querySelector('.popup_on');
        if (evt.key === 'Escape') {
            closePopup(popupOn);   
        }
}
//Функция открытия попапа
function showPopup(popup) {
    popup.classList.add('popup_on'); 
    document.addEventListener('keydown', closingByEsc); 
    сlosingByBackground(); 
}
//Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_on');
    document.removeEventListener('keydown', closingByEsc); 
    clearInputs();
 }


 
//Изменение данных профиля
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameProfile.textContent = nameInput.value;
    aboutProfile.textContent = jobInput.value;
    closePopup(popupProfile);
}
//Функция очищения инпутов
function clearInputs(){
    if (inputs){
        inputs.forEach(evt =>{
            evt.value = '';
        });
    }
}



buttonEdit.addEventListener('click', function() {
    enableValidation({
        formSelector: '.popup__container_form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inputErrorClass: 'popup__input_error',
        errorClass: 'popup__input-error_active'
    });
    showPopup(popupProfile); 
    nameInput.value = nameProfile.textContent;
    jobInput.value = aboutProfile.textContent; 
    
    
});
buttonAdd.addEventListener('click', function() {
    linkInput.value = '';
    titleInput.value = '';
    showPopup(popupPlace);
    enableValidation({
        formSelector: '.popup__container_form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inputErrorClass: 'popup__input_error',
        errorClass: 'popup__input-error_active'
    });
});
buttonClose.forEach(e=> {
    e.addEventListener('click', function(){
        closePopup(popupPlace);
        closePopup(popupProfile);
        closePopup(popupFigure);
    });
});
formElementEdit.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', evt =>{
        evt.preventDefault(); 
        const link = linkInput.value;
        const name = titleInput.value;
        linkInput.value = '';
        titleInput.value = '';
        const cardElement = createCardElement(name, link);
        cardsContainer.prepend(cardElement);
        closePopup(popupPlace);
});