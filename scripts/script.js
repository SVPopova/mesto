let buttonEdit = document.querySelector('.profile__button_edit');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__close');
let nameProfile = document.querySelector('.profile__name');
let aboutProfile = document.querySelector('.profile__about');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_about');

function showPopup() {
    popup.classList.add('popup_on');
    nameInput.value = nameProfile.textContent;
    jobInput.value = aboutProfile.textContent;
}
function closePopup() {
    popup.classList.remove('popup_on'); 
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameProfile.textContent = nameInput.value;
    aboutProfile.textContent = jobInput.value;
    closePopup()
}

buttonEdit.addEventListener("click", showPopup);
buttonClose.addEventListener("click", closePopup);
formElement.addEventListener('submit', formSubmitHandler);
