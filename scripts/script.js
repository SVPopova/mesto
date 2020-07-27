import { initialCards, obj } from './variables.js';
import { Card } from './card.js';
import { FormValidator } from './validate.js';


const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');
const buttonEdit = document.querySelector('.profile__button_edit');
const buttonAdd = document.querySelector('.profile__button_add');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const formElementEdit = popupProfile.querySelector('.popup__container');
const formElementAdd = popupPlace.querySelector('.popup__container');
const buttonClose = document.querySelectorAll('.popup__close');
const popupButtonSave = popupProfile.querySelector('.popup__button');
const popupButtonAdd = popupPlace.querySelector('.popup__button');
const nameInput = formElementEdit.querySelector('.popup__input_name');
const jobInput = formElementEdit.querySelector('.popup__input_about');
const titleInput = formElementAdd.querySelector('.popup__input_title');
const linkInput = formElementAdd.querySelector('.popup__input_link');
const cardsContainer = document.querySelector('.elements');

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
//Создание карточек
initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '#element-template');
    const cardElement = card.generateCard();
    document.querySelector('.elements').append(cardElement);
});
//Валидация
obj.forEach((obj) => {
    const validate = new FormValidator(obj, '.popup_type_profile');
    const validateElement = validate.enableValidation();
    });
    
obj.forEach((obj) => {
    const validate = new FormValidator(obj, '.popup_type_place');
    const validateElement = validate.enableValidation();
    });
//Слушатели
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
        const card = new Card(name, link, '#element-template');
        const cardElement = card.generateCard();
        cardsContainer.prepend(cardElement);
        closePopup(popupPlace);
        clearInputs(popupPlace);
});


