import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import {
  selectorsNamesForValidation,
  popupForEditAuthor,
  popupForAddCard,
  popupForScaleImage,
  popupForRemoveCard,
  popupForEditAvatar,
  profileEditOpenBtn,
  profileAvatarEdit,
  cardAddOpenBtn,
  formForEditAuthor,
  formForAddCard,
  formForEditAvatar,
  authorProfileInput,
  authorJobProfileInput,
} from '../utils/constants.js';
let userId;

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-47', {
  authorization: 'dc0faca1-78e5-42a6-966c-b9167ae5d248',
  'Content-Type': 'application/json',
});

const validatorFormForEditAuthor = new FormValidator(selectorsNamesForValidation, formForEditAuthor);
const validatorFromForAddCard = new FormValidator(selectorsNamesForValidation, formForAddCard);
const validatorFromForEditAvatar = new FormValidator(selectorsNamesForValidation, formForEditAvatar);

const cards = new Section((item) => {
  const cardItem = handleNewCard(item).generateCard();
  cards.addItem(cardItem);
}, '.elements');

const dataInfo = new UserInfo({
  selectorNameAuthor: '.profile__name',
  selectorInfoAuthor: '.profile__description',
  selectorAvatarAuthor: '.profile__avatar',
});

const popupProfile = new PopupWithForm(popupForEditAuthor, (data) => {
  popupProfile.downloadProcces(true, 'Сохранение...');
  api
    .editProfile(data)
    .then((userInfo) => {
      dataInfo.setUserInfo(userInfo);
      popupProfile.close();
    })
    .catch((err) => {
      popupProfile.downloadProcces(true, 'Ошибка отправки формы')
      console.log(`Ошибка.....: ${err}`)
    })
    .finally(popupProfile.downloadProcces(false));
});
const popupCard = new PopupWithForm(popupForAddCard, (data) => {
  popupCard.downloadProcces(true, 'Сохранение...');
  api
    .addCard(data)
    .then((card) => {
      cards.addItem(handleNewCard(card).generateCard());
      popupCard.close();
    })
    .catch((err) => {
      popupCard.downloadProcces(true, 'Ошибка отправки формы');
      console.log(`Ошибка.....: ${err}`);
    })
    .finally(popupCard.downloadProcces(false));
});
const popupScaleImage = new PopupWithImage(popupForScaleImage);
const popupCardRemove = new PopupWithConfirm(popupForRemoveCard, (card) => {
  popupCardRemove.downloadProcces(true, 'Удаление...');
  api
    .deleteCard(card._data._id)
    .then(() => {
      card.deleteCard();
      popupCardRemove.close();
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(popupCardRemove.downloadProcces(false));
});
const popupEditAvatar = new PopupWithForm(popupForEditAvatar, (data) => {
  popupEditAvatar.downloadProcces(true, 'Сохранение...');
  api
    .editProfileAvatar(data.link)
    .then((data) => {
      dataInfo.setUserInfo(data);
      popupEditAvatar.close();
    })
    .catch((err) => {
      popupEditAvatar.downloadProcces(true, 'Ошибка отправки формы');
      console.log(`Ошибка.....: ${err}`);
    })
    .finally(popupEditAvatar.downloadProcces(false));
});

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([info, initialCards]) => {
    userId = info._id;
    dataInfo.setUserInfo(info);
    cards.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

function handleCardClick(evt) {
  return popupScaleImage.open(evt.target);
}

function handleRemoveCard(data) {
  popupCardRemove.open(data);
}

function handleNewCard(card) {
  const newCard = new Card(
    card,
    '#card',
    handleCardClick,
    userId,
    () => handleRemoveCard(newCard),
    () => {
      api
        .likeCard(card._id)
        .then((res) => {
          newCard.likesAmount(res.likes);
          newCard.like();
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`));
    },
    () => {
      api
        .deleteLikeCard(card._id)
        .then((res) => {
          newCard.likesAmount(res.likes);
          newCard.disLike();
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`));
    }
  );
  return newCard;
}

validatorFormForEditAuthor.enableValidation();
validatorFromForAddCard.enableValidation();
validatorFromForEditAvatar.enableValidation();
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupScaleImage.setEventListeners();
popupCardRemove.setEventListeners();
popupEditAvatar.setEventListeners();

profileEditOpenBtn.addEventListener('click', () => {
  popupProfile.open();
  const { nameAuthor, infoAuthor } = dataInfo.getUserInfo();
  authorProfileInput.value = nameAuthor;
  authorJobProfileInput.value = infoAuthor;
  validatorFormForEditAuthor.resetValidation();
});

cardAddOpenBtn.addEventListener('click', () => {
  popupCard.open();
  validatorFromForAddCard.resetValidation();
});

profileAvatarEdit.addEventListener('click', () => {
  popupEditAvatar.open();
  validatorFromForEditAvatar.resetValidation();
});