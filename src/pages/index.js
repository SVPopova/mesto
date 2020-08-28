import './index.css';
import '../images/favicon.ico';
import {
  obj,
  nameProfile,
  aboutProfile,
  buttonEdit,
  buttonAdd,
  popupButtonSave,
  popupButtonAdd,
  popupButtonChange,
  nameInput,
  jobInput,
  avatarProfile,
} from '../scripts/constants.js';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/Validate.js';
import { Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { PopupWithDelete } from '../scripts/PopupWithDelete.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { Api } from '../scripts/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '9eba132f-f547-4f26-8f5f-732456ccc9d1',
    'Content-Type': 'application/json',
  },
});
const userInfo = new UserInfo({ nameProfile, aboutProfile, avatarProfile });
//Загрузка данных профиля с сервера
console.log(userInfo);
console.log(userInfo._id);

const getCard = (item) => {
  const card = new Card({
    data: item,
    cardSelector: '#element-template',
    handleCardClick: () => {
      const popupImage = new PopupWithImage(item.name, item.link, '.popup_type_figure');
      popupImage.open();
    },
    handleCardDelete: () => {
      popupWithDelete.open(cardElement, item._id);
    },
    handleCardLike: (item) => {
      console.log(item.likes);
      if (cardElement.querySelector('.element__like').classList.contains(`element__like_active`)) {
        api.unLikeCards(item._id).then((data) => {
          cardElement.querySelector('.element__like-number').textContent = data.likes.length;
          cardElement.querySelector('.element__like').classList.remove('element__like_active');
        });
      } else {
        api.likeCards(item._id).then((data) => {
          cardElement.querySelector('.element__like-number').textContent = data.likes.length;
          cardElement.querySelector('.element__like').classList.add('element__like_active');
        });
      }
    },
  });
  const cardElement = card.generateCard();
  cardElement.querySelector('.element__like-number').textContent = item.likes.length;
  if (item.owner._id === userInfo._id) {
    cardElement.querySelector('.element__basket').classList.add('element__basket_active');
  }
  item.likes.forEach((like) => {
    if (like._id === userInfo._id) {
      cardElement.querySelector('.element__like').classList.add('element__like_active');
    }
  });
  return cardElement;
};
const cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = getCard(item);
      cardList.addItem(cardElement);
    },
  },
  '.elements',
);

//ПОПАПЫ
const popupImage = new PopupWithImage(cardList.name, cardList.link, '.popup_type_figure');
const popupFormProfile = new PopupWithForm(
  {
    callback: (item) => {
      popupFormProfile._form.querySelector('.popup__button_save').textContent = 'Сохранение...';
      api
        .changeUserInfo(item)
        .then((data) => {
          userInfo.setUserInfo({ name: data.name, about: data.about });
        })
        .finally(() => {
          popupFormProfile._form.querySelector('.popup__button_save').textContent = 'Сохранить';
          popupFormProfile.close();
        });
    },
  },
  '.popup_type_profile',
);
const popupFormCard = new PopupWithForm(
  {
    callback: (formData) => {
      popupFormCard._form.querySelector('.popup__button_add').textContent = 'Создание...';
      api
        .createCards(formData)
        .then((data) => {
          const cardElement = getCard(data);
          cardList.addItem(cardElement);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          popupFormCard._form.querySelector('.popup__button_add').textContent = 'Создать';
          popupFormCard.close();
        });
    },
  },
  '.popup_type_place',
);
const popupWithDelete = new PopupWithDelete({
  popupSelector: '.popup_type_agree',
  formSelector: '.popup__container_form',
  submit: (cardElement, idCard) => {
    popupWithDelete._form.querySelector('.popup__button_agree').textContent = 'Удаление...';
    api
      .deleteCards(idCard)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithDelete._form.querySelector('.popup__button_agree').textContent = 'Создать';
        popupWithDelete.close();
      });
  },
});

const popupWithAvatar = new PopupWithForm(
  {
    callback: (formData) => {
      popupWithAvatar._form.querySelector('.popup__button_change').textContent = 'Сохранение...';
      api
        .changeAvatar(formData.link)
        .then((data) => {
          userInfo.setUserInfo({ link: data.avatar });
        })
        .finally(() => {
          popupWithAvatar._form.querySelector('.popup__button_change').textContent = 'Сохранить';
          popupWithAvatar.close();
        });
    },
  },
  '.popup_type_avatar',
);
//Валидация
obj.forEach((obj) => {
  const validate = new FormValidator(obj, '.popup_type_profile');
  const validateElement = validate.enableValidation();
});

obj.forEach((obj) => {
  const validate = new FormValidator(obj, '.popup_type_place');
  const validateElement = validate.enableValidation();
});

obj.forEach((obj) => {
  const validate = new FormValidator(obj, '.popup_type_avatar');
  const validateElement = validate.enableValidation();
});

//Слушатели
popupWithAvatar.setEventListeners();
document.querySelector('.profile__avatar').addEventListener('click', () => {
  popupButtonChange.setAttribute('disabled', true);
  popupWithAvatar.open();
});
popupImage.setEventListeners();
popupFormProfile.setEventListeners();
popupFormCard.setEventListeners();
popupWithDelete.setEventListeners();
buttonEdit.addEventListener('click', () => {
  popupButtonSave.setAttribute('disabled', true); //для того чтоб при открытии кнопка была неактивна и активизировалась после введения валидной информации
  nameInput.value = nameProfile.textContent;
  jobInput.value = aboutProfile.textContent;
  popupFormProfile.open();
});
buttonAdd.addEventListener('click', () => {
  popupButtonAdd.setAttribute('disabled', true); //для того чтоб при открытии кнопка была неактивна и активизировалась после введения валидной информации
  popupFormCard.open();
});

//Промисы. Загрузка с сервера
Promise.all([api.getMe(), api.getInitialCards()]).then(([data, items]) => {
  //Загрузка с сервера данных пользователя
  userInfo.setUserInfo(data);
  //Загрузка карточек с сервера
  // отрисовка карточек
  cardList.renderItems(items);
});
