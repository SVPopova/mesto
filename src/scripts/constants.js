const obj = [
  {
    formSelector: '.popup__container_form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active',
  },
];
const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');
const buttonEdit = document.querySelector('.profile__button_edit');
const buttonAdd = document.querySelector('.profile__button_add');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const formElementEdit = popupProfile.querySelector('.popup__container');
const formElementAdd = popupPlace.querySelector('.popup__container');
const popupButtonSave = document.querySelector('.popup__button_save');
const popupButtonAdd = document.querySelector('.popup__button_add');
const nameInput = formElementEdit.querySelector('.popup__input_name');
const jobInput = formElementEdit.querySelector('.popup__input_about');
const popupFigure = document.querySelector('.popup_type_figure');
const popupImage = popupFigure.querySelector('.popup__img');
const popupFigcaption = popupFigure.querySelector('.popup__text');
const popupButtonChange = document.querySelector('.popup__button_change');
const avatarProfile = document.querySelector('.profile__avatar');

export {
  obj,
  nameProfile,
  aboutProfile,
  buttonEdit,
  buttonAdd,
  formElementAdd,
  formElementEdit,
  popupButtonSave,
  popupButtonAdd,
  popupButtonChange,
  nameInput,
  jobInput,
  popupImage,
  popupFigcaption,
  avatarProfile,
};
