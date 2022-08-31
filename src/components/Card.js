export default class Card {
  constructor(data, cardSelector, handleCardClick, userId, handleRemoveCard, handleLikeCard, handleDeleteLikeCard) {
    this._data = data;
    this._title = data.name;
    this._imageLink = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteLikeCard = handleDeleteLikeCard;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._elementLike = this._element.querySelector('.element__like');
    this._likeAmount = this._element.querySelector('.element__like-amount');
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  likesAmount(likes) {
    
    if (likes.length === 0) {
      this._likeAmount.textContent = '';
    } else {
      this._likeAmount.textContent = likes.length;
    }
  }

  _likeActive() {
    this._likes.forEach((like) => {
      if (this._userId === like._id) {
        this._elementLike.classList.add('element__like_active');
      }
    });
  }

  like() {
    this._elementLike.classList.add('element__like_active');
  }

  disLike() {
    this._elementLike.classList.remove('element__like_active');
  }

  _setEventListener() {
    this._image = this._element.querySelector('.element__image');
    this._elementLike.addEventListener('click', () => {
      if (this._elementLike.classList.contains('element__like_active')) {
        this._handleDeleteLikeCard();
      } else {
        this._handleLikeCard();
      }
    });
    this._element.querySelector('.element__delete').addEventListener('click', this._handleRemoveCard);
    this._image.addEventListener('click', this._handleCardClick);
  }

  generateCard() {
    this._setEventListener();

    this.likesAmount(this._likes);
    this._likeActive();
    this._image.src = this._imageLink;
    this._image.alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;
    if (this._ownerId === this._userId) {
      this._element.querySelector('.element__delete').classList.add('element__delete_active');
    }

    return this._element;
  }
}