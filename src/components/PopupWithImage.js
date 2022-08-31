import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._imageTitle = this._popup.querySelector('.popup__image-title');
  }

  open(data) {
    super.open();
    this._image.src = data.src;
    this._image.alt = data.alt;
    this._imageTitle.textContent = data.alt;
  }
}
