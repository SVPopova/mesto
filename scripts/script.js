const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');
const buttonEdit = document.querySelector('.profile__button_edit');
const buttonAdd = document.querySelector('.profile__button_add');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupFigure = document.querySelector('.popup_type_figure');
const formElementEdit = popupProfile.querySelector('.popup__container');
const formElementAdd = popupPlace.querySelector('.popup__container');
const buttonClose = document.querySelectorAll('.popup__close');
const popupButtonSave = popupProfile.querySelector('.popup__button');
const popupButtonAdd = popupPlace.querySelector('.popup__button');
const nameInput = formElementEdit.querySelector('.popup__input_name');
const jobInput = formElementEdit.querySelector('.popup__input_about');
const titleInput = formElementAdd.querySelector('.popup__input_title');
const linkInput = formElementAdd.querySelector('.popup__input_link');
const popupImg = popupFigure.querySelector('.popup__img');
const popupText = popupFigure.querySelector('.popup__text');
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
function renderCards(cards) {
    cards.forEach( function(elem) {
        const cardElement = createCardElement(elem.name, elem.link);
        cardsContainer.append(cardElement);
    });
}
renderCards(initialCards);




//Функция открытия попапа
function showPopup(popup) {
    popup.classList.add('popup_on'); 
    document.addEventListener('keydown', closingByEsc); 
    popup.addEventListener('click', сlosingByBackground); //решила сделать так чтоб не добавлять если вдруг новая форма появиться
}
//Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_on');
    document.removeEventListener('keydown', closingByEsc); 
    popup.removeEventListener('click', сlosingByBackground); //решила сделать так чтоб не добавлять если вдруг новая форма появиться
}
//Закрытие попапа при клике на ФОН
function сlosingByBackground(evt) {
    const popupOn = document.querySelector('.popup_on');
    if (evt.target === evt.currentTarget) {
        closePopup(popupOn);
 }  
}
//Закрытие попапа при нажатии на ESC
function closingByEsc(evt) {
    const popupOn = document.querySelector('.popup_on');
        if (evt.key === 'Escape') {
            closePopup(popupOn);   
        }
}



//Функция очищения инпутов
function clearInputs(popup){
    const inputs = popup.querySelectorAll('.popup__input');
    if (inputs){
        inputs.forEach(evt =>{
            evt.value = '';
        });
    }
}
//Изменение данных профиля
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameProfile.textContent = nameInput.value;
    aboutProfile.textContent = jobInput.value;
    closePopup(popupProfile);
    clearInputs(popupProfile);
}



buttonEdit.addEventListener('click', function() {
    showPopup(popupProfile); 
    popupButtonSave.setAttribute('disabled', true);//для того чтоб при открытии кнопка была неактивна и активизировалась после введения валидной информации
    nameInput.value = nameProfile.textContent;
    jobInput.value = aboutProfile.textContent;
});
buttonAdd.addEventListener('click', function() {
    popupButtonAdd.setAttribute('disabled', true);//для того чтоб при открытии кнопка была неактивна и активизировалась после введения валидной информации
    clearInputs(popupPlace);
    showPopup(popupPlace);
});
buttonClose.forEach(button =>{//чтоб не назначать каждой форме отдельно. кнопка ищет своего родителя и закрывает его.
    button.addEventListener('click', function(evt){
    const popup = evt.target.closest('.popup');
    closePopup(popup); 
});
});
formElementEdit.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', evt =>{
        evt.preventDefault(); 
        const link = linkInput.value;
        const name = titleInput.value;
        const cardElement = createCardElement(name, link);
        cardsContainer.prepend(cardElement);
        closePopup(popupPlace);
        clearInputs(popupPlace);
});