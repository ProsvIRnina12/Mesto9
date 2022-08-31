import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formContainer = this._popup.querySelector('.form');
    this._submitButton = this._popup.querySelector('.form__save');
    this._submitButtonText = this._submitButton.textContent;
  }

  downloadProcces(download, line) {
    if (download) {
      this._submitButton.textContent = line;
    }
  }

  open(data) {
    super.open();
    this._data = data;
  }

  close() {
    super.close();
    this._formContainer.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formContainer.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._data);
    });
  }

  finally() {
    setTimeout(() => this._submitButton.textContent = this._submitButtonText, 500)
  }
}