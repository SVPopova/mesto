let buttonEdit = document.querySelector('.profile__button_edit');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__close');

function showPopup() {
    popup.classList.remove('popup_off');
    popup.classList.add('popup_on');
}
function closePopup() {
    popup.classList.remove('popup_on');
    popup.classList.add('popup_off');
}
buttonEdit.addEventListener("click", showPopup);
buttonClose.addEventListener("click", closePopup);


let nameInput = popup.querySelector('.popup__name');
let jobInput = popup.querySelector('.popup__about');
let nameProfile = document.querySelector('.profile__name');
let aboutProfile = document.querySelector('.profile__about');
nameInput.value = nameProfile.textContent;
jobInput.value = aboutProfile.textContent;



let formElement = document.querySelector('.popup__container')
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let nameInput = formElement.querySelector('.popup__name');
    let jobInput = formElement.querySelector('.popup__about');
    nameProfile.textContent = nameInput.value;
    aboutProfile.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
