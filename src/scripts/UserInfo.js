const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');

class UserInfo {
  constructor(name, about) {
    this._name = name;
    this._about = about;
  }
  getUserInfo() {
    const userInfo = {
      name: this._name,
      about: this._about,
    };
    return userInfo;
  }
  setUserInfo() {
    const userInfo = this.getUserInfo();
    nameProfile.textContent = userInfo.name;
    aboutProfile.textContent = userInfo.about;
    console.log(userInfo);
  }
}
export { UserInfo };
