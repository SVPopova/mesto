import './styles/index.css';
import './images/favicon.ico';
import {
  initialCards,
  obj,
  nameProfile,
  aboutProfile,
  buttonEdit,
  buttonAdd,
  popupButtonSave,
  popupButtonAdd,
  nameInput,
  jobInput,
  titleInput,
  linkInput,
  cardsContainer,
} from './scripts/constants.js';
import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/Validate.js';
import { Section } from './scripts/Section.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';

//Создание карточек
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          cardSelector: '#element-template',
          handleCardClick: () => {
            const popupImage = new PopupWithImage(item.name, item.link, '.popup_type_figure');
            popupImage.open();
          },
        },
        item.name,
        item.link,
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  '.elements',
);

const popupImage = new PopupWithImage(cardList.name, cardList.link, '.popup_type_figure');
const popupFormProfile = new PopupWithForm(
  {
    formSelector: '.popup__container_form',
    callback: (item) => {
      const userInfo = new UserInfo(item.name, item.about);
      userInfo.setUserInfo();
    },
  },
  '.popup_type_profile',
);
const popupFormCard = new PopupWithForm(
  {
    formSelector: '.popup__container_form',
    callback: () => {
      const link = linkInput.value;
      const name = titleInput.value;
      const card = new Card(
        {
          cardSelector: '#element-template',
          handleCardClick: () => {
            const popupImage = new PopupWithImage(item.name, item.link, '.popup_type_figure');
            popupImage.open();
          },
        },
        name,
        link,
      );
      const cardElement = card.generateCard();
      cardsContainer.prepend(cardElement);
    },
  },
  '.popup_type_place',
);

// отрисовка карточек
cardList.renderItems();

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
popupImage.setEventListeners();
popupFormProfile.setEventListeners();
popupFormCard.setEventListeners();
buttonEdit.addEventListener('click', () => {
  popupButtonSave.setAttribute('disabled', true); //для того чтоб при открытии кнопка была неактивна и активизировалась после введения валидной информации
  // const userInfo = new UserInfo(nameInput.value, jobInput.value);
  // const userInfoValue = userInfo.getUserInfo();
  // userInfoValue.name = nameProfile.textContent;
  // userInfoValue.about = aboutProfile.textContent;
  nameInput.value = nameProfile.textContent;
  jobInput.value = aboutProfile.textContent;
  popupFormProfile.open();
});
buttonAdd.addEventListener('click', () => {
  popupButtonAdd.setAttribute('disabled', true); //для того чтоб при открытии кнопка была неактивна и активизировалась после введения валидной информации
  popupFormCard.open();
});
