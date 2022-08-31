import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._formContainer = this._popup.querySelector('.form');
    this._inputsList = this._formContainer.querySelectorAll('.form__input');
    this._submitButton = this._popup.querySelector('.form__save');
    this._submitForm = submitForm;
  }

  downloadProcces(download, line) {
    if (download) {
      this._submitButton.textContent = line;
    }
  }

  _getInputValues() {
    this._formValues = {};

    this._inputsList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    super.close();
    this._formContainer.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._formContainer.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
}