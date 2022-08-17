export default class UserInfo {
  constructor({ selectorNameAuthor, selectorInfoAuthor, selectorAvatarAuthor }) {
    this._nameAuthor = document.querySelector(selectorNameAuthor);
    this._infoAuthor = document.querySelector(selectorInfoAuthor);
    this._avatar = document.querySelector(selectorAvatarAuthor);
  }

  getUserInfo() {
    this._userInfoValues = {
      nameAuthor: this._nameAuthor.textContent,
      infoAuthor: this._infoAuthor.textContent,
      avatarAuthor: this._avatar.src
    };
    return this._userInfoValues;
  }

  setUserInfo(newData) {
    this._nameAuthor.textContent = newData.name;
    this._infoAuthor.textContent = newData.about;
    this._avatar.src = newData.avatar;
  }
}